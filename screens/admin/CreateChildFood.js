import React from 'react'
import { View } from 'react-native';
import Form from '../../Components/Form';
import { adminState } from '../../state/adminState';

const CreateChildFood = (props) => {
  let admin = new adminState(props)
  const sendFood = () => admin.createChild()
  return (
    <View>
      <Form
        t pr i im
        title={props.title} setTitle={props.setTitle}
        price={props.price} setPrice={props.setPrice}
        imageUrl={props.imageUrl} setImageUrl={props.setImageUrl}
        info={props.info} setInfo={props.setInfo}
        onPress={() => sendFood()}
      />
    </View>
  )
}
export default CreateChildFood