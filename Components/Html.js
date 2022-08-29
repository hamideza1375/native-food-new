import React from 'react'
import { View, Text, TextInput } from 'react-native';

export const i = (props) =>  (<TextInput editable={false} {...props} style={[{ fontStyle: 'italic' }, props.className, props.style]} >{props.children}</TextInput>)

export const div = (props) => (<View {...props} style={[{ paddingVertical: 5 }, props.className, props.style]} >{props.children}</View>)

export const span = (props) => (<View {...props} style={[{ alignSelf: 'flex-start' }, props.className, props.style]} >{props.children}</View>)

export const p = (props) => (<TextInput editable={false} {...props} style={[props.className, props.style]} >{props.children}</TextInput>)

export const h1 = (props) => (<TextInput editable={false} {...props} style={[{ fontSize: 24, fontWeight: '600' }, props.className, props.style]} >{props.children}</TextInput>)

export const h2 = (props) => (<TextInput editable={false} {...props} style={[{ fontSize: 22, fontWeight: '600' }, props.className, props.style]} >{props.children}</TextInput>)

export const h3 = (props) => (<TextInput editable={false} {...props} style={[{ fontSize: 20, fontWeight: '600' }, props.className, props.style]} >{props.children}</TextInput>)

export const h4 = (props) => (<TextInput editable={false} {...props} style={[{ fontSize: 18, fontWeight: '600' }, props.className, props.style]} >{props.children}</TextInput>)

export const h5 = (props) => (<TextInput editable={false} {...props} style={[{ fontSize: 16, fontWeight: '600' }, props.className, props.style]} >{props.children}</TextInput>)

export const h6 = (props) => (<TextInput editable={false} {...props} style={[{ fontSize: 14, fontWeight: '600' }, props.className, props.style]} >{props.children}</TextInput>)

export const br = (props) => ( <View {...props} style={[{ minWidth: '100%', paddingVertical: 7.5 }, props.className, props.style]} />)

export const hr = (props) => (<View {...props} style={[{ minWidth: '100%', paddingVertical: 5, borderTopWidth: 1, marginTop: 7 }, props.className, props.style]} />)

export const ul = (props) => (<View {...props} style={[props.className, props.style]}>{props.children}</View>)

export const li = (props) => (<TextInput editable={false} {...props} style={[{padding:3.5,alignSelf:'flex-start'},props.className, props.style]} >{props.children}</TextInput>)

export const small = (props) => (<TextInput editable={false} {...props} style={[{ fontWeight: '100' }, props.className, props.style]} >{props.children}</TextInput>)

export const big = (props) => (<TextInput editable={false} {...props} style={[{ fontWeight: '900' }, props.className, props.style]} >{props.children}</TextInput>)

export const mark = (props) => (<TextInput editable={false} {...props} style={[{backgroundColor: '#de39'},props.className, props.style]} >{props.children}</TextInput>)

export const textarea = (props) => (<TextInput editable={false} {...props} multiline value={props.value} style={[{minHeight:90, padding:4, textAlign:'right',marginHorizontal:1.5,borderWidth:1,borderRadius:5},props.className,props.style]} />)

export const row = (props) => (<View {...props} style={[{flexDirection:'row'},props.className, props.style]}>{props.children}</View>)


