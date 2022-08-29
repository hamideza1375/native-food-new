import React from 'react';
import Form from '../../Components/Form'
import { userState } from '../../state/userState';
import { localhost } from '../../services/host.json'



export default Admin = (props) => {
  let { phone, setPhone } = props


  _user = new userState(props)

  const sendAdmin = () => {
    _user.deleteAdmin()
  }


  return (
    <>
      <Form
        ph host={`${localhost}`}
        phone={phone} setPhone={setPhone}
        onPress={() => sendAdmin()} />
    </>
  )
}