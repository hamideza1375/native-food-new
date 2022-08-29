import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, Alert } from 'react-native';
import Button from '../../Components/Button';
import { deleteAddress, getAllAddress } from '../../services/foodService';


const Address = (props) => {
  const [change, setchange] = useState(false)
  const [foodMap] = useState(new Map())

  useEffect(() => {
    getAllAddress().then(({ data }) => {
      props.setallAddress(data)
      console.log(data);
    })
  }, [change])



  let del = async (_id) => {
    Alert.alert(
      "مشتری حذف شود ؟",
      "",
      [
        { text: "Cancel" },
        { text: "yes", onPress: async () => { await deleteAddress(_id); setchange(!change); } }
      ]
    )
  }


  return (
    <ScrollView style={{ flex: 1, width: '100%', backgroundColor: '#eee' }} >
      {
        props.allAddress?.length ? props.allAddress.map((address, i) => (

          address.del !== props.tokenValue.userId &&
          <View key={address._id} style={{
            alignSelf: 'center',
            borderWidth: .3,
            width: '90%',
            marginVertical: 15,
            padding: 15,
            backgroundColor: '#f5f5f5',
            borderRadius: 4
          }}>

            <View style={{ borderBottomWidth: .2, paddingBottom: 20, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }} >
              <Text style={{ textDecorationLine: foodMap.get(address._id) ? 'line-through' : 'none', textDecorationStyle: 'double' }}><Text style={[{
                fontWeight: 'bold',
                textAlign: 'left',

              }]} >نام: </Text>{address.fullname}</Text>
              <Text style={{ textDecorationLine: foodMap.get(address._id) ? 'line-through' : 'none', textDecorationStyle: 'double' }} ><Text style={{ fontWeight: 'bold', textAlign: 'left' }} >شماره تلفن: </Text>{address.phone}</Text>
            </View>

            <View style={{ borderBottomWidth: .2, padding: 15, width: '100%' }} >
              <Text style={{ textDecorationLine: foodMap.get(address._id) ? 'line-through' : 'none', textDecorationStyle: 'double' }} ><Text style={{ fontWeight: 'bold', textAlign: 'left' }} >آدرس: </Text>{address.formattedAddress?.split(",")[0] + address.formattedAddress?.split(",")[1]}</Text>
            </View>

            <View style={{ borderBottomWidth: .2, paddingVertical: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, }} >
              <Text style={{ textDecorationLine: foodMap.get(address._id) ? 'line-through' : 'none', textDecorationStyle: 'double' }} ><Text style={{ fontWeight: 'bold' }} >پلاک: </Text>{address.floor}</Text>
              <Text style={{ textDecorationLine: foodMap.get(address._id) ? 'line-through' : 'none', textDecorationStyle: 'double' }} ><Text style={{ fontWeight: 'bold' }} >طبقه: </Text>{address.plaque}</Text>
            </View>


            <View style={{ borderBottomWidth: .2, paddingVertical: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, }} >
            <Text style={{ textDecorationLine: foodMap.get(address._id) ? 'line-through' : 'none', textDecorationStyle: 'double' }} ><Text style={{ fontWeight: 'bold' }} >قیمت: </Text>{address.price}</Text>
              <Text style={{ textDecorationLine: foodMap.get(address._id) ? 'line-through' : 'none', textDecorationStyle: 'double' }} ><Text style={{ fontWeight: 'bold' }} >شماره: </Text>{address.id}</Text>
              <Text style={{ color: '#ababab', }}>{address.createdAt.split("T")[1].split(".")[0]}</Text>
            </View>

            <View style={{ paddingTop: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-around', }} >
              <Button outline bgcolor={!foodMap.get(address._id) ? 'green' : 'orange'} style={{ backgroundColor: '#f7f7f7', height: 30 }} ref={e => this.ref = e} onPress={() => { !foodMap.get(address._id) ? foodMap.set(address._id, address._id) : foodMap.delete(address._id); setchange(!change); }} > {!foodMap.get(address._id) ? 'خانده شده ' : 'خانده نشده'}</Button>
              <Button outline bgcolor='red' style={{ backgroundColor: '#f7f7f7', height: 30 }} onPress={() => del(address._id)} >حذف</Button>
            </View>

          </View>

        )
        ) : <></>
      }
    </ScrollView>
  )
}

export default Address