import React from 'react'
import { View } from 'react-native'
import Form from '../../Components/Form'
import { resetpassword } from '../../services/userService'



export const ResetPass = (props) => {

  const { navigation, route, password, setPassword, setConfirmPassword, confirmPassword } = props

  const handle = async () => {
    try {
      const { status } = await resetpassword(route.params.id, { password, confirmPassword })
      if (status === 200) navigation.navigate('Login')
    } catch (err) { alert('خطایی رخ داد دوباره امتحان کنید'); }
  }

  return (
    // <WebView style={styles.container2} source={{ uri: props.route.params.uri }} />

    <View style={{ flex: 1, margin: 14, backgroundColor: "#fff" }}>
      <View style={{ borderRadius: 4, borderColor: 'silver', borderWidth: 1, padding: 12, flex:1 }}>
        <Form
          p cp
          password={password} setPassword={setPassword}
          setConfirmPassword={setConfirmPassword} confirmPassword={confirmPassword}
          onPress={handle} >
        </Form>
      </View>
    </View>
  )
}
export default ResetPass