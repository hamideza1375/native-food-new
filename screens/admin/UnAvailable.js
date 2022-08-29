import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Button from '../../Components/Button';
import Modal from '../../Components/Modal';
import { adminState } from '../../state/adminState';


export default Available = (props) => {
  const [show, setshow] = useState(false)
  let admin = new adminState(props)

  const send = async (available) => {
    admin.available(available)
  }

  return (
    <>
      <Button onPress={() => setshow(true)} >send</Button>
      <Modal style={{ width: '90%', height: 150, justifyContent: 'space-around' }} setShow={setshow} show={show}>
        <Text style={{ fontSize: 18 }} >{props.route.params.title}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
          <Button bgcolor='red' outline onPress={() => { send(false); setshow(false) }} >ناموجود</Button>
        </View>
      </Modal>
    </>
  )
}