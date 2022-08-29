import React, { useState, useRef } from "react";
import { Animated, LayoutAnimation, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';


export default function App({ onPress, style, header, body, color, bgcolor, icon, icon2, size }) {

  const [show, setShow] = useState(true)


  const fadeAnim = useRef(new Animated.Value(0)).current;



  const fadeOut = () => {
    if (show)
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false
      }).start();

    else
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false
      }).start();
  };


  return (
    <>
      <TouchableOpacity
        onPressIn={onPress}
        onPress={() => { setShow(!show); fadeOut() }} activeOpacity={0.8}
        style={[styles.headView,
        {
          backgroundColor:
            !bgcolor && "#0091EA" ||
            bgcolor == "blue" && "#22f" ||
            bgcolor == "red" && "#f33" ||
            bgcolor == "green" && "#292" ||
            bgcolor == "silver" && "#999" ||
            bgcolor == "black" && "#555" ||
            bgcolor == "yellow" && "orange" ||
            bgcolor && bgcolor
        }
          , { borderRadius: 3 }, style]}>
        <Text style={[styles.headText, { color: color && color || 'white' }, { fontSize: size ? size : 22.5 }]}>{header}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 105 }}>
          {icon2 && <Icon name={icon2} color={color && color || 'white'} size={size ? size : 24} style={styles.headText} />}
          {icon && <Icon name={icon} color={color && color || 'white'} size={size ? size : 24} style={styles.headText} />}
        </View>
      </TouchableOpacity>
      <Animated.View style={{ height: show?0:null, overflow: "hidden", transform:[{scale:fadeAnim}] }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.subView}>
          <View style={styles.subText}>
            {body}
          </View>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}




const styles = StyleSheet.create({
  subView: {
    padding: 5,
    width: "100%",
    borderBottomWidth: .4,
  },
  subText: {
    // textAlign: 'left',
    // alignSelf: 'flex-start',
    fontSize: 17,
    fontWeight: '100',
    paddingHorizontal: 10,
    alignItems:'center'
  },
  headView: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headText: {
    textAlign: "left",
    padding: 10,
    paddingVertical: 14,
  },
});



// shadowColor: '#55f',
// shadowOffset:3,
// shadowOpacity: 15,
// shadowRadius: 15,

// bgcolor == 'blue' && '#bfd' ||
// bgcolor == 'red' && '#fdb' ||
// bgcolor == 'green' && '#dfd' ||
// bgcolor == 'yellow' && '#ffb' 