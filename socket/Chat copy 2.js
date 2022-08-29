import React, { createRef, useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, Image, TextInput, FlatList, PermissionsAndroid, Linking, Platform, Share, Pressable, Animated } from 'react-native'
import SocketIOClient from 'socket.io-client';
import FastImage from 'react-native-fast-image';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import _Icon from 'react-native-vector-icons/FontAwesome';
import localStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import {useNetInfo} from "@react-native-community/netinfo";
import * as RNFS from 'react-native-fs';
import Button from '../Components/Button';
import Input from '../Components/Input';
import * as _ from '../Components/Html';
import * as s from '../Components/styles.scss';
import Modal from '../Components/Modal';
import B_icon from '../Components/B_icon';
import { localhost } from '../services/host.json'
import Dropdown from '../Components/Dropdown';
import Loading from '../Components/Loading'
import Badge from '../Components/Badge';
import { toast } from '../state/foodState';
import { imagechat } from '../services/foodService';
import { useNotification } from '../useNotification';
import Toast from '../Components/Toast';
import uuid from 'react-native-uuid'


let offset = 1
let down2 = 0
let prgs = ''
let ind=[]

const Chat = (props) => {
  
  const netInfo = useNetInfo;

  const { displayNotification, cancelAllNotifications, cancelNotification } = useNotification();


  const [newMessage, setNewMessage] = useState('');
  const [userI, setUserI] = useState([])
  const [pvMessage, setPvMessage] = useState()
  const [modalTitle, setModalTitle] = useState("")
  const [pvChatMessage, setPvChatMessage] = useState("")
  const [to1, setto1] = useState('')
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [first, setfirst] = useState(true)
  const [exit, setexit] = useState(true)
  const [positionEnd, setpositionEnd] = useState(0)
  const [contentHeight, setcontentHeight] = useState(1)
  const [contentOffset, setcontentOffset] = useState(0)
  const [refresh, setrefresh] = useState(false)
  const [opacity, setopacity] = useState(true)
  const [resize, setresize] = useState(false)
  const [uri, seturi] = useState('')
  const [showdown, setshowdown] = useState(true)
  const [id1, setId1] = useState()
  const [messages, setmessages] = useState([])


  const ref = createRef();
  
  


  const { allRoom, msgLength } = props

  const pType = useRef();
  const infoc = useRef();
  const pPv = useRef();

  const socket = useRef(SocketIOClient.connect(localhost));

  const { fullname: name } = props.tokenValue

  useFocusEffect(useCallback(() => {

    localStorage.getItem(props.route.params.roomNumber + "offset").then((res) => { res ? offset = JSON.parse(res) : offset = 0 })

    localStorage.getItem(props.route.params.roomNumber).then((res) =>  { {if(res)props.allRoom.set(props.route.params.roomNumber, JSON.parse(res)); props.msgLength.set(props.route.params.roomNumber, JSON.parse(res)); }})

    localStorage.getItem(props.route.params.roomNumber + 'end', ).then((res)=>{if(res != 'end') down2 = 1})


    socket.current.on("online", (users) => {
      if (users.filter((user) => (user.roomNumber === props.route.params.roomNumber))) {
        let UserI2 = users.filter((user) => (user.roomNumber === props.route.params.roomNumber))
        setUserI(UserI2)
      }
    });


    socket.current.on("mongoMsg", async (msgModel) => {
      let t;
      let r =[]
      let msg = msgModel.filter((user) => (user.roomNumber === props.route.params.roomNumber))
      msg.forEach((item)=>{t = item.msgNm.find((msg) => msg.name == name)})
      if(!t){
        setmessages(msg)
        allRoom.set(props.route.params.roomNumber, msg)
      }
    })


    socket.current.on("pvChat", (data, iid, users) => {
      if (socket.current.id == data.to) {
        if (infoc.current) {
          infoc.current.focus()
        }
        setShow(true)
        if (pPv.current) pPv.current.style.display = 'block';
        setModalTitle("دریافت از طرف : " + data.name)
        let UserI = users.find((user) => (user.nickname == data.name))
        setto1(UserI.id)
        setPvChatMessage(data.pvMessage)
      }
      if (socket.current.id == iid) setShow(false)
      setPvMessage('')
    });



    socket.current.on("chat message", (message) => {
      let ms = allRoom.get(props.route.params.roomNumber)
        allRoom.set(props.route.params.roomNumber, ms.concat(message))

        setmessages(ms.concat(message))
        
        if (pType.current && message.sender.name !== name) {
          pType.current.setNativeProps({ text: '' })
          pType.current.setNativeProps({ style: { height: 0 } })
          
          this.opacity.setNativeProps({opacity:1})
          this.down.setNativeProps({opacity:1})
          down2 = 1
          localStorage.removeItem(props.route.params.roomNumber + 'end')
        }

      if (message.sender.name === name ){
      const intvl = setInterval(() => {  this.scrollableGri && this.scrollableGri.scrollToEnd() },1000)
      setTimeout(()=>{ clearInterval(intvl)},2000)
}
    })




    socket.current.on("deleteOne", (id) => {
      let delMs = allRoom.get(props.route.params.roomNumber).filter((message) => message.id !== id)
      setmessages(delMs)
      allRoom.set(props.route.params.roomNumber, delMs)
    })



    socket.current.on("deleteMsg", (id) => {
      let delMs = allRoom.get(props.route.params.roomNumber).filter((message) => message.id !== id)
      setmessages(delMs)
      allRoom.set(props.route.params.roomNumber, delMs)
    })



    socket.current.on("typing", (data) => {
      if (pType.current) {
        pType.current.setNativeProps({ text: data.name + " درحال تایپ " })
        pType.current.setNativeProps({ style: { height: null } })
      }
      if (data.etar === "" && pType.current) { pType.current.setNativeProps({ text: '' }); pType.current.setNativeProps({ style: { height: 0 } }) }
    });



    if (exit) socket.current.emit("online", { name: name, nickname: name, roomNumber: props.route.params.roomNumber });



    (async function sum() {

      if (Platform.OS === 'android'){
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.READ_EXTERNAL_STORAGE,
        {
          title: '',
          message: '',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      );
      if (permission === 'denied') return;
      if (permission === 'granted') {
        // YOUR WRITE FUNCTION HERE
      }
      }

    })()


    socket.current.on("error", (data) => {
      if(data.sender === name ) Toast(data.error)
    })




    return () => {
      localStorage.setItem(props.route.params.roomNumber, JSON.stringify(allRoom.get(props.route.params.roomNumber) )).then(()=>{})
    
      setexit(false)
      offset = 0
      scrollEnd = false
      setmessages([])
      ind=[]
      down2 = 0
      prgs = ''


      socket.current.on("delRemove", (users) => { setUserI(users) })
      socket.current.emit("delRemove", socket.current.id)
    }



  }, []));




  // Socket Emit

  const handlePvChat = () => {
    socket.current.emit("pvChat", {
      pvMessage,
      name: name,
      to: to1,
    });
  };



  const sendMessage = (type, imageName) => {
    if (!type) {
      if (!newMessage) return;


      socket.current.emit("chat message", {
        msgNm: [], id: (uuid.v4()).toString(), roomNumber: props.route.params.roomNumber, msg: newMessage,
        sender: { name: name }, createdAt: new Date()
      });
      setNewMessage("");
      // pType.current.innerHTML = ""
    }
    else {

      socket.current.emit("chat message", {
        msgNm: [], id: (uuid.v4()).toString(), roomNumber: props.route.params.roomNumber, msg: '',
        sender: { name: name }, createdAt: new Date(), uri: imageName, type: type
      });

    }
  }



  const oneDeleteClick = (id) => {
    socket.current.emit("deleteOne", id, { name: name });
  };

  const msgDeleteClick = (id) => {
    socket.current.emit("deleteMsg", id);
  };



  const handleKeypress = (e) => {
    socket.current.emit("typing", {
      name: name, roomNumber: props.route.params.roomNumber, eKey: e.nativeEvent.text, etar: e.nativeEvent.text, newMessage
    });
  };




  let handleFalse = () => {
    ind.forEach((i)=> {
      if(typeof i === 'object') i.setNativeProps({style:{transform:[{scale:0}]}})
     
      this.dr && this.dr.setNativeProps({style:{transform:[{scale:0}] }  })
    })
  }



  const sendImage = async (file, name) => {
    await imagechat({uri:file, name})
  }


  imagePicker = () => {
    launchImageLibrary({ mediaType: 'photo' }, (res) => {
      if (!res.didCancel) { let imageName = (new Date().getTime() + Math.random() * 10000).toString() + '.jpg'; sendImage({ name: res.assets[0].fileName, type: res.assets[0].type, uri: res.assets[0].uri }, imageName); sendMessage('image', imageName); handleFalse }
      else console.log('err');
    })
  }


  videoPicker = () => {
    launchImageLibrary({ mediaType: 'video' }, (res) => {
      if (!res.didCancel) { let imageName = (new Date().getTime() + Math.random() * 10000).toString() + '.mp4'; sendImage({ name: res.assets[0].fileName, type: res.assets[0].type, uri: res.assets[0].uri }, imageName); sendMessage('video', imageName); handleFalse }
      else console.log('err');
    })
  }


  // videoPicker = () => {
  //   launchCamera({ mediaType:'video' }, (res) => {
  //     if (!res.didCancel) {props.setImageUrl({ name: res.assets[0].fileName, type: res.assets[0].type, uri: res.assets[0].uri }); sendMessage({uri: res.assets[0].uri, type:res.assets[0].type})}
  //     else console.log('err');
  //   })
  // }



  useEffect(() => {
    props.navigation.setOptions({ headerTitle: () => <Text style={{ fontWeight: 'bold', fontSize: 17 }} onPress={() => setShow2(true)} >online : {userI.length}</Text> })
  }, [userI.length])

  
  
  let imgName = `${new Date().getTime()}.jpg` 



  useEffect(()=>{
    if(contentHeight > props.height){
      if (down2 === 1) setopacity(true)
    }
  },[down2])


  if(contentHeight > props.height)
  this.scrollableGri && this.scrollableGri.setNativeProps({opacity:1})




  return (

    <View style={{ flex: 1, backgroundColor: '#6065', }} >

      <View style={{ flex: 1 }} onStartShouldSetResponder={() => { handleFalse() }} >

        <LinearGradient start={{ x: 1.5, y: .5 }} end={{ x: 0, y: 0 }} colors={['#00fe', '#f00e', '#00fe', '#f00e']} style={{ height: '100%' }}>
          <TextInput editable={false} ref={pType} value="5444" style={{ height: 0, top: 4, zIndex: 1020, alignSelf: 'center', color: 'white', position: 'absolute' }}></TextInput>
          <LinearGradient start={{ x: 1.5, y: .5 }} end={{ x: 0, y: 0 }} colors={['#9006', '#0096']} style={[{ height: '100%' }, s.shadow2]}>
            {
             (allRoom.get(props.route.params.roomNumber) && allRoom.get(props.route.params.roomNumber).length && msgLength.get(props.route.params.roomNumber))?
              <FlatList 
                ref={(e) => this.scrollableGri = e}
                onScrollToIndexFailed={() => {
                  if(this.scrollableGri) 
                   this.scrollableGri.scrollToOffset({ offset })
                }}
                initialNumToRender={ msgLength.get(props.route.params.roomNumber).length}
                onRefresh={() => { setrefresh(true); setTimeout(() => { setrefresh(false) }, 3000); }}
                refreshing={refresh}
                onLayout={(e) => {
                  //   // this.scrollableGri && this.scrollableGri.scrollToIndex({ index: allRoom.get(props.route.params.roomNumber).length > msgLength.get(props.route.params.roomNumber).length?(msgLength.get(props.route.params.roomNumber).length > 1 ? msgLength.get(props.route.params.roomNumber).length - 1: 1) : (allRoom.get(props.route.params.roomNumber).length > 1 ? allRoom.get(props.route.params.roomNumber).length -1 : 1), animated: true });
                  this.scrollableGri.scrollToOffset({ offset })
                  setTimeout(()=> {
                    this.scrollableGri && this.scrollableGri.setNativeProps({opacity:1})
                    } , 700)
                setpositionEnd(e.nativeEvent.layout.height); }}
                onScroll={(e) => { setcontentOffset(e.nativeEvent.contentOffset.y + positionEnd + 50); setcontentHeight(e.nativeEvent.contentSize.height); localStorage.setItem(props.route.params.roomNumber + "offset", JSON.stringify(e.nativeEvent.contentSize.height)).then(() => { }); if (contentOffset > e.nativeEvent.contentSize.height) {setshowdown(false); down2 = 0; localStorage.setItem(props.route.params.roomNumber + 'end', 'end' ).then(()=>{})  }  else setshowdown(true); }}
                contentContainerStyle={{ paddingHorizontal: 8 , flexGrow:1, width:'85%' }}
                style={{ flexGrow:1, opacity:0 }}
                numColumns={1}
                data={!messages.length ? allRoom.get(props.route.params.roomNumber) : messages}
                renderItem={({ item, index }) => (
                      <View key={item._id} >
                        <_.div style={[{ 
                          width: '100%', alignItems: 'center', marginVertical: 12,
                        }, item.sender.name === name ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }]}>
                          <_.div style={[{ width: '100%', paddingHorizontal: 9, borderRadius: 5 }, item.sender.name === name ? { backgroundColor: '#c3aa' } : { backgroundColor: '#c3fa' }]} >
                            <_.div>
                              <_.div style={[{ justifyContent: 'space-between' }, item.sender.name === name ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }]}>

                                <FastImage
                                  style={{ width: 48, height: 50, borderRadius: 50 }}
                                  source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWnW0NUpcrZcGZeUJ4e50ZLU8ugS9GPPoqww&usqp=CAU' }}
                                  resizeMode={FastImage.resizeMode.cover}
                                />
                                <View style={{ top: 10 }} >
                                  <Text style={{ color: '#5ef', }}>{item.sender.name === name ? 'shoma' : item.sender.name}</Text>
                                  <Text style={{ color: '#5ef', }}>{item.createdAt.split("T")[1].split(".")[0]}</Text>
                                </View>

                               { item.type == 'image' && 
                                <B_icon size={.57} bgcolor='silver' icon2={'refresh'} style={{alignSelf:'center', top:-5, marginRight:-25}} 
                                onPress={()=>{ setId1(item.id); setTimeout(()=>{setId1()},500)}} /> }

                                <_.div style={{ flexDirection: item.sender.name === name ? 'row-reverse' : 'row' }}>
                                  <View style={{ position: 'relative' }} >
                                    <Dropdown 
                                    ref={(e)=>{index=e;}}
                                    onPress={()=> {
                                      ind.push(index)
                                      handleFalse()
                                      if(typeof index === 'object') index.setNativeProps({style:{transform:[{scale:1}]}})           
                                    }} show={first} >
                                      {item.sender.name === name ?
                                        <>
                                          <Text style={{ textAlign: 'center', zIndex: 1 }} onPress={() => {  oneDeleteClick(item.id); handleFalse(); }} >فقط برای شما`</Text>
                                          <_.hr style={{ borderTopWidth: .2 }} />
                                          <Text style={{ textAlign: 'center', zIndex: 1 }} onPress={() => {  msgDeleteClick(item.id); handleFalse(); }} >برای همه`</Text>
                                        </> :
                                        <>
                                          <Text style={{ textAlign: 'center', zIndex: 1 }} onPress={() => { oneDeleteClick(item.id); handleFalse(); }} >فقط برای شما`</Text>
                                        </>}
                                    </Dropdown>
                                  </View>
                                </_.div>

                              </_.div>

                              <View style={{ borderRadius: 4, padding: 4, zIndex: -1, }}>
                                {
                                  item.type == 'image' ?
                                    <Pressable style={{minHeight:200}}>

                                    <Pressable
                                      onPress={() => {
                                        seturi(`${localhost}/upload/${item.uri}`)
                                        setresize(true)
                                        props.navigation.setOptions({ headerShown: false })
                                     }}>

                                     { item.id != id1 && 
                                     <Image
                                        blurRadius={5}
                                        style={{ width: '98%', height: 200, alignSelf: 'center' }}
                                        source={{ uri: `${localhost}/upload/${item.uri}` }}
                                        resizeMode={FastImage.resizeMode.stretch} />
                                    }

                                    </Pressable>

                                    </Pressable>
                                    :
                                    <TextInput editable={false} multiline style={{ textAlign: 'right', backgroundColor: '#fff', padding: 6 }} value={item.msg} />
                                }
                              </View>
                            </_.div>
                            <_.div>
                            </_.div>
                          </_.div>
                        </_.div>
                      </View>
                )} />
                :
                <Loading style={{ top: 50 }} />
            }
          </LinearGradient>
        </LinearGradient>
      </View>


        <Animated.View style={[{ position: 'absolute', bottom: 100, borderRadius: 50, }]}>
         <View ref={(e)=> this.opacity = e} style={{opacity:contentOffset < contentHeight && contentHeight > props.height?1:0}} >
            <Animated.View ref={(e)=>this.down = e} style={{ opacity: down2 === 1 ? 1 : 0, zIndex: 10 }} >
              <Badge style={{ transform: [{ scale: 1.2 }] }} top={15} right={15} text={""} color='green' />
            </Animated.View>
          <B_icon bgcolor="#0af" size={.7} iconSize={30} icon="arrow-down"
           onPress={() => { handleFalse(); this.scrollableGri && this.scrollableGri.scrollToEnd({ animated: true }) }}
           />
          </View>
          </Animated.View>

      <_.div className={s.shadow2} style={{ borderRadius: 5, minWidth: '100%', height: '20%', minHeight: 80, maxHeight: 80, alignSelf: 'center', backgroundColor: '#c6ddff', }}>
        <_.div className={s.shadow} style={{ borderRadius: 5, width: '91%', alignSelf: 'center' }}>
          <_.div style={{ minWidth: '100%' }} >
            <View style={{ position: 'absolute', top: 2.5, right: '15%', zIndex: 111 }}>
              <Dropdown ref={(e)=> this.dr = e} onPress={()=>{ handleFalse(); this.dr.setNativeProps({style:{transform:[{scale:1}] }}) }} top icon='paperclip' showBgcolor="#888" icon2False show={first} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
                  <Icon onPress={() => { imagePicker(); handleFalse() }} name={'image'} color="#ddd" size={25} />
                  <Icon onPress={() => { videoPicker(); handleFalse() }} name={'video'} color="#ddd" size={25} />
                </View>
              </Dropdown>
            </View>
            <Input maxLength={1000} style={{ minHeight: 50 }} iconSize={24} styleIcon={{ transform: [{ rotate: '-125deg' }] }} onSubmitEditing={()=>sendMessage(null,null)} iconPress={()=>sendMessage(null,null)} className={s.HiraMinProN} icon="paper-plane" iconColor="#38a" color="#25a" value={newMessage} p="ارسال پیام" onChange={(e) => { if (e.nativeEvent.text.length >= 1000) toast('مجاز به تایپ بیشتر از ۱۰۰۰ کارکتر نمیباشین'); setNewMessage(e.nativeEvent.text); handleKeypress(e) }} onPressIn={() => handleFalse()} />
          </_.div>
        </_.div>
      </_.div>





      <View style={{ height: 0 }}>
        <Modal show={show2} setShow={setShow2} style={{ minHeight: '80%', minWidth: '70%' }}>
          <>
            {userI.map((user, index) => {
              return <View key={index} style={{ backgroundColor: 'silver', height: 70, minWidth: '80%' }}>
                {user.roomNumber === props.route.params.roomNumber &&
                  <Pressable onPress={() => {
                    setModalTitle(user.nickname)
                    setto1(user.id);
                    setShow2(false)
                    setShow3(true)

                  }}
                    key={user.id} style={{ minWidth: '100%', paddingTop: 7, width: 90, height: 70, margin: 2, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                    <Image style={{ width: 40, height: 40 }} source={require("./famale_user.png")} />
                    <_.h6> {user.nickname} </_.h6>
                  </Pressable>
                }
              </View>
            })}
          </>
        </Modal>



        <Modal style={{ width: 333, height: 150 }} setShow={setShow3} show={show3}>
          <_.h3>نام: {modalTitle}</_.h3>
          <_.row>
            {/* <B_icon icon='video' onPress={() => { setShow3(false); setShowWideo(true) }} ></B_icon> */}
            <B_icon icon="envelope" onPress={() => { setShow3(false); setShow(true); setPvChatMessage('') }} />
          </_.row>
          <_.li style={{ height: 100, margin: 2 }}></_.li>
        </Modal>




        <Modal style={{ width: 333, height: 150 }} setShow={setShow} show={show} onHide={() => setPvChatMessage('')}>
          <View>
            <_.small > {modalTitle} </_.small>
          </View>

          <View>
            <_.p >{pvChatMessage} </_.p>
          </View>

          <View>
            <Input style={{ minWidth: '100%', marginBottom: 6 }} value={pvMessage} onChange={(e) => setPvMessage(e.nativeEvent.text)} p="ارسال پیام" />
          </View>

          <View>
            <Button onPress={(e) => { handlePvChat() }} variant="primary"> ارسال </Button>
          </View>
        </Modal>
      </View>




      {resize &&
        <Pressable style={{ alignItems: 'center', flex: 1, position: 'absolute', right: 0, top: 0, width: props.width, height: props.height }}>

          <View style={{ backgroundColor: '#666', position: 'absolute', zIndex: 11, alignItems: 'center', top: 1, left: 1, paddingHorizontal: 3, borderRadius: 4 }}>
            <_Icon name='remove' size={35} color='black' style={{ fontWeight: '100' }} onPress={() => { setresize(false); props.navigation.setOptions({ headerShown: true }) }} />
          </View>


          <View style={{ backgroundColor: '#666', position: 'absolute', zIndex: 11, alignItems: 'center', top: 1, right: 1, paddingHorizontal: 3, borderRadius: 4 }}>
            <_Icon name='ellipsis-h' size={35} color='black' style={{ fontWeight: '100' }}
              onPress={() => {
                RNFS.downloadFile({
                  fromUrl: uri,
                  toFile: `${RNFS.DownloadDirectoryPath}/${imgName}.mp4`,
                  discretionary: true,
                  progress: (res) => {
                    let progressPercent = (res.contentLength * (100 * res.bytesWritten)).toString()
                    prgs = progressPercent.slice(0, 2)
                    if (prgs > '96') prgs = '100'
                    console.log(prgs)
                  },
                }).promise
                  .then(() => {


                    displayNotification(imgName, prgs + '%')

                    //   try{
                    //     try {await Share.share({url:'http://192.168.42.34/upload/_dv2jBs-b_847B5F59-1878-42ED-ADC0-0858D4361B15.jpg', message: 'http://192.168.42.34/upload/_dv2jBs-b_847B5F59-1878-42ED-ADC0-0858D4361B15.jpg'});}
                    //     catch (error) {alert(error.message);}
                    //   }           
                    //   catch(er){console.log(er)}


                    // try{
                    //  if(Platform.OS === 'android' )
                    //  Linking.openURL('content://media/internal/images/media')
                    //  if(Platform.OS === 'ios' )
                    //  Linking.openURL('photos-redirect://')
                    // }
                    // catch(err){console.log(err)}

                  })
                  .catch((err) => console.log(err))
              }} />
          </View>


          <FastImage
            ref={(e) => this.img = e}
            style={{ width: props.width, height: props.height, alignSelf: 'center' }}
            source={{ uri }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </Pressable>

      }

    </View> )}
export default Chat
