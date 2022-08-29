import React from 'react'
import { Dimensions, View, ScrollView, Text, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import BottomTab from '../../Components/BottomTab'
import { bottomProfile } from '../../state/utils/top-bottom';
import { userState } from '../../state/userState';
import { sum } from '../../state/foodState';
import styles from "./Food.scss"
import { localhost } from '../../services/host.json'
import Loading from '../../Components/Loading'
import Button from '../../Components/Button';




export let _scrollView = (props) => {

  let { width, height, children } = props

  let ChangeStyle = (width > height) ? { marginBottom: 10, flex: 1 } : { flex: 1 }

  return (
    <ScrollView style={[ChangeStyle]} {...props} contentContainerStyle={{ flexGrow: 1, minWidth: '100%' }} >
      {children}
    </ScrollView>
  )
}




const Home = (props) => {
  const { setwidth, setheight, foods, show, navigation, route } = props


  Dimensions.addEventListener('change', ({ window: { width, height } }) => {
    setwidth(width); setheight(height)
  })


  const bottom = bottomProfile(props)
  let _food = new sum(props)
  _food.getTitleFood(show)
  // _food.backHandler()

  _user = new userState(props)
  _user._token()
  _user._tokenValue()
  const handleToast = () => toast(" ✕ لطفا خیر باید بروندید از سراب")

  return (
    <BottomTab route={route.name} route2={bottom} >
      <_scrollView >
        <View style={styles.container}>
          <View style={styles.containHead}>
            <View style={[styles.viewSearch, { width: '90%' }]}>
              <Icon name="search" size={20} color="#999" style={{ padding: 11 }} />
              <TextInput placeholder="جستجو غذا و نوشیدنی" style={styles.search} />
            </View>
          </View>
          <Image source={require("../../assets/images/iconpiza.png")} style={styles.imageLogo} />
          <View style={styles.containerFood}>
            {!foods.length ?
              <Loading style={{ top: 70 }} animating={!foods.length ? true : false} />
              :
              foods.map((food) => (
                <TouchableOpacity key={food._id} style={[styles.pressOpacity, /* {display:tokenValue.isAdmin ? 'flex' : 'none' } */]}
                  onPress={() => { navigation.navigate(`ChildFood`, { id: food._id, title: food.title }); props.setchangeFood(!props.changeFood) }} >
                  <View style={styles.containImageShadow}>
                    <Image source={{ uri: `${localhost}/upload/${food.imageUrl}` }} style={[styles.imageFood]} />
                  </View>
                  <Text style={[styles.textTitle]}>{food.title}</Text>
                </TouchableOpacity>
              ))}
          </View>
      
        </View>
      </_scrollView>
    </BottomTab>
  )
}
export default Home