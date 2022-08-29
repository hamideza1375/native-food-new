import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { listAvailable, unAvailable } from '../../services/foodService'
import { Thead, Tbody, Tbtn } from '../../Components/Thead'
import styles from "./Admin.scss"
import Modal from '../../Components/Modal';
import Button from '../../Components/Button';

export default _listAvailable = (props) => {
  const [list, setlist] = useState([])
  const [_id, _setid] = useState()
  const [id, setid] = useState()

  let { bgColor, showModal, setShowModal, setass, ass } = props


  useEffect(() => {
    listAvailable().then(({ data }) => {
      setlist(data)
    })
  }, [showModal,id,_id])

  const send = async () => {
    await unAvailable({ available: true }, id, _id)
    setass(!ass)
  }


  return (
    <ScrollView style={{ width: '98%', alignSelf: 'center', marginTop: 15 }} >
      <View>
        <View style={styles.viewHead}>
          <Thead TheadStyle={styles.thead}>عنوان</Thead>
          <Thead TheadStyle={styles.thead}>نمایش</Thead>
        </View>
        {
          list.map((item, key) => (
            list.length &&
            <View key={item._id} style={styles.viewBody} >

              <Tbody TbodyStyle={bgColor(key)}>
                {item.title}
              </Tbody>

              <Tbtn TbodyStyle={bgColor(key)} onPress={() => { setShowModal(true); setid(item.refId); _setid(item._id) }} >
                موجود شد
              </Tbtn>

            </View>
          ))}
      </View>


      <Modal style={{ width: 333, height: 165, backgroundColor: '#eee', justifyContent:'space-around' }} setShow={setShowModal} show={showModal}>

        <Text style={{fontSize:17}} >از انتخابتون مطمئنید</Text>

        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
          <Button color='#fff' bgcolor='#9ad' onPress={() => { send(); setShowModal(!showModal) }} style={{ fontSize: 14, width: 78, marginVertical: 11 }}>بله</Button>
        </View>
      </Modal >

    </ScrollView>
  )
}