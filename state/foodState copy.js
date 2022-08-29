import { useCallback, useEffect } from 'react'
import { BackHandler, ToastAndroid, ActionSheetIOS, Platform } from 'react-native'
import { editcomment, deletecomment, getallchildfood, getfoods, getcommentchildfood, createcommentchildfood, getsinglechildfood, getcommentsinglefood, payment } from '../services/foodService'
import { useFocusEffect, useNavigationState, useRoute } from '@react-navigation/native'



export function sum(props) {

  const route = useRoute()
  let id = route.params && route.params.id
  let id2 = route.params && route.params.id2


  this.getTitleFood = show => {
    useFocusEffect(useCallback(() => {
      (async () => {
        try {
          let { data } = await getfoods()
          props.setfoods(data)
        } catch (err) { console.log(err) }
      })()
    }, [show]))
  }



  this.getChildFood = async () => {
    useEffect(() => {
    (async () => {
        try {
          var d = []
          let { data } = await getallchildfood()
          let w = data.child.filter((ch) => ch.refId == route.params.id)
         
          for (let k in w) {
            let l = props.map.get(w[k]._id)
            if (l !== undefined) {
              let f = JSON.parse(l)
              w[k].num = f.num
              w[k].total = f.total
              d.push(w[k])
            } else {
              d.push(w[k])
            }
          }
          props.foodMap.set(route.params.id, d)
          props.setfood2(d)
        }
        catch (err) { console.log(err); }
      })()

      return () => {
        props.setcurrent([])
        props.settextSearch('')
      }

    }, [])

  }




  this.sercher = (textSearch) => {
    props.foodMap.set(route.params.id, props.food2.filter((f) => f.title.includes(textSearch)))
    let fd = props.food2.filter(f => f.title.includes(textSearch))
    const currentPage = Math.max(0, Math.min(1, fd.length))
    const offset = (currentPage - 1) * props.pageLimit
    const currentCountries = fd.slice(offset, offset + props.pageLimit)
    props.setcurrent(currentCountries)
    props.setcurrentPage(currentPage)
    props.settextSearch('')
  }


  this.foodAsc = (setpage) => {
    let foodMap = props.foodMap.get(route.params.id)
    props.foodMap.set(route.params.id, foodMap.sort((a, b) => a.price - b.price))
    props.setass(!props.ass)
    setpage(1)
  }



  this.foodDesc = (setpage) => {
    let foodMap = props.foodMap.get(route.params.id)
    props.foodMap.set(route.params.id, foodMap.sort((a, b) => b['price'] - a['price']))
    props.setass(!props.ass)
    setpage(1)
  }



  this.allPrice = async () => {
    useFocusEffect(useCallback(() => {
      (async () => {
        let all = []
        let { data } = await getfoods()

          data.forEach((fd) => {
            for (let i in props.foodMap.get(fd._id)) {
              if (props.foodMap.get(fd._id)[i]){ 
                all.push(props.foodMap.get(fd._id)[i].total) 
              }
            }
          })

        
        if (all.length) {
          const su = all.reduce((total, number) => total + number)
          props.setallprice(su)
          props.map.set('allprice', JSON.stringify(su))
        }
        else
          props.setallprice('0')
      })()
    }, [props.show1]))
  }



  this.plustNum = async (inde, item) => {
    if (route.name == 'ChildFood') {
      let h = [...props.foodMap.get(route.params.id)]
      let index = props.foodMap.get(route.params.id).findIndex(f => f._id == item._id)
      h[index].num = h[index].num + 1
      h[index].total = item.price * h[index].num
      props.map.set(item.title, item.title)
      props.map.set(item._id, JSON.stringify(h[index]))
      let tit = props.map.get(item.title, item.title)
      let gg = props.totalTitle.find((t) => t == item.title)
      if (!gg) props.settotalTitle((t) => { return t.concat(tit) })
      props.foodMap.set(route.params.id, h)
      props.setshow1(!props.show1)
    }
    if (route.name == 'FinallFoodPayment') {
      let fdd = []
      let h = []
      let { data } = await getfoods()
      data.forEach((fd) => {
        fdd.push(props.foodMap.get(fd._id))
      })
      for (let i of fdd) {
        if (i) for (let f of i) { h.push(f) }
      }      

      let index = h.findIndex(f => f._id == item._id)
      h[index].num = h[index].num + 1
      h[index].total = item.price * h[index].num
      props.map.set(item._id, JSON.stringify(h[index]))
      props.setshow1(!props.show1)
      props.foodMap.set(route.params.id, h)
    }
  }



  this.minusNum = async (inde, item) => {
    if (route.name == 'ChildFood') {
      let h = [...props.foodMap.get(route.params.id)]
      let index = props.foodMap.get(route.params.id).findIndex(f => f._id == item._id)
      if (h[index].num > 0)
        h[index].num = h[index].num - 1
      h[index].total = item.price * h[index].num
      props.map.set(item._id, JSON.stringify(h[index]))
      if (h[index].num == 0) {
        let gg = props.totalTitle.filter((t) => t != item.title)
        props.settotalTitle(gg)
        props.map.delete(item.title)
      }
      props.foodMap.set(route.params.id, h)
      props.setshow1(!props.show1)
    }
    if (route.name == 'FinallFoodPayment') {
      let fdd = []
      let h = []
      let { data } = await getfoods()
      data.forEach((fd) => {fdd.push(props.foodMap.get(fd._id))})
      for (let i of fdd) {if (i) for (let f of i) { h.push(f) }} 
      let index = h.findIndex(f => f._id == item._id)
      h[index].num = h[index].num - 1
      h[index].total = item.price * h[index].num
      props.map.set(item._id, JSON.stringify(h[index]))
      props.setshow1(!props.show1)
      props.foodMap.set(route.params.id, h)
      if (h[index].num == 0) {
        let gg = props.totalTitle.filter((t) => t != item.title)
        props.settotalTitle(gg)
        props.map.delete(item.title)
      }
    }
  }



  this.deleteStorage = async () => {
    try {
      for (let i of props.foods) {
        const { data } = await getallchildfood(i._id)
        for (let item of data.child) {
          props.map.delete(item._id)
          props.map.delete(item.title)
        }
        props.map.delete('sum')
        props.map.delete('allprice')
        props.setallfood([])
        props.settotalTitle([])
        props.setshow1(false)
      }
    }
    catch (err) { console.log(err); }
  }



  this.AllPrice = (inputPrice, key) => {
    try {
      for (let p = 0; p <= key; p++) {
        let rt = String(inputPrice)
        let k = ''
        for (let i = 0; i < rt.length; i++) {
          k +=
            rt.length == 4
              ? i == 0
                ? rt[i] + ','
                : rt[i]
              : rt.length == 5
                ? i == 1
                  ? rt[i] + ','
                  : rt[i]
                : rt.length == 7
                  ? i == 0 || i == 3
                    ? rt[i] + ','
                    : rt[i]
                  : rt.length == 8
                    ? i == 1 || i == 4
                      ? rt[i] + ','
                      : rt[i]
                    : i == 2
                      ? rt[i] + ','
                      : rt[i]
        }
        return k
      }
    }
    catch (err) { console.log(err) }
  }



  this.getAllChildFood = async () => {
    useEffect(() => {
      getfoods().then(({data})=>{
       let all = []
       data.forEach((fd) => {
         for (let i in props.foodMap.get(fd._id)) {
            if(props.foodMap.get(fd._id)[i]) all.push(props.foodMap.get(fd._id)[i])
         }
        })
        props.setallfood(all)
      })
    }, [])
  }



  this.getsinglefood = async () => {
    useFocusEffect(useCallback(() => {
      (async () => {
        try {
          const { data } = await getsinglechildfood(id, id2)
          props.setsinglefood(data.child)
          props.setpermission(data.permission)
        }
        catch (err) { console.log(err); }
      })()

      return()=>(
        props.setsinglefood({}),
         props.setpermission(false),
         props.setallcomment([])
      )

    }, []))
  }



  this.getCommentSingle = async () => {
    useEffect(() => {
      (async () => {
        try {
          const { data } = await getcommentchildfood(id, id2)
          props.setallcomment(data.comment)
        }
        catch (err) { console.log(err); }
      })()
    }, [props.showForm, props.showForm2])

    useEffect(() => {
      return () => {
        props.setShowForm(false)
        props.setshowForm2(false)
      }
    }, [])
  }



  this.sendComment = async () => {
    try {
      await createcommentchildfood(id, id2, {
        fullname: props.fullname,
        email: props.email,
        message: props.message,
        allstar: Number(props.allstar),
        title: props.singlefood.title
      })
      props.setstar1(false),
        props.setstar2(false),
        props.setstar3(false),
        props.setstar4(false),
        props.setstar5(false),
        props.setFullname(''),
        props.setEmail(''),
        props.setMessage(''),
        props.setshowForm2(false)
    }
    catch (err) { log(err) }
  }



  this.editComment = async id3 => {
    try {
      await editcomment(id, id2, id3, {
        message: props.message,
        allstar: props.allstar
      })
      props.setstar1(false)
      props.setstar2(false)
      props.setstar3(false)
      props.setstar4(false)
      props.setstar5(false)
      props.setEmail('')
      props.setMessage('')
      props.setShowForm(false)
    }
    catch (err) { console.log(err); }
  }



  this.deleteComment = async id3 => {
    try { await deletecomment(id, route.params.id2, id3) }
    catch (err) { console.log(err); }
  }



  this.getEditComment = (id3) => {
    useEffect(() => {
      (async () => {
        try {
          const { data } = await getcommentsinglefood(id, id2, id3)
          props.setMessage(data.comment.message)
          props.setallstar(data.comment.allstar)
          if (data.comment.allstar == 1) props.setstar1(true)
          if (data.comment.allstar == 2) props.setstar1(true), props.setstar2(true)
          if (data.comment.allstar == 3) props.setstar1(true), props.setstar2(true), props.setstar3(true)
          if (data.comment.allstar == 4) props.setstar1(true), props.setstar2(true), props.setstar3(true), props.setstar4(true)
          if (data.comment.allstar == 5) props.setstar1(true), props.setstar2(true), props.setstar3(true), props.setstar4(true), props.setstar5(true)
        } catch (err) { console.log(err); }
      })()

    }, [])
  }



  this.pressIconEdit = (id) => {
    props.setShowForm(true)
    props.setid3(id)
    props.setstar1(false)
    props.setstar2(false)
    props.setstar3(false)
    props.setstar4(false)
    props.setstar5(false)
  }



  this.backHandler = async () => {
    try {
      if(Platform.OS === 'androig'){
      const ind = useNavigationState((state) => state)
      useFocusEffect(useCallback(() => {
        if (ind.index === 0 && ind.key === "stack-jU9-JruUg9fVPyw4YH7pb" && route.key === "Home-qwD7yUSMUZMgW84wKeYNs" && route.name === 'Home') {
          let current = 0
          BackHandler.addEventListener("hardwareBackPress", () => {
            current += 1
            if (current === 2) { BackHandler.exitApp(); return true }
            ToastAndroid.show("برای خروج دوبار لمس کنید", ToastAndroid.SHORT)
            setTimeout(() => {
              current = 0
            }, 1000);
            return true
          })
        }
        else return null
      }, []))}
    }
    catch (err) { console.log(err) }
  }

}



export const toast = (toast) => {
  try {
    if (Platform.OS === 'ios')
      ActionSheetIOS.showActionSheetWithOptions({ options: [toast], cancelButtonIndex: 0, userInterfaceStyle: 'dark' }, sum = () => { return null })
    else
      ToastAndroid.showWithGravityAndOffset(toast, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
  }
  catch (err) { console.log(err); }
}