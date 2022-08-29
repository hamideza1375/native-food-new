import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react'
import { Dimensions, View, Text, StyleSheet, Animated, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome5';

const width = Dimensions.get('window').width;

const Drawer = ({ route2, children, route, bgcolor = '#fff', style, icon }) => {
  const fadeAnim = useRef(new Animated.Value(-width * 2)).current;
  shadowRef=useRef()
  const navigation = useNavigation()

  const open = () => {
    setTimeout(() => {
      shadowRef.current && shadowRef.current.setNativeProps({style:{opacity: 1}})
    }, 300);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  const close = () => {
    shadowRef.current && shadowRef.current.setNativeProps({style:{opacity: 0}})
    Animated.timing(fadeAnim, {
      toValue: -width * 2,
      duration: 500,
      useNativeDriver: false
    }).start();
  };

  const hidden = fadeAnim.interpolate({
    inputRange: [-width * 2, 0],
    outputRange: [0, 1]
  })

  const Background = fadeAnim.interpolate({
    inputRange: [-width * 2, 0],
    outputRange: ['#fff', '#3334']
  })


  // console.log(route2);

  return (
    <View style={styles.container} >
      <View style={[styles.sidebar, { backgroundColor: bgcolor }, style]} >
        <Text style={styles.TextHeader}></Text>
        <Text style={styles.TextHeader}>{route}</Text>
        <Icon onPress={open} name={'bars'} color={'#777'} size={28} />
      </View>

      <View style={{flexGrow:1}} >
        {children}
      </View>

      <Animated.View style={[styles.container2,
      { transform: [{ translateX: fadeAnim }], opacity: hidden }]} >
        <Animated.View ref={shadowRef} onStartShouldSetResponder={close} style={[styles.pressable,{backgroundColor: Background}]} />
        <View style={styles.viewDriver} >
          {route2.map((r, key) => (
            <View key={key} style={styles.routeView} >
              <Pressable
                onPress={() => { navigation.navigate(r.title); close() }}
                style={[styles.viewActive, { backgroundColor: route == r.title ? "#ccf9" : "#f5f5f5" }]} >
                <Text style={[styles.textActive, { color: route == r.title ? "#47f" : "#777" }]}
                >{r.title}</Text>

                { icon && <Icon size={21} name="user" color="#777" style={{ color: route == r.title ? "#47e" : "#777" }} /> }

              </Pressable>
            </View>
          ))}


        </View>
      </Animated.View>
    </View>
  )
}


const styles = StyleSheet.create({
  TextHeader: {
    fontSize: 19,
    color: '#555',
    paddingBottom: 4,
    minWidth: 30,
  },
  sidebar: {
    height:'8%',
    minHeight:38,
    marginBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: .2,
    shadowRadius: 3,
    shadowOffset: {
      height: 2,
    },
  },
  textActive: {
    fontSize: 18,
    color: '#777',
    marginRight: 7
  },
  pressable: {
    backgroundColor: '#aaa5',
    zIndex: 50,
    width: '50%',
    height: 999,

  },
  routeView: {
    flexDirection: 'row',
    maxHeight: 60,
    minHeight: 55,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    borderRadius: 6

  },
  viewActive: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    width: "95%",
    height: '90%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 6,
    paddingRight: 8,

  },
  viewDriver: {
    right: 0,
    marginTop: -50,
    zIndex: 100,
    position: 'absolute',
    paddingTop: 65,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: "65%",
    height: '100%',
    backgroundColor: '#fff',
    borderWidth: .2,
    borderColor: '#999',
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: .7,
    shadowRadius: 7,
    shadowOffset: {
      width: 1,
      height: 2,
      borderRadius: 6,
    },
  },
  container: {
    backgroundColor: '#f5f5f5',
    position: 'relative',
    height: '100%',
    marginTop: 1
  },
  container2: {
    backgroundColor: '#f5f5f5',
    position: 'absolute',
    flexDirection: 'row',
    height: '130%',
    backgroundColor: 'transparent',
    width: '100%'
  },

})

export default Drawer