import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Button from './Button'


export const Thead = (prop) => {
  return (
    <View {...prop} style={[styles.table, {height: 40},prop.TheadStyle]} >
      <Text  style={[{textAlign:'center'},{fontSize:prop.fontSize,color:prop.color}]}> {prop.children}</Text>
    </View>
  )
}

export const Tbody = (prop) => {
  return (
    <View style={[styles.table,{fontWeight:'300'}, prop.TbodyStyle]} >
      <Text style={[[{textAlign:'center'},{fontSize:prop.fontSize,color:prop.color}]]} > {prop.children}</Text>
    </View>
  )
}

export const Tbtn = (prop) => {
  return (
    <View style={[styles.table, prop.TbodyStyle]} >
       <Button {...prop} style={[styles.btn,prop.style]} >{prop.children}</Button> 
    </View>
  )
}



const styles = StyleSheet.create({
  table: {
    height: 50,
    flex: 1,
    backgroundColor: 'white',
    borderColor: '#666',
    borderWidth: .8,
    fontWeight: '800',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1.5,
    
  },
  btn:{
    flexBasis:'98%',
    width:'98%'
  }

});


