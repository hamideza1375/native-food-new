import { sendcode, verifycode, loginUser, registerUser, forgetpassword, useradmin, deleteAdmin } from "../services/userService"
import localStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigationState, useNavigation } from '@react-navigation/native';
import { useEffect } from "react";
import { launchImageLibrary } from "react-native-image-picker";
import jwt_decode from "jwt-decode";
import { geocode, reverse } from "../services/foodService"

let loginInterval = null

export function userState(props) {
  const route = useRoute()
  const navigation = useNavigation()
  const ind = useNavigationState((state) => state)


  this.imagePicker = (mediaType) => {
    launchImageLibrary({ mediaType }, (res) => {
      if (!res.didCancel) props.setImageUrl({ name: res.assets[0].fileName, type: res.assets[0].type, uri: res.assets[0].uri })
      else console.log('err');
    })
  }


  this.addAdmin = async () => {
    await useradmin({ phone: props.phone });
    navigation.goBack()
  }


  this.deleteAdmin = async () => {
    await deleteAdmin({ phone: props.phone });
    navigation.goBack()
  }


  



  // this.sendLoginAction = async () => {
  //   let d = new Date()
  //   let locMinut = await localStorage.getItem('getMinutes')
  //   let svl = await localStorage.getItem("several")
  //   if ((locMinut - d.getMinutes()) <= 1) {
  //     await localStorage.removeItem("several")
  //     await localStorage.removeItem('getTime')
  //     await localStorage.removeItem('getMinutes')
  //   }  
  //   if (JSON.parse(svl) < 5) {
  //     await localStorage.setItem('getMinutes', JSON.stringify(d.getMinutes() + 5))
  //     localStorage.getItem("several").then((several) => {
  //       localStorage.setItem("several", JSON.stringify(JSON.parse(several) + 1)).then(() => { })
  //     })
  //     const { data } = await loginUser({ email: props.email, password: props.password, phone: props.phone, captcha: props.captcha, remember: props.remember ? "1h" : "100h" }, navigation);
  //     await localStorage.setItem("token", data.token);
  //     await localStorage.setItem("exp", data.exp);
  //     const user = jwt_decode(data.token)
  //     props.settokenValue(user)
  //     props.settimeChange(5)
  //     navigation.navigate("Profile")
  //   }
  //   else {
  //     let loc = await localStorage.getItem('getTime')
  //     if (loc === '' || loc === null || !loc) {
  //       await localStorage.setItem('getTime', JSON.stringify(d.getTime() + 300000))
  //       await localStorage.setItem('getMinutes', JSON.stringify(d.getMinutes() + 5))
  //     }
  //     alert(`تعداد دفعات وارد شده بیشتر از حد مجاز بود ${locMinut - d.getMinutes()} دقیقه دیگر دوباره امتحان کنید`)
  //   }
  // }











  // //Login
  // this.sendLoginAction = async () => {
  //   loginInterval && clearInterval(loginInterval)
  //   let d = new Date()
  //   let locMinut = await localStorage.getItem('getMinutes')
  //   let svl = await localStorage.getItem("several")
  //   if ((locMinut - d.getMinutes()) <= 1) {
  //     await localStorage.removeItem("several")
  //     await localStorage.removeItem('getMinutes')
  //   }
  //   if (JSON.parse(svl) < 5) {
  //     loginInterval = setTimeout(async () => {
  //       await localStorage.removeItem("several")
  //       await localStorage.removeItem('getMinutes')
  //     }, 120000);
  //   }
  //   if (JSON.parse(svl) < 5 || !locMinut ) {
  //     await localStorage.removeItem('getTime')
  //     await localStorage.setItem('getMinutes', JSON.stringify(d.getMinutes() + 5))
  //     localStorage.getItem("several").then((several) => {
  //       localStorage.setItem("several", JSON.stringify(JSON.parse(several) + 1)).then(() => { })
  //     })
  //     const { data } = await loginUser({ email: props.email, password: props.password, phone: props.phone, captcha: props.captcha, remember: props.remember ? "1h" : "100h" }, navigation);
  //     await localStorage.setItem("token", data.token);
  //     await localStorage.setItem("exp", data.exp);
  //     const user = jwt_decode(data.token)
  //     props.settokenValue(user)
  //     props.settimeChange(5)
  //     navigation.navigate("Profile")
  //   }
  //   else {
  //     let loc = await localStorage.getItem('getTime')
  //     if (loc === '' || loc === null || !loc) {
  //         loginInterval && clearInterval(loginInterval)
  //         await localStorage.setItem('getTime', 'true')
  //         await localStorage.setItem('getMinutes', JSON.stringify(d.getMinutes() + 5))
  //     }
  //     localStorage.getItem('getMinutes').then((locMinut) => {
  //       if (JSON.parse(svl) >= 5) 
  //       alert(`تعداد دفعات وارد شده بیشتر از حد مجاز بود ${locMinut - d.getMinutes()?locMinut - d.getMinutes():0} دقیقه دیگر دوباره امتحان کنید`)
  //     })
  //   }
  // }
  //Login





    //Login
    this.sendLoginAction = async () => {
      loginInterval && clearInterval(loginInterval)
      let d = new Date()
      let locMinut = await localStorage.getItem('getMinutes')
      let svl = await localStorage.getItem("several")
      if ((locMinut - d.getMinutes()) <= 1) {
        await localStorage.removeItem("several")
        await localStorage.removeItem('getMinutes')
      }
      if (JSON.parse(svl) < 5) {
        loginInterval = setTimeout(async () => {
          await localStorage.removeItem("several")
          await localStorage.removeItem('getMinutes')
        }, 120000);
      }
      if (JSON.parse(svl) < 5 || !locMinut ) {
        await localStorage.removeItem('getTime')
        await localStorage.setItem('getMinutes', JSON.stringify(d.getMinutes() + 5))
        localStorage.getItem("several").then((several) => {
          localStorage.setItem("several", JSON.stringify(JSON.parse(several) + 1)).then(() => { })
        })
        const { data } = await loginUser({ email: props.email, password: props.password, phone: props.phone, captcha: props.captcha, remember: props.remember ? "1h" : "100h" }, navigation);
        await localStorage.setItem("token", data.token);
        await localStorage.setItem("exp", data.exp);
        const user = jwt_decode(data.token)
        props.settokenValue(user)
        props.settimeChange(5)
        navigation.navigate("Home")
      }
      else {
        let loc = await localStorage.getItem('getTime')
        if (loc === '' || loc === null || !loc) {
            loginInterval && clearInterval(loginInterval)
            await localStorage.setItem('getTime', 'true')
            await localStorage.setItem('getMinutes', JSON.stringify(d.getMinutes() + 5))
        }
        localStorage.getItem('getMinutes').then((locMinut) => {
          if (JSON.parse(svl) >= 5) 
          alert(`تعداد دفعات وارد شده بیشتر از حد مجاز بود ${locMinut - d.getMinutes() > 0 ? locMinut - d.getMinutes() : 0} دقیقه دیگر دوباره امتحان کنید`)
        })
      }
    }
    //Login




  // register
  this.registerSendAction = async () => {
    await registerUser({ fullname: props.fullname, email: props.email, phone: props.phone, password: props.password });
    navigation.navigate("Login")
  }
  // register


  // Home
  this._token = async () => {
    if (ind.index === 0 && route.name === 'Home') {
      const exp = await localStorage.getItem("exp");
      if (exp && Number(exp) > Date.now() / 1000) return props.settoken(true)
      if (!exp) return props.settoken(false)
      if (exp && Number(exp) < Date.now() / 1000) {
        await localStorage.removeItem("token");
        await localStorage.removeItem("exp");
        return props.settoken(false)
      }
    }
  }
  // Home


  this._tokenValue = () => {
    useEffect(() => {
      localStorage.getItem("token").then((token) => {
        const user = jwt_decode(token)
        props.settokenValue(user)
      })
    }, [])
  }


  // forgetpassword
  this.forgetAction = async () => {
    await forgetpassword({ email: props.email })
  }
  // forgetpassword


  //sms
  this.smsAction = async () => {
    await sendcode({ phone: props.myPhone })
    props.setreplaceInput(true)
  }


  this.codeAction = async () => {
    const { data } = await verifycode({ code: props.myCode })
    navigation.navigate('ResetPass', { id: data })
  }
  //sms


  // location
  this.geoCodeAction = async () => {
    let { data } = await geocode({ loc: `سبزوار ${props.search1}` })
    let orgin = {
      latitude: data[0].latitude,
      longitude: data[0].longitude,
      latitudeDelta: 0.008,
      longitudeDelta: 0.008 
    }
    // if(data[0] && data[0].latitude && data[0].zipcode === "96139-44591" || data[0].city === "دهستان قصبه شرقی" || data[0].city === "سبزوار" || data[0].city === "شهر سبزوار"){
    //  if(data[0].longitude > 57.65055116587766 && data[0].streetName !== "سبزوار - اسفراین" ) 
    // }
    if (data[0] && data[0].longitude &&
      data[0].longitude > 57.645 &&
      data[0].longitude < 57.711 &&
      data[0].latitude > 36.191 &&
      data[0].latitude < 36.239) props.setmarkers(orgin);
    props.setallItemLocation(data[0])
  }


  this.geoCodeAction2 = async (e) => {
    let orgin = {
      ...e.nativeEvent.coordinate,
    }
    props.setmarkers(orgin)
  }


  this.reversAction = async () => {
    useEffect(() => {
      (async () => {
        let { data } = await reverse(props.markers)
        let formattedAddress = data[0].formattedAddress
        let streetName = data[0].streetName
        props.setrevers({ formattedAddress, streetName })
        props.setallItemLocation(data[0])
      })()
    }, [props.markers])
  }
  // location

}

export const origin = {
  latitude: 36.224174234928924,
  longitude: 57.69491965736432,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01
}