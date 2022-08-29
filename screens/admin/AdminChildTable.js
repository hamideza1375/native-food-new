import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Thead, Tbody, Tbtn } from '../../Components/Thead'
import Button from '../../Components/Button';
import styles from "./Admin.scss"
import Loading from '../../Components/Loading'
import Modal from './Modal';
import { sum } from '../../state/foodState';
import Pagination from '../../Components/Pagination';


const AdminChildTable = (props) => {
  const [id, setid] = useState()
  const [id2, setid2] = useState()

  let { current, setcurrent, pageLimit, page, setpage, currentPage, setcurrentPage,
    foodMap, bgColor, setShowModal, showModal, setass, ass, navigation, route } = props

  let _food = new sum(props)

  _food.getChildFood()



  return (
    <View style={styles.container}>
      <View >
        <Button paddingHorizontal={8} marginVertical={8}
          onPress={() => navigation.navigate("CreateChildFood", { id: route.params.id, })}>ساخت </Button>
        <View style={styles.viewHead}>
          <Thead TheadStyle={styles.thead}>عنوان</Thead>
          <Thead TheadStyle={styles.thead}>قیمت</Thead>
          <Thead TheadStyle={styles.thead}>ویرایش</Thead>
          <Thead TheadStyle={styles.thead}>حذف</Thead>
          <Thead TheadStyle={styles.thead}>ناموجود</Thead>
        </View>

        <View style={{ flex: 1 }}>
          {current &&
            <FlatList
              keyExtractor={(f) => f && f._id}
              data={current}
              renderItem={({ item, index }) => (
                <View style={styles.viewBody} >
                  <Tbody TbodyStyle={bgColor(index)}>{item.title}</Tbody>
                  <Tbody TbodyStyle={bgColor(index)}>{item.price}</Tbody>

                  <Tbtn TbodyStyle={bgColor(index)} onPress={() => navigation.navigate("EditChildFood", { id: route.params.id, id2: item._id, title: item.title })} bgcolor="yellow">
                    edit
                  </Tbtn>

                  <Tbtn TbodyStyle={bgColor(index)} bgcolor='red'
                    onPress={() => { setShowModal(true); setid(route.params.id); setid2(item._id) }} >
                    delete
                  </Tbtn>

                  <Tbtn TbodyStyle={[bgColor(index), { opacity: item.available ? 1 : .3 }]} bgcolor='silver'
                    onPress={() => item.available ? navigation.navigate("UnAvailable", { id: route.params.id, _id: item._id, title: item.title }) : ''}>
                    unAvailable
                  </Tbtn>
                </View>
              )}
            />}
        </View>

        <View style={{ height: '7%', minHeight: 50, position: 'absolute', bottom: 85, alignItems: 'center', alignSelf: 'center' }} >
          {foodMap.get(route.params.id) &&
            <Pagination
              food={foodMap.get(route.params.id)}
              setcurrent={setcurrent}
              pageLimit={pageLimit}
              ass={ass}
              page={page}
              setpage={setpage}
              currentPage={currentPage}
              setcurrentPage={setcurrentPage}
            />
          }
        </View>

        <Modal showModal={showModal} setShowModal={setShowModal} id={id} id2={id2} setass={setass} ass={ass} />

      </View>
    </View>
  )
}

export default AdminChildTable

