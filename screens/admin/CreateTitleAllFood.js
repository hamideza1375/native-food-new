import React from 'react'
import { View } from 'react-native';
import Form from '../../Components/Form';
import { adminState } from '../../state/adminState';

const CreateTitleAllFood = (props) => {
  let { title, setTitle, imageUrl, setImageUrl } = props
  let admin = new adminState(props)
  const sendFood = () => admin.createFoodAction()
  // useEffect(() => () => setShow(!show), [])

  return (
    <View>
      <Form title={title} setTitle={setTitle}
        imageUrl={imageUrl} setImageUrl={setImageUrl}
        onPress={() => { sendFood() }} t im />
    </View>
  )
}

export default CreateTitleAllFood