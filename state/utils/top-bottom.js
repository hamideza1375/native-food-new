import { useRoute, useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
export const drawer = [{ title: 'FinallFoodPayment' }, { title: 'Location' }, { title: 'Profile' }, { title: 'Logout' }]
export const topUser = [{ title: 'Register' }, { title: 'Login' }]





export const bottomProfile = (props) => {
  const route = useRoute()

  useFocusEffect(useCallback(() => {
    return () => {
      if (props._key === '100') {
        props.setnavigateProfile(route.name)
      }
      if (props._key === '120') {
        props.setnavigateUser(route.name)
      }
    }

  }, []))

  return (
    [
      { title: 'Home', icon: 'home', navigate: null },
      props.token ?
        { title: (props._key == '100') ? route.name : 'Profile', icon: 'user', navigate: props.navigateProfile }
        :
        { title: (props._key == '120') ? route.name : 'Register', icon: 'eye', navigate: props.navigateUser }
    ]
  )


}