import React from 'react'
import { View, StyleSheet, Pressable, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Drawer = ({ route2, children, route, style, bgcolor = '#fff', color = "#777", activeColor = "#47f" }) => {
  const navigation = useNavigation()

  return (
    <View style={styles.container} >

      <View style={{flexGrow:1}} >
      {children}
      </View>


      <View opacity={1} style={[styles.sidebar, { backgroundColor: bgcolor }, style]} >
        {route2.map((r, key) => (
          <View key={key} style={[styles.routeView, { backgroundColor: 'transparent', }]} >
            <Pressable
              onPressIn={() => { navigation.navigate( r.navigate ?  r.navigate : r.title ) }}
              style={[styles.pressableActive, { backgroundColor: 'transparent' }]} >
              <Icon name={r.icon} size={26} style={{ color: route == r.title ? activeColor : color }} />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    position: 'relative',
    flex: 1

  },
  sidebar: {
    height:'8%',
    minHeight:38,
    bottom: 0,
    // position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: '#fff',
    elevation: 15,
    shadowColor: '#555',
    shadowOpacity: .2,
    shadowRadius: 3,
    shadowOffset: {
      height: -2,
    },
  },
  routeView: {
    flex: 1,
    height: 60,

  },
  pressableActive: {
    paddingTop: 7,
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    flex: 1,
    top: 5
  },
})

export default Drawer














/* import React from 'react'
import { View, StyleSheet, Pressable, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Drawer = ({ route2, children, route, style, bgcolor = '#fff', color="#777", activeColor="#47f" }) => {
  const navigation = useNavigation()

  return (
    <View style={styles.container} >
      {children}
      <View opacity={1} style={[styles.sidebar, { backgroundColor: bgcolor },
        {flexBasis:'5%',flexGrow:1}, style]} >
        {route2.map((r, key) => (
          <View key={key} style={[styles.routeView, { backgroundColor: 'transparent', }]} >
            <Pressable
              onPressIn={() =>{
                
                // navigation.navigate(route == 'Home' ? r.navigate ? r.navigate : r.title : r.title)}
                navigation.navigate(
     route === 'Home' ? (r.navigate ? (r.navigate !== 'Home' ? r.navigate : r.title ): r.title) : (r.title)
                )
              }}
              style={[styles.pressableActive, { backgroundColor: 'transparent' }]} >
              <Icon name={r.icon} size={26} style={{ color: route == r.title ? activeColor : color}} />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    position: 'relative',
    flex: 1

  },
  sidebar: {
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
    height: Platform.OS === 'ios' ? 67 : 60,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#555',
    shadowOpacity: .2,
    shadowRadius: 3,
    shadowOffset: {
      height: -2,
    },
  },
  routeView: {
    flex: 1,
    height: 60,

  },
  pressableActive: {
    paddingTop: 7,
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    flex: 1,
    top: 5
  },
})

export default Drawer */