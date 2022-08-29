import React, { useState } from 'react'
import { Linking, View, Text, TextInput, ScrollView, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Drawer from '../../Components/Drawer'
import BottomTab from '../../Components/BottomTab'
import Button from '../../Components/Button';
import { payment } from '../../services/foodService';
import { sum } from '../../state/foodState';
import { drawer, bottomProfile } from '../../state/utils/top-bottom';
import Loading from '../../Components/Loading'
import { Tbody, Thead } from '../../Components/Thead';
import styles from "./Food.scss"
import { localhost } from '../../services/host.json'


const FinallFoodPayment = (props) => {


  const bottom = bottomProfile(props)

  let { allprice, bgColor, allfood, totalTitle, route } = props

  const inputPrice = `${allprice ? allprice : '0'}`

  let _food = new sum(props)

  _food.allPrice()


  const plus = (index, item) => _food.plustNum(index, item)

  const minus = (index, item) => _food.minusNum(index, item)


  const del = () => _food.deleteStorage()


  let allfood1 = allfood.filter((a) => a.num > 0)

  //  useEffect(() => {
  //   setpage(1)
  //  }, [])



  // useEffect(() => {
  //   if (width >= 600) {
  //     setstyleScroll({minWidth:'46%'})
  //   }
  //   if (width <= 600) {
  //     setstyleScroll({minWidth:'95%'})
  //   }
  // }, [width])



  return (
    <Drawer route={route.name} route2={drawer} >
      <BottomTab route={route.name} route2={bottom} >
        <View style={styles.viewHead}>


          <View style={styles.viewOne}>
            <View style={styles.viewConseal} >
              <Button disabled={allfood1.length ?false:true} bgcolor="yellow" style={styles.btnFinal} onPress={del} >لغو سفارش</Button>
            </View>
            <View style={{ width: '96%', alignSelf: 'center' }} >


              {!allfood1.length ?
                <Loading time={500} color={'red'} animating={allfood1.length ? false : true} />
                :
                <ScrollView style={styles.scrollTable} contentContainerStyle={{ flexGrow: 1, paddingBottom: 55 }} >
                  <View style={styles.thead}>
                    <Thead color="white" TheadStyle={[styles.thead, { backgroundColor: '#777' }]}>عنوان</Thead>
                    <Thead color="white" TheadStyle={[styles.thead, { backgroundColor: '#777' }]}>جمع قیمت</Thead>
                  </View>
                  {allfood1.map((item, key) => (
                    // item.num > 0 &&
                    <View key={key} style={styles.viewTable}>
                      <Tbody color="white" fontSize={13} TbodyStyle={bgColor(key)}>{item.title}</Tbody>
                      <Tbody color="white" fontSize={12} TbodyStyle={bgColor(key)}>{_food.AllPrice(item.total, key)}</Tbody>
                    </View>
                  ))}
                  <View style={styles.tfood}>
                    <Tbody fontSize={12} TbodyStyle={{ color: 'red', flex: 1, marginLeft: -10 }} >قیمت کل: </Tbody>
                    <Tbody fontSize={12} TbodyStyle={{ color: 'red', flex: 1, marginLeft: -10 }} >{_food.AllPrice(inputPrice, null)} ت</Tbody>
                  </View>
                </ScrollView>
              }
            </View>
          </View>


          <View style={styles.viewPayment}>
            <View style={styles.viewPayTwo}>
              
              <Button disabled={allfood1.length ?false:true} bgcolor="yellow"
                style={styles.btnFinal}
                // onPress={() => _food.payment()}
                onPress={() => { props.navigation.navigate("Location")} }
              >
                پرداخت
              </Button>
            </View>
            <View style={{ flex: 1, paddingRight: 10 }}>
              {!allfood1.length ?
                <Loading time={500} color={'red'} animating={allfood1.length ? false : true} />
                :
                <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: 45 }]} >

                  {allfood1.map((item, index) => (
                    // item.num > 0 &&
                    <View key={item._id} style={[styles.viewKey]}>
                      <ImageBackground style={styles.imageFinalFood} source={{ uri: `${localhost}/upload/${item.imageUrl}` }} >
                        <Text style={styles.textTitleFinal}>{item.title}</Text>
                      </ImageBackground>

                      <View style={styles.containButtomImage} >
                        <View style={styles.viewPlusMinus}>
                          <Icon style={{ padding: 6 }} size={19} name="plus" onPress={() => plus(index, item)} color='blue' />
                          <View style={{ paddingVertical: 4 }} />
                          <Icon style={{ padding: 6 }} size={19} name="minus" color='red' onPress={() => item.num > 0 && minus(index, item)} />
                        </View>

                        <View style={[styles.viewInputNum]} >
                          <TextInput keyboardType='numeric' style={[styles.inputNum, { padding: 3 }]} value={allfood1[index].num.toString()} />
                        </View>

                        <View style={styles.textPrice}>
                          <Text style={{ textAlign: 'left' }} >قیمت:</Text>
                          <Text style={{ fontSize: 13 }} >{_food.AllPrice(item.price, null)} <Text style={{ fontSize: 12 }}>ت</Text></Text>
                        </View>
                      </View>
                    </View>

                  ))}
                </ScrollView>
              }
            </View>
            <View>
            </View>
          </View>
        </View >
      </BottomTab>
    </Drawer >
  )
}
export default FinallFoodPayment
