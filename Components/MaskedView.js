import React from 'react'
import { Image } from 'react-native'
import MaskedView from '@react-native-community/masked-view'
import styled from 'styled-components/native'


const MaskedView1 = (prop) => {
  return (
    <MaskedView style={[{ flex: 1, flexDirection: 'row',height: '100%' },prop.style]} 
       maskElement={
        <Div>
          {prop.children}
        </Div>
      }>
      <Img source={prop.source} />
    </MaskedView>
  )
}

export default MaskedView1


const Div = styled.View`
 background-color: transparent;
 flex: 1;
 justify-content: center;
 align-items: center 
`

const Img = styled.Image`
  width: 100%;
  height: 100%;
`