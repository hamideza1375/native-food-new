import React from 'react'
import { View } from 'react-native';
import Form from '../../Components/Form';
import { adminState } from '../../state/adminState';
import { setTitle as Title } from '../../state/utils/setTitle';


const EditFood = (props) => {
  let { title, setTitle, imageUrl, setImageUrl } = props
  Title()
  let admin = new adminState(props)
  admin.getFoodsEdit()


  const editeFood = () => admin.editeFoods()
  return (
    <View>
      <Form
        t im edit
        title={title} setTitle={setTitle}
        imageUrl={imageUrl} setImageUrl={setImageUrl}
        onPress={() => { editeFood(); }}
      />
    </View>
  )
}
export default EditFood
