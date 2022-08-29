import React from 'react';
import Form from '../../Components/Form'
import { createNotification } from '../../services/foodService';
import { localhost } from '../../services/host.json'
import { adminState } from '../../state/adminState';


const Notifee = (props) => {
  let { title, setTitle, info, setInfo } = props
  let admin = new adminState(props)


  const createNotifee = async() => {
    admin.notifee()
  }


  return (
    <>
      <Form
        t i host={`${localhost}`}
        title={title} setTitle={setTitle}
        info={info} setInfo={setInfo}
        onPress={() => createNotifee()} />
    </>
  )
}


export default Notifee
