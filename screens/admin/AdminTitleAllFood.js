import React, { useState } from 'react';
import { View,Text, ScrollView } from 'react-native';
import { Thead, Tbody, Tbtn } from '../../Components/Thead'
import Button from '../../Components/Button';
import { sum } from '../../state/foodState';
import styles from "./Admin.scss"
import Loading from '../../Components/Loading'
import Modal from './Modal';



const AdminTitleAllFood = function (props) {
  const [id, setid] = useState()

  let { foods, bgColor, showModal, setShowModal, show,  setass, ass ,navigation } = props
  let _food = new sum(props)

  _food.getTitleFood([showModal,show])


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.viewHead}>
          <Thead TheadStyle={styles.thead}>عنوان</Thead>
          <Thead TheadStyle={styles.thead}>نمایش</Thead>
          <Thead TheadStyle={styles.thead}>ویرایش</Thead>
          <Thead TheadStyle={styles.thead}>حذف</Thead>
        </View>
        {
          !foods.length ?
            <Loading style={{ top: 40 }} animating={foods.length?false:true} />
            :
            foods.map((food, key) => (
              <View key={food._id} style={styles.viewBody} >
                <Tbody TbodyStyle={bgColor(key)}>
                  {food.title}
                </Tbody>
                <Tbtn TbodyStyle={bgColor(key)}
                  onPress={() => navigation.navigate("AdminChildTable", { id: food._id, title : food.title })}>
                  نمایش
                </Tbtn>
                <Tbtn TbodyStyle={bgColor(key)}
                  bgcolor='yellow' onPress={() => {
                    navigation.navigate("EditTitleAllFood", { id: food._id, show: showModal });
                  }}>
                  edit
                </Tbtn>

                <Tbtn TbodyStyle={bgColor(key)} bgcolor='red'
                  onPress={() => { setShowModal(true); setid(food._id) }} >
                  delete
                </Tbtn>

              </View>
            ))}

        <Button marginVertical={8} onPress={() => navigation.navigate("CreateTitleAllFood")}>ساخت دسته ی اغذیه</Button>
        
        <Button marginVertical={8} onPress={() => navigation.navigate('Admin')}>افزودن به گروه ادمین ها</Button>
     
        <Button marginVertical={8} onPress={() => navigation.navigate('Notifee')}>ارسال نوتیفیکیشن</Button>
     
        <Button marginVertical={8} onPress={() => navigation.navigate('ListAvailable')}>لیست غذا های ناموجود</Button>

        <Button marginVertical={8} onPress={() => navigation.navigate("Address")} >address</Button>

        <Button marginVertical={8} onPress={() => navigation.navigate("DeleteAdmin")} >DeleteAdmin</Button>

        <Modal showModal={showModal} setShowModal={setShowModal} id={id} setass={setass} ass={ass} />

      </View>
    </ScrollView>
  )
}






export default AdminTitleAllFood