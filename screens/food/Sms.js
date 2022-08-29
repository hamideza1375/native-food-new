import React from 'react'
import { View, Button, TextInput } from 'react-native'
import Drawer from '../../Components/Drawer'
import BottomTab from '../../Components/BottomTab'
import { codeAction, smsAction } from '../../state/userState'
import { bottomProfile, drawer } from '../../state/utils/top-bottom'
import styles from "./Food.scss"

const Sms = (props) => {
  const { route } = props
  const bottom = bottomProfile(props)
  const handlePhone = () => smsAction()
  const handleCode = () => codeAction()
  return (
      <Drawer route={route.name} route2={drawer} >
    <BottomTab route={route.name} route2={bottom} >
        <View style={styles.viewCnt}>
          <View style={styles.viewInput}>
            <TextInput value={props.myPhone} onChangeText={(text) => props.setMyPhone(text)} style={{ borderWidth: 1 }} placeholder="phone" />
            <Button onPress={handlePhone} title="ارسال" />
          </View>
          <View style={styles.viewInput}>
            <TextInput value={props.myCode} onChangeText={(text) => props.setMyCode(text)} style={{ borderWidth: 1 }} placeholder="code" />
            <Button onPress={handleCode} title="ارسال" />
          </View>
        </View>
    </BottomTab>
      </Drawer>
  )
}
export default Sms
