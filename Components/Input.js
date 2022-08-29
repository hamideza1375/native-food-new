import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';


function Input(props) {
  return (
    <View style={[styles.container, props.style]} >
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        spellCheck={true}
        ref={props.ref}
        {...props}
        placeholder={props.p}
        style={[styles.input, { color: props.color ? props.color : '#222', },props.className]} />
      {props.icon &&
        <View onStartShouldSetResponder={props.iconPress} style={styles.ViewIcon} >
          <Icon style={props.styleIcon} name={props.icon} size={props.iconSize ? props.iconSize : 22} color={props.iconColor ? props.iconColor : "#666"} />
        </View>
      }
    </View>
  )
}



export default Input;
const styles = StyleSheet.create({
  ViewIcon: {
    width: '15%',
    textAlign: 'center',
    position: 'absolute',
    right: 1,
    borderLeftWidth: .3,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    textAlign: "right",
    width: '84.3%',
    fontSize: 15,
    padding: 6,
    height: '100%',
    minWidth: '84.3%',
    position: 'absolute',
    left: 1,
  },
  container: {
    borderWidth: .3,
    flexDirection: 'row',
    position: 'relative',
    minHeight:55,
    height: 'auto',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
})