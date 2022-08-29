import { useEffect } from "react";
import { useRoute, useNavigation } from '@react-navigation/native';
import { getSingleTitleFoods, editfood, createchildfood, createfood, deletechildfood, deletefood, getsinglechildfood, editchildfood, unAvailable, createNotification } from "../services/foodService";


export function adminState(props) {

  const route = useRoute()
  const navigation = useNavigation()
  let id = route.params && route.params.id
  let id2 = route.params && route.params.id2



  // createfood
  this.createChild = async () => {
    await createchildfood(id, { title: props.title, price: props.price, imageUrl: props.imageUrl, info: props.info })
    props.setchangeFood(!props.changeFood)
    navigation.goBack()
    useEffect(() => () => props.setShow(!props.show), [])
  }
  // createfood



  // createpartfood
  this.createFoodAction = async () => {
    await createfood({ title: props.title, imageUrl: props.imageUrl })
    props.setchangeFood(!props.changeFood)
    navigation.goBack()
  }
  // createpartfood


  // DeleteFood
  this.deleteChildFoodAction = async (id, id2) => {
    await deletechildfood(id, id2)
    props.setchangeFood(!props.changeFood)
  }
  // DeleteFood

  this.deleteFoodAction = async (id) => {
    await deletefood(id)
    props.setchangeFood(!props.changeFood)
  }
  // DeleteFoods


  // EditeFood
  this.getEdit = async () => {
    useEffect(() => {
      (async () => {
        const { data } = await getsinglechildfood(id, id2)
        props.setTitle(data.child.title)
        props.setPrice(data.child.price.toString())
        props.setImageUrl(data.child.imageUrl)
        props.setInfo(data.child.info)
      })()
    }, [])
    useEffect(() => () => {
      props.setTitle('')
      props.setPrice('')
      props.setImageUrl('')
      props.setInfo('')
    }, [])
  }

  this.editeFoodAction = async () => {
   await editchildfood(id, id2, { title: props.title, price: props.price, imageUrl: props.imageUrl, info: props.info })
   props.setchangeFood(!props.changeFood)
   navigation.goBack()
  }


  // EditFood
  this.getFoodsEdit = async () => {
    useEffect(() => {
      (async () => {
        const { data } = await getSingleTitleFoods(id)
        props.setTitle(data.title)
      })()

      return () => {
        props.setTitle('')
      }
    }, [])
  }


  this.editeFoods = async () => {
    await editfood({ title: props.title, imageUrl: props.imageUrl })
    navigation.goBack()
  }
  //EditeFoods



    this.available = async (available) => {
    await unAvailable({ available }, props.route.params.id, props.route.params._id)
    props.setchangeFood(!props.changeFood)
    props.navigation.goBack()
  }


  this.notifee = async () => {
    await createNotification({title: props.title, message: props.info})
    navigation.goBack()
  }

}