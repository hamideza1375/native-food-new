import React, { useRef, useState } from 'react'
import { View, StyleSheet, Easing, Animated, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import Icon2 from 'react-native-vector-icons/dist/FontAwesome';


const B_icon = (prop) => {
  const [show, setshow] = useState(false)
  const { color, bgcolor="#02f", size = 1, chatRef, icon, icon2, border="#01c", style, iconSize, iconPress } = prop

  // const bgClr = bgcolor ?
  //   (bgcolor == 'red') && '#f995' ||
  //   (bgcolor == 'blue') && '#9cf5' ||
  //   (bgcolor == 'green') && '#1412' ||
  //   (bgcolor == 'yellow') && '#ff96' ||
  //   (bgcolor == 'silver') && '#ccc7' ||
  //   (bgcolor == 'black') && '#ccc5' ||
  //   'rgba(240,240,240,.6)'
  //   :
  //   'rgba(150,200,240,.5)'




  const bgClr = bgcolor ?
      (bgcolor == 'red') && '#e22a' ||
      (bgcolor == 'blue') && '#01ca' ||
      (bgcolor == 'green') && '#171a' ||
      (bgcolor == 'yellow') && '#f9c000aa' ||
      (bgcolor == 'silver') && '#666a' ||
      (!border) && bgcolor ||
      (border) && bgcolor ||
      'rgba(240,240,240,.6)'
      :
      'rgba(150,200,240,.5)'





  const fadeAnim = useRef(new Animated.Value(10)).current;

  // fadeAnim.addListener

  const fadeOut = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 100,
        duration: 300,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnim, {
        toValue: 10,
        duration: 300,
        useNativeDriver: false,
        // easing: Easing.bounce,
      }),
      // setshow(true)
    ]).start();
  };

  const iterPlt = fadeAnim.interpolate({
    inputRange: [10, 100],
    outputRange: ["transparent", bgClr]
  })



  return (
    <Animated.View 
    ref={chatRef}
    style={[styles.animation,
    { transform: [{ scale: size }], backgroundColor: iterPlt }, style]}>
      <Animated.View
      onStartShouldSetResponder={prop.onPress}
        style={[styles.pressable, {
          borderColor: 
            (bgcolor == 'red') && '#e22' ||
            (bgcolor == 'blue') && '#01c' ||
            (bgcolor == 'green') && '#171' ||
            (bgcolor == 'yellow') && '#f9c000' ||
            (bgcolor == 'silver') && '#666' ||
            bgcolor ||
            border,
          backgroundColor: 
            (bgcolor == 'red') && '#f22' ||
            (bgcolor == 'blue') && '#22f' ||
            (bgcolor == 'green') && '#080' ||
            (bgcolor == 'yellow') && '#fc0' ||
            (bgcolor == 'silver') && '#777' ||
            bgcolor

        }]}
      onTouchStart={fadeOut}
      // onResponderStart={fadeOut}
      // show && { borderColor: iterPlt }
      >
        {
          icon ?
          <Icon name={icon} color={color ? color : 'white'} size={iconSize?iconSize:28} iconPress={iconPress} />
          :
          <Icon2 name={icon2} color={color ? color : 'white'} size={iconSize?iconSize:28} iconPress={iconPress} />
     }
      </Animated.View>
    </Animated.View>
  )
}

export default B_icon






const styles = StyleSheet.create({
  animation: {
    width: 75,
    height: 75,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',

  },
  pressable: {
    borderWidth: 7,
    width: 65,
    height: 65,
    borderRadius: 99,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})