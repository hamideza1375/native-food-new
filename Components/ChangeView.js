import React from 'react'
import { Dimensions, View, ScrollView } from 'react-native'
import { value } from '../../state/utils/contexts';




export let ChangeView = ({ children }) => {
    let { setwidth, setheight, width, height } = value()
  
    Dimensions.addEventListener('change', ({ window: { width, height } }) => {
      if (width < height) setwidth(width), setheight(height)
      else setwidth(width), setheight(height)
    })
  
    let Change = (width > height || height < 270) ? ScrollView : View
    
    let styleContainer = width > height ? { flexGrow: .7 } : {}
  
    return <Change style={styleContainer} >{children}</Change>
  
  }
  
  