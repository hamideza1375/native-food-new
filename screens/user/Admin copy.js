import React from 'react';
import Form from '../../Components/Form'
import { createNotification } from '../../services/foodService';
import { localhost } from '../../services/host.json'


const Login = (props) => {
  let { title, setTitle, info, setInfo } = props



  const createNotifee = async() => {
    await createNotification({title: title, message: info})
  }


  return (
    <>
      <Form
        t i host={`${localhost}`}
        title={title} setTitle={setTitle}
        info={info} setInfo={setInfo}
        onPress={() => createNotifee()} />
    </>
  )
}


export default Login











// import React from 'react';
// import Form from '../../Components/Form'
// import { userState } from '../../state/userState';
// import { localhost } from '../../services/host.json'



// const Login = (props) => {
//   let { phone, setPhone } = props


//   _user = new userState(props)

//   const sendAdmin = () => {
//     _user.addAdmin()
//   }


//   return (
//     <>
//       <Form
//         ph host={`${localhost}`}
//         phone={phone} setPhone={setPhone}
//         onPress={() => sendAdmin()} />
//     </>
//   )
// }



// // const Login = (props) => {
// //   let { password, setPassword } = props


// //   _user = new userState(props)

// //   const sendAdmin = () => {
// //     _user.userAdmin()
// //   }

// //   const addAdmin = () => {
// //     _user.addPasswordAdmin()
// //   }



// //   return (
// //     <>
// //       <Form
// //         p host={`${localhost}`}
// //         password={password} setPassword={setPassword}
// //         onPress={() => addAdmin()} />
// //       <Form
// //         p host={`${localhost}`}
// //         password={password} setPassword={setPassword}
// //         onPress={() => sendAdmin()} />
// //     </>
// //   )
// // }


// export default Login
