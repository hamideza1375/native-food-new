import React from "react";
import { Animated, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome5';


 export default function Dropdown({ rf, one,two,fadeAnim,messages, message, myRef, children }) {



  let cd = () => {
    two(),
    setTimeout(() => {
      messages.forEach((t) => t._id._children &&
        fadeAnim.addListener(({ value }) => {
          typeof t._id == 'object' && t._id.setNativeProps({ style: { transform: [{ scale: 0 }] } })
        }))}, 500)
    

      one()
    fadeAnim.addListener(({ value }) => {
      typeof rf == 'object' && message._id.setNativeProps({ style: { transform: [{ scale: value }] } })
    })
  }

  return (
    <>
      <Pressable onPress={() => { cd(); }}
        style={{ flexDirection: 'row' }} >
        <Icon name='caret-down' style={[{ top: 3, right: 2 }, { color: '#fff' }, { fontSize: 22.5 }]}></Icon>
        <Icon name={'trash'} style={[{ color: '#fff' }, { fontSize: 22.5 }]}></Icon>
      </Pressable>

      <Animated.View ref={myRef} style={{ alignSelf: 'center', borderWidth: .5, borderRadius: 3, padding: 10, zIndex: 10, top: 32, position: 'absolute', transform: [{ scale: 0 }], backgroundColor: '#fff', minWidth: 100 }}>
        {children}
      </Animated.View>
    </>
  );
}


