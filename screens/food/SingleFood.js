import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, FlatList } from 'react-native'
import Button from '../../Components/Button'
import { sum } from '../../state/foodState';
import styles from "./Food.scss"
import { truncate } from '../../state/utils/helpers';
import Card from '../../Components/Card';
import Loading from '../../Components/Loading'
import { localhost } from '../../services/host.json'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { headerRight } from '../../App';
import { Create } from './form/Create';
import { Edit } from './form/Edit';



const SingleFood = (props) => {

  const { route, navigation } = props
  const {permission, id3, showForm2, setshowForm2, setShowForm, showForm, singlefood, allcomment, token } = props
  const [show, setshow] = useState(false)

  let _food = new sum(props)
  _food.getsinglefood()
  _food.getCommentSingle()

  useEffect(() => navigation.setOptions({
    headerRight: !showForm2 && !showForm ? headerRight : () => <></>
  }), [showForm, showForm2])


  return (
    <>

      <View style={[styles.scrollView, styles.scrollContain]}>

        {!showForm && !showForm2 &&
          <View style={{ alignItems: 'center', flex: 1.2, width: '100%' }} >
            {
              singlefood && singlefood.title ?
                
                <>
                  <View style={styles.head}>
                    <ImageBackground style={{
                      flex: 1
                    }} source={{ uri: `${localhost}/upload/${singlefood.imageUrl}` }} >
                      <Text style={styles.title}>{singlefood.title}</Text>
                    </ImageBackground>
                  </View>

                  <View style={styles.containPrice}>
                    <View style={{}}>
                      <Text style={styles.info}
                        onPress={(e) => setshow(!show)}
                      >توضیحات:{!show ? truncate(singlefood.info, 9) : singlefood.info}</Text>
                    </View>
                    <View style={{}}>
                      <Text style={styles.price}>قیمت: {singlefood.price} تومان</Text>
                    </View>
                  </View>
                </>
                :
                <Loading style={{ top: 70 }} animating={singlefood?false:true}/>
            }
          </View>}

        <View style={styles.commentContain}>

          {!showForm && <Button bgcolor='#cbd' style={styles.btnShow} onPress={() => { setshowForm2(!showForm2) }}>
            {!showForm2 ? ' ارسال نظر' : ' بازگشت'}
          </Button>}
          {!showForm2 && showForm && <Button bgcolor='#cbd' style={styles.btnShow} onPress={() => { setShowForm(false) }}>
            {!showForm2 ? ' بازگشت' : ' ویرایش نظر'}
          </Button>}


          {showForm2 ?
          permission ?
            <View style={{ height: '78%', paddingHorizontal: 15, paddingBottom: 25 }} >
              <Create props={props} route={route} />
            </View>
            :
            <View onLayout={()=>{
              setshowForm2(false)
              alert('برای ارسال نظر باید ثبت نام کرده و یا قبلا از این غذا سفارش باشین')
            }} ></View>
            :
            <></>
          }

          {showForm &&
            <View style={{ height: '70%', paddingHorizontal: 15, paddingBottom: 15 }} >
              <Edit id={route.params.id} id2={route.params.id2} id3={id3} props={props} />
            </View>
          }


          {
            !showForm && !showForm2 &&
            <FlatList
              numColumns={1}
              data={allcomment}
              keyExtractor={(f, i) => i.toString()}
              contentContainerStyle={{ alignItems: 'center' }}
              renderItem={({ item }) => (
                <View style={styles.containComment}>
                  <Card
                    bgcolor='black'
                    header={
                      <View style={{ flexDirection: 'row' }} >

                        <View style={{ flexDirection: 'row', minWidth: '55%' }} >
                          <Text style={{ color: '#efefef' }} >{item.fullname}</Text>
                        </View>

                        <View style={{ top: -4, minWidth: '46%', justifyContent: 'flex-start', flexDirection: 'row', marginRight: 'auto' }} >
                          <View style={{ minWidth: '16%', justifyContent: 'flex-start', flexDirection: 'row', }} >
                            <Icon name='edit' size={19} color='#742e' onPress={() => _food.pressIconEdit(item._id)} />
                          </View>
                          <View style={{ minWidth: '16%', justifyContent: 'flex-start', flexDirection: 'row', justifyContent: 'flex-start', }} >
                            <Icon name='trash' size={19} color='#742e' onPress={() => _food.deleteComment(item._id)} />
                          </View>
                        </View>

                      </View>
                    }
                    body={item.message}
                    img={item.image ?
                      { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWnW0NUpcrZcGZeUJ4e50ZLU8ugS9GPPoqww&usqp=CAU" }
                      :
                      { uri: `${localhost}/upload/_dv2jBs-b_847B5F59-1878-42ED-ADC0-0858D4361B15.jpg` }}
                    // img={{uri:e.imageUrl?e.imageUrl:'190/120?a.jpg'}}
                    imgStyle={styles.imgCardComment}
                    style={[styles.cardComment, {}]}

                  />
                </View>
              )}
            />}
        </View>
      </View>

    </>
  )
}
export default SingleFood