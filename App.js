import React, { useEffect } from "react";
import { Animated, Text, Pressable, NativeModules } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChildFood from "./screens/food/ChildFood";
import SingleFood from "./screens/food/SingleFood";
import ForgetPass from "./screens/user/ForgetPass";
import ResetPass from "./screens/user/ResetPass";
import Payment from "./screens/user/Payment";
import Logout from "./screens/user/Logout";
import Login from "./screens/user/Login";
import Register from "./screens/user/Register";
import Home from "./screens/food/Home"
import Location from "./screens/user/Location"
import Profile from "./screens/user/Profile"
import Admin from "./screens/admin/Admin";
import DeleteAdmin from "./screens/admin/DeleteAdmin";
import Notifee from './screens/admin/Notifee';
import UnAvailable from './screens/admin/UnAvailable';
import FinallFoodPayment from "./screens/food/FinallFoodPayment"
import AdminChildTable from "./screens/admin/AdminChildTable"
import AdminTitleAllFood from "./screens/admin/AdminTitleAllFood";
import EditChildFood from './screens/admin/EditChildFood';
import EditTitleAllFood from './screens/admin/EditTitleAllFood';
import CreateTitleAllFood from './screens/admin/CreateTitleAllFood';
import CreateChildFood from './screens/admin/CreateChildFood';
import { context, state } from "./state/utils/contexts";
import { notification } from "./services/foodService";
import Chat from "./socket/Chat";
import localStorage from '@react-native-async-storage/async-storage';
import { useNotification } from './useNotification';
import Layout from './Layout';
import ListAvailable from "./screens/admin/ListAvailable";
import Address from "./screens/food/Address";


const Tab = createNativeStackNavigator()

export const headerRight = () => {
  const navigation = useNavigation()
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <Text
        style={{ fontSize: 32, marginTop: -8 }} >
        {`«`}
      </Text>
    </Pressable>
  )
}

export const headerRight2 = () => {
  const navigation = useNavigation()
  return (
    <Pressable onPress={() => navigation.navigate('Profile')}>
      <Text
        style={{ fontSize: 32, marginTop: -8 }} >
        {`«`}
      </Text>
    </Pressable>
  )
}


  const App = () => {
    
    const { StatusBarManager } = NativeModules;


  const { allState } = state()
  const { displayNotification, cancelAllNotifications, cancelNotification } = useNotification();

  useEffect(()=>{
    setInterval(() => {
      (async () => {
        let newNotification = await localStorage.getItem('notification')
        const { data } = await notification()
        if(data)
       if (newNotification !== data.message) {
         displayNotification(data.title, data.message)
         await localStorage.setItem('notification', data.message)
       }
     })();
    }, 15000);
  },[allState.width ])


  return (
    <context.Provider value={allState}>
        <Animated.View style={[ Platform.OS === 'ios' ? allState.width < allState.height ? { paddingTop: StatusBarManager.HEIGHT, flex: 1 } : { paddingHorizontal: StatusBarManager.HEIGHT / 1.5, paddingTop: 10, flex: 1 } : { flex: 1 }]} >
        <Tab.Navigator screenOptions={{ headerShown: false }}>

          <Tab.Group screenOptions={{ headerShown: true, headerRight, headerBackVisible: false }}>
            <Tab.Screen name="Home" options={{ headerRight:()=><></> }} children={(props) => <Home {...props} {...allState} />} />
            <Tab.Screen name="ChildFood" children={(props) => <ChildFood {...props} {...allState} />} />
            <Tab.Screen name="SingleFood" children={(props) => <SingleFood {...props} {...allState} />} />
          </Tab.Group>

          <Tab.Group screenOptions={{ headerShown: false, headerRight, headerBackVisible: false }} >
            <Tab.Screen name="Register" children={(props) => <Register {...props} {...allState} _key='120' />} />
            <Tab.Screen name="Login" children={(props) => <Login {...props} {...allState} _key='120' />} />
            <Tab.Screen name="ForgetPass" options={{ headerShown: true }} children={(props) => <ForgetPass {...props} {...allState} _key='120' />} />
            <Tab.Screen name="ResetPass" options={{ headerShown: true }} children={(props) => <ResetPass {...props} {...allState} _key='120' />} />
          </Tab.Group>

          <Tab.Group screenOptions={{ headerShown: false, headerRight, headerBackVisible: false }} >
            <Tab.Screen name="Profile" children={(props) => <Profile {...props} {...allState} _key='100' />} options={{ headerShown: false }} />
            <Tab.Screen name="FinallFoodPayment" children={(props) => <FinallFoodPayment {...props} {...allState} _key='100' />} />
            <Tab.Screen name="Location" children={(props) => <Location {...props} {...allState} _key='100' />} />
            <Tab.Screen name="Logout" children={(props) => <Logout {...props} {...allState} />} />
            <Tab.Screen name="Payment" options={{ headerShown: true }} children={(props) => <Payment {...props} {...allState} />} />
          </Tab.Group>

          <Tab.Group screenOptions={{ headerShown: true, headerRight, headerBackVisible: false, headerStyle: { backgroundColor: '#25f2', } }} >
            <Tab.Screen name="Chat" children={(props) => <Chat {...props} {...allState} />} _key='100' />
          </Tab.Group>

          <Tab.Group screenOptions={{ headerShown: true, headerRight, headerBackVisible: false }} >
            <Tab.Screen name="AdminTitleAllFood" children={(props) => <AdminTitleAllFood {...props} {...allState} />} />
            <Tab.Screen name="AdminChildTable" children={(props) => <AdminChildTable {...props} {...allState} />} />
            <Tab.Screen name="EditChildFood" children={(props) => <EditChildFood {...props} {...allState} />} />
            <Tab.Screen name="EditTitleAllFood" children={(props) => <EditTitleAllFood {...props} {...allState} />} />
            <Tab.Screen name="CreateTitleAllFood" children={(props) => <CreateTitleAllFood {...props} {...allState} />} />
            <Tab.Screen name="CreateChildFood" children={(props) => <CreateChildFood {...props} {...allState} />} />
            <Tab.Screen name="Admin" options={{ headerShown: true }} children={(props) => <Admin {...props} {...allState} _key='120' />} />
            <Tab.Screen name="Notifee" options={{ headerShown: true }} children={(props) => <Notifee {...props} {...allState} _key='120' />} />      
            <Tab.Screen name="UnAvailable" options={{ headerShown: true }} children={(props) => <UnAvailable {...props} {...allState} _key='120' />} />      
            <Tab.Screen name="ListAvailable" options={{ headerShown: true }} children={(props) => <ListAvailable {...props} {...allState} _key='120' />} />      
          </Tab.Group>

          <Tab.Screen name="Address" options={{ headerShown: true }}  children={(props) => <Address {...props} {...allState} _key='120' />} />      
          <Tab.Screen name="DeleteAdmin" options={{ headerShown: true }}  children={(props) => <DeleteAdmin {...props} {...allState} _key='120' />} />      
          
        </Tab.Navigator>
      </Animated.View>

    </context.Provider>
  )
}






export default App;

