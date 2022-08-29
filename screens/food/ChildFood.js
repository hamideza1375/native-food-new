import React, { useRef, useState } from 'react'
import { View, Text, FlatList, Image, TextInput, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
import { sum } from '../../state/foodState';
import styles from "./Food.scss"
import { localhost } from '../../services/host.json'
import Pagination from '../../Components/Pagination';
import Loading from '../../Components/Loading'


let styleScroll = {}
let numColumns = 2

const ChildFood = (props) => {
  const { navigation, route } = props

  const [page, setpage] = useState(1)

  let { orientation, width, pageLimit, currentPage, setcurrentPage, allprice, textSearch, settextSearch, ass, token, current, setcurrent } = props
  const inputPrice = `${allprice ? allprice : '0'}`


  let _food = new sum(props)
  _food.getChildFood()
  _food.allPrice()

  const plus = (index, item) => { _food.plustNum(index, item) }
  const minus = (index, item) => { _food.minusNum(index, item) }
  let scrollRef = useRef()


  if (width <= 600) {
    styleScroll = styles.containItem
    numColumns = 2
  }
  if (width > 600) {
    styleScroll = styles.containItemScroll
    numColumns = 3
  }


  return (
    <View style={[styles.viewContainer, orientation === "LANDSCAPE" && { paddingHorizontal: 22, alignSelf: 'center' }]} >

      <View style={styles.containHead}>
        <View style={styles.viewSearch}>
          <Icon name="search" size={20} color="#999" style={{ padding: 7, flex: 1 }} />
          <TextInput
            value={textSearch}
            onChangeText={(text) => { _food.sercher(text); settextSearch(text) }}
            placeholder="جستجو غذا و نوشیدنی" style={styles.search}
          />
        </View>

        <View style={{ width: '12%', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', marginHorizontal: 4 }} >
          <Icon onPress={() => _food.foodAsc(setpage)} size={20} name="arrow-down" color='#555' />
          <View style={{ paddingHorizontal: 6 }} ></View>
          <Icon onPress={() => _food.foodDesc(setpage)} size={20} name="arrow-up" color='#555' />
        </View>
      </View>

      <View style={{ flex: 1 }}>
        {current &&
          <FlatList
            numColumns={numColumns}
            key={numColumns}
            keyExtractor={(f) => f && f._id.toString()}
            data={current}
            contentContainerStyle={{ paddingBottom: 55, }}
            renderItem={({ item, index }) => (
              <View
                ref={scrollRef}
                style={[styleScroll, item.num > 0 ? styles.shadowSuccess : styles.shadowDark,
                  { opacity: item.available ? 1 : .4 }
                ]}>

                <Pressable onPress={() => { navigation.navigate("SingleFood", { id: route.params.id, id2: item._id }) }} >
                  <FastImage
                    style={styles.img}
                    source={{
                      uri: `${localhost}/upload/${item.imageUrl}`,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </Pressable>

                <View style={styles.subImg} >
                  <Text style={styles.textTitleChild}>{item.title}</Text>
                  <View style={styles.ViewSubItem}>
                    <View style={{ paddingRight: 3, top: 2 }} >
                      <Text style={[{ fontSize: 13.5, textAlign: 'left' }]}>فیمت:{_food.AllPrice(item.price, null)}</Text>

                      <View style={{ top: 12, flexDirection: 'row', alignSelf: 'flex-end' }} >
                        {item.meanStar >= 5 && <Icon4 name='star' size={17} color='orange' />}
                        {item.meanStar > 4 && item.meanStar < 5 && <Icon4 name='star-half' size={17} color='orange' />}
                        {item.meanStar >= 4 && <Icon4 name='star' size={17} color='orange' />}
                        {item.meanStar > 3 && item.meanStar < 4 && <Icon4 name='star-half' size={17} color='orange' />}
                        {item.meanStar >= 3 && <Icon4 name='star' size={17} color='orange' />}
                        {item.meanStar > 2 && item.meanStar < 3 && <Icon4 name='star-half' size={17} color='orange' />}
                        {item.meanStar >= 2 && <Icon4 name='star' size={17} color='orange' />}
                        {item.meanStar > 1 && item.meanStar < 2 && <Icon4 name='star-half' size={17} color='orange' />}
                        {item.meanStar >= 1 && <Icon4 name='star' size={17} color='orange' />}
                      </View>

                    </View>

                    <View style={[styles.TextPlus, { marginTop: -2 }]} >

                      {
                        item.available ?
                          <View style={[styles.viewIcons, { top: -3, height: '100%', justifyContent: 'space-between' }]}>
                            <Icon size={20} name="plus" style={{ padding: 3 }} onPress={() => {
                              plus(index, item)
                            }}
                              color='blue' />

                            <Icon size={20} name="minus" style={{ padding: 3 }} onPress={() => {
                              current[index].num > 0 &&
                                minus(index, item)
                            }
                            } color='red' />

                          </View>
                          :
                          <Text />
                      }


                      <View style={styles.vpls} >

                        {
                          item.available ?
                            <>
                              <Text onPress={() => {
                                current[index].num == 0 &&
                                  plus(index, item)
                              }
                              } style={{ top: -6 }}>افزودن</Text>

                              <TextInput editable={false} value={current[index] && current[index].num.toString() + " " + 'عدد'} style={{ marginTop: 3, paddingVertical: 2.4, alignSelf: 'center', }} />
                            </>
                            :
                            <Text style={{ top: 10, width: 53, alignSelf: 'center', borderWidth: 1, borderColor: 'red', padding: 3, transform: [{ rotate: '-20deg' }] }}>ناموجود</Text>
                        }
                      </View>


                    </View>
                  </View>
                </View>
              </View>
            )} />
        }
      </View >
      <View style={{ height: '7%', minHeight: 50, position: 'absolute', bottom: 85, alignItems: 'center', alignSelf: 'center' }} >
        {props.foodMap.get(route.params.id) &&
          <Pagination
            food={props.foodMap.get(route.params.id)}
            setcurrent={setcurrent}
            pageLimit={pageLimit}
            ass={ass}
            page={page}
            setpage={setpage}
            currentPage={currentPage}
            setcurrentPage={setcurrentPage}
          />
        }
      </View>

      <Pressable
        onPressIn={() => { navigation.navigate(token ? "FinallFoodPayment" : "Register") }}
        style={[styles.buttomPayment]}>

        <Image style={[styles.imagePayment]} source={require('../../assets/images/a13.jpg')} />
        <View style={styles.ViewPayment}>
          <Text style={styles.titleSubTitle} >مشاهده ی سبد و پرداخت</Text>
          <View style={styles.containSubPrice}>
            <Text style={styles.textPayment}>قیمت کل :</Text>
            <Text style={[styles.smalPrice, { top: 10 }]} >{_food.AllPrice(inputPrice, null)} تومان</Text>
          </View>
        </View>
      </Pressable>
    </View >
  )
}

export default ChildFood