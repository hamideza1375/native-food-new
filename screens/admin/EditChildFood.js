import React from 'react'
import { View } from 'react-native';
import Form from '../../Components/Form';
import { adminState } from '../../state/adminState';
import { setTitle as Title } from '../../state/utils/setTitle';


const EditChildFood = (props) => {
  let { title, setTitle, price, setPrice, imageUrl, setImageUrl, info, setInfo} = props
  Title()
  let admin = new adminState(props)
  admin.getEdit()
  const editeFood = () => admin.editeFoodAction()
  return (
    <View>
      <Form t pr i im edit
        title={title} setTitle={setTitle}
        price={price} setPrice={setPrice}
        imageUrl={imageUrl} setImageUrl={setImageUrl}
        info={info} setInfo={setInfo}
        onPress={() => editeFood()} />
    </View>
  )
}
export default EditChildFood
