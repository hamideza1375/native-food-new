import React from 'react'
import { View } from 'react-native'
import Form from '../../Components/Form'
import { userState } from '../../state/userState'
import styles from './User.scss';

export const ForgetPass = (props) => {
  let { email, setEmail } = props

  _user = new userState(props)

  const sendForm = async () => _user.forgetAction()
  return (
    <View style={{ flex: 1, margin: 14, backgroundColor: "#fff" }}>
      <View style={{ borderRadius: 4, borderColor: 'silver', borderWidth: 1, padding: 12, flex:1 }}>
        <Form
          e
          checkText="مرا بخاطر بسپار"
          email={email} setEmail={setEmail}
          onPress={() => sendForm()}
        />
      </View>
    </View>
  )
}
export default ForgetPass
