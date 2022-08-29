import React from 'react'
import Modal from '../../Components/Modal';
import Card from '../../Components/Card';
import { View } from 'react-native';
import Button from '../../Components/Button';
import { adminState } from '../../state/adminState';






const _Modal = (props) => {

  const { setShowModal, showModal, id, id2, setass, ass } = props

  let admin = new adminState(props)



  return (
    <View style={{height:0}} > 
    <Modal style={{ width: 333, height: 165, backgroundColor: '#eee' }}
      setShow={setShowModal} show={showModal}>
      <View>
        <Card bgcolor='#f8a2' color='#a489' header={`${id} `}
          style={{
            width: 280, justifyContent: 'center', alignItems: 'center',
            marginTop: 10
          }} />
      </View>
      <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
        <Button color='#fff' bgcolor='#9ad' onPress={() => {
          !id2 ?
            admin.deleteFoodAction(id)
            :
            admin.deleteChildFoodAction(id, id2)

          setShowModal(!showModal); setass(!ass)
        }} style={{ fontSize: 14, width: 78, marginVertical: 11 }}>بله</Button>
        <Button color='#fff' bgcolor='#d7a' onPress={() => setShowModal(!showModal)} style={{ fontSize: 14, width: 78, marginVertical: 11 }}>خیر</Button>
      </View>
    </Modal >
    </View>
    )
}

export default _Modal
