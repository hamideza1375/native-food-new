import React from 'react'
import { I18nManager,DevSettings } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import App from './App';

I18nManager.forceRTL(true)
I18nManager.allowRTL(false)

// if (I18nManager.isRTL === false) {
//   DevSettings.reload()
// }

console.disableYellowBox = true

const App2 = () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}

export default App2;



