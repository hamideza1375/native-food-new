import React, { useEffect } from "react";
import { View } from 'react-native';
import localStorage from "@react-native-async-storage/async-storage"

const Logout = (props) => {

  const { setnavigateProfile, setnavigateUser, settoken, settokenValue, navigation } = props

  useEffect(() => {
    (async () => {
      setnavigateProfile(false)
      setnavigateUser(false)
      settokenValue({})
      settoken(false)
      await localStorage.removeItem("token");
      await localStorage.removeItem("exp");
      navigation.navigate("Home");
    })()

    return () => (
      setnavigateProfile(false),
      setnavigateUser(false)
    )
  }, []);
  return <View />;
};
export default Logout;
