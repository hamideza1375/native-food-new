import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import RNLocation from 'react-native-location';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import Drawer from '../../Components/Drawer'
import BottomTab from '../../Components/BottomTab'
import { userState } from '../../state/userState';
import { drawer, bottomProfile } from '../../state/utils/top-bottom';
import styles from './User.scss';
import Toast from '../../Components/Toast';
import Button from '../../Components/Button';
import { sum } from '../../state/foodState';


//! a download

const Location = (props) => {

  let { search1, setSearch1, markers, revers, route, allItemLocation } = props
  const bottom = bottomProfile(props)
  const [show, setshow] = useState(true)
  _user = new userState(props)
  let _food = new sum(props)

  _user.reversAction()
  let rum = () => search1 && _user.geoCodeAction()
  const uy = (e) => _user.geoCodeAction2(e)
  RNLocation.configure({ distanceFilter: 100 })


  // useEffect(() => {
  //   if (allItemLocation && allItemLocation.longitude &&
  //      (allItemLocation.longitude < 57.63 || allItemLocation.longitude > 57.711 ||
  //     allItemLocation.latitude < 36.191 || allItemLocation.latitude > 36.255) || allItemLocation.streetName === "سبزوار - اسفراین" || allItemLocation.zipcode !== "96139-44591" && allItemLocation.city !== "دهستان قصبه شرقی" && allItemLocation.city !== "شهر سبزوار") Toast('4')
  // }, [allItemLocation])

  // useEffect(() => {
  //   if (allItemLocation && allItemLocation.longitude &&
  //     allItemLocation.longitude < 57.63 ||
  //     allItemLocation.longitude > 57.711 ||
  //     allItemLocation.latitude < 36.191 ||
  //     allItemLocation.latitude > 36.239) Toast('4')
  // }, [allItemLocation])


  useEffect(() => {
    if (allItemLocation && allItemLocation.longitude) {
      if (
        allItemLocation.longitude < 57.645 ||
        allItemLocation.longitude > 57.711 ||
        allItemLocation.latitude < 36.191 ||
        allItemLocation.latitude > 36.239 ||
        allItemLocation.streetName === "سبزوار - اسفراین"
      ) Toast('این منطقه از ارسال غذا پشتیبانی نمیکند')
    }
  }, [allItemLocation])



  return (
    <Drawer route={route.name} route2={drawer} >
      <BottomTab route={route.name} route2={bottom} >

        <View style={styles.containSearch}>
          <View style={styles.viewSearch}>
            <Icon
              onPress={() => { rum(); setshow(true); myRf && myRf.setNativeProps({ text: '' }); myRf.blur() }}
              name="search" size={20} color="#999" style={{ flex: 1, padding: 10 }} />
            <TextInput
              onSubmitEditing={() => { rum(); setshow(true); myRf && myRf.setNativeProps({ text: '' }); myRf.blur() }}
              textContentType="fullStreetAddress"
              autoComplete="street-address"
              ref={(e) => myRf = e}
              // value={search1}
              onChangeText={setSearch1}
              placeholder="جستجو"
              style={styles.search}
            />
          </View>
        </View>

        <View style={{ flex: 1 }} >
          <View style={{ flex: 1 }}>
            <View style={[styles.container, s.cnt]}>
              <MapView
                region={markers}
                showsUserLocation={true}
                style={[styles.map, s.mp]}
              >
                <Marker
                  draggable={true}
                  coordinate={markers}
                  onDragEnd={(e) => { uy(e); setshow(true) }}
                  onPress={() => { setshow(!show) }}
                  image={require("../../assets/images/marker1.png")}
                />
              </MapView>

              {show &&
                <View style={styles.containSubtitle}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: .5 }} >

                      <View style={{ flexDirection: 'row', alignContent: 'center' }} >
                        <Text style={{ marginRight: 2 }}>پلاک:</Text>
                        <TextInput value={props.plaque} keyboardType={'numeric'} onChangeText={(text) => props.setplaque(text)} style={{ width: 35, height: 25, borderWidth: .2, textAlign: 'center' }} />
                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
                        <Text style={{ marginRight: 2 }}>طبقه:</Text>
                        <TextInput value={props.floor} keyboardType={'numeric'} onChangeText={(text) => props.setfloor(text)} style={{ width: 35, height: 25, borderWidth: .2, textAlign: 'center' }} />
                      </View>

                    </View>

                    <View style={{ flex: .4 }} >
                      <Button onPress={() => props.plaque && props.floor ? _food.payment() : Toast('کادر پلاک و طبقه را پر کنید')}  >صفحه ی پرداخت</Button>
                    </View>

                  </View>
                  {(revers && revers.streetName != undefined) ? <Text style={{ margin: 3 }} /> : null}
                  <Text style={styles.textSubtitle}>{revers && revers.formattedAddress?.split(",")[0] + revers.formattedAddress?.split(",")[1]}</Text>
                </View>
              }
            </View >
          </View>
        </View>
      </BottomTab>
    </Drawer>
  );
}

const s = StyleSheet.create({
  cnt: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mp: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default Location