import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Text, View, Image } from 'react-native'
import jwt_decode from "jwt-decode";
import localStorage from '@react-native-async-storage/async-storage';
import Drawer from '../../Components/Drawer'
import BottomTab from '../../Components/BottomTab'
import Button from '../../Components/Button'
import { bottomProfile, drawer } from '../../state/utils/top-bottom'
import styles from './User.scss';
import B_icon from '../../Components/B_icon';
import { userState } from '../../state/userState'
import { _scrollView } from '../food/Home'
import { sendProfile, getProfile } from '../../services/foodService';
import { localhost } from '../../services/host.json';
import { launchImageLibrary } from 'react-native-image-picker';
import { useFocusEffect } from '@react-navigation/native';

let int
const Profile = (props) => {
  const [change, setchange] = useState(false)
  let { navigation, route } = props
  const user = new userState(props)

  user._tokenValue


  useEffect(() => {
    localStorage.getItem("token").then((token) => {
      const user = jwt_decode(token)
      token && props.settokenValue(user)
    })
  }, [])

  const submit = (roomNumber) => {
    navigation.push('Chat', { roomNumber })
  }



  useFocusEffect(
    useCallback(() => {
      (async () => {
        let room = ['room5', 'room6']
        for (let i of room) {
          let loc = await localStorage.getItem(i)
          if (loc) { props.allRoom.set(i, JSON.parse(loc)); props.msgLength.set(i, JSON.parse(loc)); }
        }
      })()
    }, [])
  )



  const imagePicker = () => {
    launchImageLibrary({ mediaType: 'photo' }, async (res) => {
      if (!res.didCancel) {
        await sendProfile({ uri : {name: res.assets[0].fileName, type: res.assets[0].type, uri: res.assets[0].uri} }); setchange(!change)}
      else console.log('err');
    })
  }


  useFocusEffect(
    useCallback(() => {
      (async()=> {
        await getProfile().then(({data}) => {
          props.setimageProfile(data.uri)
        })
      })()
    }, [change])
  )




  const bottom = bottomProfile(props)
  return (
    <Drawer route={route.name} route2={drawer} bgcolor="#bbf">
      <BottomTab route={route.name} route2={bottom} bgcolor="#bbf" >
        <View style={{ flex: 1, backgroundColor: '#bbf' }} >

          <View style={[styles.headProfile, { height: 167 }]}>
            <View style={styles.viewUserImage}>
              <View onStartShouldSetResponder={() => { imagePicker() }} style={styles.containImage}>
                {props.imageProfile ?
                  <Image source={{ uri: `${localhost}/upload/${props.imageProfile}` }} style={styles.profileImage} />
                  :
                  <Image source={require("../../assets/images/a8.jpg")} style={styles.profileImage} />
                }
                <View style={styles.profileSubText}>
                  <Text style={styles.textUserImage}>حمید رضا عطار</Text>
                </View>
              </View>
            </View>
            <View style={{ width: '70%' }} >
              <View style={styles.containHeaderInfo} >
                <B_icon icon='comment-slash' size={.85} bgcolor='silver' />
                <B_icon icon='comment' size={.85} bgcolor='silver' />
                <B_icon icon='search' size={.85} bgcolor='silver' />
              </View>
              <View style={{ paddingTop: 11, paddingBottom: 8 }} >
                <Text style={{ fontSize: 15, textAlign: 'left', paddingHorizontal: 9, fontWeight: '100' }} >
                  من کتاب هستند که خواندن دانش باشد به نام تو نامه کی کنم باز
                  من کتاب هستند که خواندن دانش باشد به نام تو نامه کی کنم باز
                </Text>
              </View>
            </View>
          </View>


          <View style={{ flexGrow: 1 }} >
            <View style={styles.hr} />
            <_scrollView >
              <View style={styles.bodyProfile} >
                <View onStartShouldSetResponder={() => submit('room8')} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                  <B_icon icon='comment' size={.6} bgcolor='#444' border='#333' />
                  <Text style={{ fontSize: 17 }} >انتقادات و پیشنهادات</Text>
                </View>
                <View onStartShouldSetResponder={() => submit('room7')} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                  <B_icon icon='comment' size={.6} bgcolor='#444' border='#333' />
                  <Text style={{ fontSize: 17 }} >ارتباط با ادمین </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                  <B_icon icon='comment' size={.6} bgcolor='#444' border='#333' />
                  <Text /* onPress={() => submit('room7')} */ style={{ fontSize: 17 }} >گفتگو</Text>
                </View>


                {props.tokenValue.isAdmin === 'chief' ? <Button style={styles.btnPanel} onPress={() => navigation.navigate("AdminTitleAllFood")} >پنل ادمین</Button> : <Text />}

              </View>
            </_scrollView>
          </View>

        </View>
      </BottomTab>
    </Drawer>
  )
}
export default Profile
