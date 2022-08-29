import React, { useCallback, useState } from "react";
import { ActivityIndicator, View, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { useFocusEffect } from '@react-navigation/native';


const App = (props) => {
  const { time } = props

  const [showLoad, setshowLoad] = useState(true)


  useFocusEffect(useCallback(() => {
      let qq = setTimeout(() => {
        setshowLoad(false)
      }, time ? time : 7000);

    return () => (clearInterval(qq))
  }, []))


  return (
    <View style={[{ minWidth: '100%', justifyContent: 'center', alignItems: 'center', top: 40 }, props.style]} >
      <View style={{ marginBottom: 'auto' }} >

        {showLoad ?
          < ActivityIndicator {...props} style={{ transform: [{ scale: 2 }] }} />
          :
          <View style={{ alignItems: 'center' }}>
            <Icon name="frown" size={55} style={[{ marginBottom: 10 }]} />
            <TextInput value={props.text ? props.text : 'متأستفانه چیزی پیدا نشد'} ref={(e) => mrfInput = e} />
          </View>

        }
      </View>
    </View>
  )
}
export default App;
