import React from 'react';
import { Text } from 'react-native'
import BottomTab from '../../Components/BottomTab'
import TopTab from '../../Components/TopTab'
import Form from '../../Components/Form'
import { userState } from '../../state/userState';
import { topUser, bottomProfile } from '../../state/utils/top-bottom';
import { localhost } from '../../services/host.json'

const Register = (props) => {

  const bottom = bottomProfile(props)
  let {token, fullname, setFullname, phone, setPhone, password, setPassword, checkbox, setCheckbox, navigation, route  } = props
  if (token) navigation.navigate('Home')
  _user = new userState(props)

  const registerSend = () =>
    _user.registerSendAction();
  return (
    <BottomTab route={route.name} route2={bottom} >
      <TopTab route={route.name} route2={topUser} >
        <Form
          f p ch ph
          // t pr i m im
          //  c s gc
          fSwiper
          // eSwiper
          // pSwiper
          // cpSwiper
          // tSwiper
          // prSwiper
          // imSwiper
          // iSwiper

          fIconLeft={<Text style={{ color: 'white', backgroundColor: 'blue', padding: 7 }}>del</Text>}
          fIconRight={<Text style={{ color: 'white', backgroundColor: 'red', padding: 7 }}>del</Text>} 
          
          // eIconLeft={<Text style={{ color: 'white', backgroundColor: 'blue', padding: 7 }}>del</Text>}
          // eIconRight={<Text style={{ color: 'white', backgroundColor: 'red', padding: 7 }}>del</Text>} 
        
          // pIconLeft={<Text style={{ color: 'white', backgroundColor: 'blue', padding: 7 }}>del</Text>}
          // pIconRight={<Text style={{ color: 'white', backgroundColor: 'red', padding: 7 }}>del</Text>} 
        
          // cpIconLeft={<Text style={{ color: 'white', backgroundColor: 'blue', padding: 7 }}>del</Text>}
          // cpIconRight={<Text style={{ color: 'white', backgroundColor: 'red', padding: 7 }}>del</Text>} 
        
          // tIconLeft={<Text style={{ color: 'white', backgroundColor: 'blue', padding: 7 }}>del</Text>}
          // tIconRight={<Text style={{ color: 'white', backgroundColor: 'red', padding: 7 }}>del</Text>} 
        
          // prIconLeft={<Text style={{ color: 'white', backgroundColor: 'blue', padding: 7 }}>del</Text>}
          // prIconRight={<Text style={{ color: 'white', backgroundColor: 'red', padding: 7 }}>del</Text>} 

          // iIconLeft={<Text style={{ color: 'white', backgroundColor: 'blue', padding: 7 }}>del</Text>}
          // iIconRight={<Text style={{ color: 'white', backgroundColor: 'red', padding: 7 }}>del</Text>} 

          // imIconLeft={<Text style={{ color: 'white', backgroundColor: 'blue', padding: 7 }}>del</Text>}
          // imIconRight={<Text style={{ color: 'white', backgroundColor: 'red', padding: 7 }}>del</Text>} 
          
          fullname={fullname} setFullname={setFullname}
          // email={email} setEmail={setEmail}
          phone={phone} setPhone={setPhone}
          password={password} setPassword={setPassword}
          checkbox={checkbox} setCheckbox={setCheckbox}
          host={`${localhost}`}
          onPress={() => registerSend()}
          // captcha={captcha} setCaptcha={setCaptcha} 
          // confirmPassword={"password"} setConfirmPassword={()=>{}}
          // sizeY={.75}
          // top={30}
          // style={{minHeight:'99.95%'}}
        >
        </Form>
      </TopTab>
    </BottomTab>
  );
};
export default Register
