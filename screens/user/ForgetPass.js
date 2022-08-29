import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { userState } from '../../state/userState'
import styles from "../food/Food.scss"
import Input from '../../Components/Input'
import Button from '../../Components/Button'

const Sms = (props) => {
 const _user = new userState(props)
  const handlePhone = () => _user.smsAction()
  const handleCode = () => _user.codeAction()

  useEffect(() => {
    return () => {
      props.setreplaceInput(false)
    }
  }, [])
  

  return (
    <View style={{ flex: 1, margin: 14, backgroundColor: "#fff" }}>
      <View style={{ borderRadius: 4, borderColor: 'silver', borderWidth: 1, padding: 12, flex: 1 }}>
        <View style={styles.viewCnt}>

          {!props.replaceInput ?
            <Text style={{alignSelf:'center'}} >شماره تلفن خودرا وارد کنید</Text>
            :
            <Text style={{alignSelf:'center'}}>کد ارسال شده را وارد کنید</Text>

          }

          {!props.replaceInput ? <View style={styles.viewInput}>
            <Input value={props.myPhone} onChangeText={(text) => props.setMyPhone(text)} style={{ width: '100%' }} p="شماره تلفن" />
            <Button outline style={{width:165, marginTop:20}} onPress={handlePhone} >ارسال</Button>
          </View>
            :
            <View style={styles.viewInput}>
              <Input value={props.myCode} onChangeText={(text) => props.setMyCode(text)} style={{  width: '100%' }} p="ارسال کد" />
              <Button outline style={{width:65, marginTop:10}} onPress={handleCode} >ارسال</Button>
            </View>
          }
        </View>
      </View>
    </View>
  )
}
export default Sms
