import React from "react";
import { Animated, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome5';

export default function Dropdown({ myRef, children, icon, color = '#aaa' }) {

  let cd = () => {

     myRef.current && myRef.current.setNativeProps({ style: { transform: [{ scale: 1 }] } })
  }

  return (
    <>
      <Pressable onPress={() => { cd(); }}
        style={{ flexDirection: 'row' }} >
        <Icon name='caret-down' style={[{ top: 3, right: 2 }, { color: color?color:'#fff' }, { fontSize: 22.5 }]}></Icon>
        <Icon name={icon} style={[{ color: color?color:'#fff' }, { fontSize: 22.5 }]}></Icon>
      </Pressable>

      <Animated.View ref={myRef} style={{ minHeight:122,alignSelf: 'center', borderWidth: .5, borderRadius: 3, padding: 10, zIndex: 1000, top: 32, position: 'absolute', transform: [{ scale: 0 }], backgroundColor: '#fff', minWidth: 100 }}>
        {children}
      </Animated.View>
    </>
  );
}
