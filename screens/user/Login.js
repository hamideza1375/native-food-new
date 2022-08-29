import React, { useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native'
import localStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import BottomTab from '../../Components/BottomTab'
import TopTab from '../../Components/TopTab'
import Form from '../../Components/Form'
import { userState } from '../../state/userState';
import { topUser, bottomProfile } from '../../state/utils/top-bottom';
import { localhost } from '../../services/host.json'



const Login = (props) => {
  const [change, setchange] = useState()
  
  let { token, setFullname, setRemember, remember, captcha, setCaptcha, email, setEmail, phone, setPhone, password, setPassword, navigation, route } = props
  if (token) navigation.navigate('Home')
  const bottom = props && bottomProfile(props)
  _user = new userState(props)

  const sendLogin = () => {
    _user.sendLoginAction()
  }


  useFocusEffect(useCallback(() => (() => { setFullname(''); setEmail(''); setPhone(''); setPassword('') }), []))


  // Math.abs(element.scrollHeight - element.clientHeight - element.scrollTop) < 1

  return (
    <BottomTab route={route.name} route2={bottom} >
      <TopTab route={route.name} route2={topUser} >
        <Form
          p c ch ph
          sizeY={.95}
          host={`${localhost}`}
          checkText="مرا بخاطر بسپار"
          setRemember={setRemember} remember={remember}
          captcha={captcha} setCaptcha={setCaptcha}
          phone={phone} setPhone={setPhone}
          password={password} setPassword={setPassword}
          onPress={() => { setchange(!change); sendLogin(); }}>
          <Text onPress={() => navigation.navigate('ForgetPass')} >فراموشی رمز عبور</Text>
        </Form>
      </TopTab>
    </BottomTab>
  )
}
export default Login
