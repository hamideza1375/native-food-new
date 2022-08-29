import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, Alert } from 'react-native';
import Button from '../../Components/Button';
import { deleteAddress, getAllAddress } from '../../services/foodService';


let textDecoration
const Address = (props) => {
  const [change, setchange] = useState(false)
  const [textDecorationLine, settextDecorationLine] = useState(0)
  const [Id, setId] = useState('')


  useEffect(() => {
    getAllAddress().then(({ data }) => {
      props.setallAddress(data)
    })
  }, [change])

  textDecoration = { textDecorationLine }



  let del = async (_id) => {
    Alert.alert(
      "مشتری حذف شود ؟",
      "",
      [
        { text: "Cancel" },
        { text: "yes", onPress: async () => await deleteAddress(_id) }
      ]
    );
    setchange(!change);
  }

  


  return (
    <ScrollView style={{ flex: 1, width: '100%', backgroundColor: '#fff' }} >
      {
        props.allAddress?.length ? props.allAddress.map((address, i) =>
          <View key={address._id} style={{
            alignSelf: 'center',
            borderWidth: .3,
            width: '90%',
            marginVertical: 10,
            padding: 15,
            backgroundColor: '#f5f5f5',
            borderRadius: 4
          }}>

            <View style={{ borderBottomWidth: .2, paddingBottom: 20, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }} >
              <Text ref={e => { if (e) address._id === Id && e.setNativeProps({ style: { textDecorationLine: 3 } }) }} ><Text style={{
                fontWeight: 'bold',
                textAlign: 'left'
              }} >نام: </Text>{address.fullname}</Text>
              <Text ref={e => { if (e) address._id === Id && e.setNativeProps({ style: { textDecorationLine: 3 } }) }} ><Text style={{ fontWeight: 'bold', textAlign: 'left' }} >شماره تلفن: </Text>{address.phone}</Text>
            </View>

            <View style={{ borderBottomWidth: .2, padding: 15, width: '100%' }} >
              <Text ref={e => { if (e) address._id === Id && e.setNativeProps({ style: { textDecorationLine: 3 } }) }} ><Text style={{ fontWeight: 'bold', textAlign: 'left' }} >آدرس: </Text>{address.formattedAddress?.split(",")[0] + address.formattedAddress?.split(",")[1]}</Text>
            </View>

            <View style={{ borderBottomWidth: .2, paddingVertical: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, }} >
              <Text ref={e => { if (e) address._id === Id && e.setNativeProps({ style: { textDecorationLine: 3 } }) }} ><Text style={{ fontWeight: 'bold' }} >پلاک: </Text>{address.floor}</Text>
              <Text ref={e => { if (e) address._id === Id && e.setNativeProps({ style: { textDecorationLine: 3 } }) }} ><Text style={{ fontWeight: 'bold' }} >طبقه: </Text>{address.plaque}</Text>
            </View>

            <View style={{ paddingTop: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-around', }} >
              <Button ref={e => this.ref = e} onPress={() => { setId(address._id); settextDecorationLine(3); }} outline bgcolor='green' style={{ backgroundColor: '#f7f7f7' }} >خانده شده</Button>
              <Button outline bgcolor='red' style={{ backgroundColor: '#f7f7f7' }} onPress={() => del(address._id)} >حذف</Button>
            </View>

          </View>
        ) : <></>
      }
    </ScrollView>
  )
}

export default Address