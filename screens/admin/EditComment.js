import React from 'react'
import { View } from 'react-native';
import Form from '../../Components/Form';
import { adminState } from '../../state/adminState';


const EditComment = (props) => {
  let {title, setTitle, price, setPrice, imageUrl, setImageUrl, info, setInfo} = props
  let admin = new adminState(props)
  const sendFood = () => admin.createChild()
  return (
    <View>
      <Form
        t pr i im
        title={title} setTitle={setTitle}
        price={price} setPrice={setPrice}
        imageUrl={imageUrl} setImageUrl={setImageUrl}
        info={info} setInfo={setInfo}
        onPress={() => sendFood()}
      />
    </View>
  )
}
export default EditComment