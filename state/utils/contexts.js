import { createContext, useContext, useState } from 'react';
import { origin } from '../userState';
import { Dimensions } from 'react-native';


let odd = []
function State() {


  for(let i = 0; i <= 100; i++){
    if(i % 2 == 0)
    odd.push(i)
  }


  let bgColor = (key) => ([{ backgroundColor: odd.includes(key) ? '#555' : '#777' }])

  const _width = Dimensions.get('window').width;
  const _height = Dimensions.get('window').height;


  const [allfood, setallfood] = useState([])
  const [food2, setfood2] = useState([])
  const [show1, setshow1] = useState(true)
  const [foods, setfoods] = useState([])
  const [token, settoken] = useState('')
  const [tokenValue, settokenValue] = useState({})
  const [allprice, setallprice] = useState('')
  const [myPhone, setMyPhone] = useState('')
  const [myCode, setMyCode] = useState('')
  const [captcha, setCaptcha] = useState(true)
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [comment, setcomment] = useState('')
  const [allcomment, setallcomment] = useState([])
  const [show, setShow] = useState(true)
  const [search1, setSearch1] = useState('')
  const [search, setsearch] = useState([])
  const [search3, setsearch3] = useState('')
  const [markers, setmarkers] = useState(origin)
  const [revers, setrevers] = useState({})
  const [allItemLocation, setallItemLocation] = useState({})
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [checkbox, setCheckbox] = useState()
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [info, setInfo] = useState('')
  const [singlefood, setsinglefood] = useState({})
  const [num, setnum] = useState([])
  const [textSearch, settextSearch] = useState('')
  const [navigate, setnavigate] = useState(false)
  const [ass, setass] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [current, setcurrent] = useState([])
  const [sercher, setsercher] = useState([])
  const [srch, setSrch] = useState([])
  const [page, setpage] = useState(1)
  const [currentPage, setcurrentPage] = useState(1)
  const [pageLimit, setpageLimit] = useState(4)

  const [piza, setpiza] = useState([])
  const [sandwich, setsandwich] = useState([])
  const [drink, setdrink] = useState([])
  const [star, setstar] = useState()
  const [orientation, setOrientation] = useState("PORTRAIT")
  const [height, setheight] = useState(_height)
  const [width, setwidth] = useState(_width)
  const [allstar, setallstar] = useState(false)

  const [navigateProfile, setnavigateProfile] = useState(false)
  const [navigateUser, setnavigateUser] = useState(false)

  const [profile, setProfile] = useState(false)
  const [user, setUser] = useState(false)
  const [ChangeView, setChangeView] = useState(false)
  const [star1, setstar1] = useState(false)
  const [star2, setstar2] = useState(false)
  const [star3, setstar3] = useState(false)
  const [star4, setstar4] = useState(false)
  const [star5, setstar5] = useState(false)
  const [id3, setid3] = useState()
  const [showForm2, setshowForm2] = useState()
  const [aa, setaa] = useState(false)
  const [room, setroom] = useState('')
  const [admin, setadmin] = useState(false)
  const [replaceInput, setreplaceInput] = useState(false)
  const [several,setseveral] = useState(0)
  const [severalTime,setseveralTime] = useState(5)
  const [severalShow, setseveralShow] = useState(true)
  const [totalTitle, settotalTitle] = useState([])
  const [userI, setUserI] = useState([])
  const [map] = useState(new Map)
  const [allRoom] = useState(new Map())  
  const [msgLength] = useState(new Map())  
  const [foodMap] = useState(new Map())
  const [localMessage, setlocalMessage] = useState([])
  const [messages, setmessages] = useState([]);
  const [room5, setroom5] = useState([])
  const [room6, setroom6] = useState([])
  const [routeName, setrouteName] = useState('')
  const [permission, setpermission] = useState(false)
  const [changeFood, setchangeFood] = useState(false)
  const [timeChange, settimeChange] = useState(5)
  const [all, setall] = useState([])
  const [allTotalFood, setallTotalFood] = useState([])
  const [imageProfile, setimageProfile] = useState()
  const [plaque, setplaque] = useState('')
  const [floor, setfloor] = useState('')
  const [allAddress, setallAddress] = useState([])
  
  
  this.allState = {
    allAddress, setallAddress,
    plaque, setplaque,
    floor, setfloor,
    imageProfile, setimageProfile,
    allTotalFood, setallTotalFood,
    all, setall,
    timeChange, settimeChange,
    changeFood, setchangeFood,
    permission, setpermission,
    routeName, setrouteName,
    room5, setroom5,
    room6, setroom6,
    map, allRoom, msgLength, foodMap,
    localMessage, setlocalMessage,
    messages, setmessages,
    userI, setUserI,
    totalTitle, settotalTitle,
    admin, setadmin,
    room, setroom,
    aa, setaa,
    odd,
    bgColor: (key) => bgColor(key),
    id3, setid3,
    showForm2, setshowForm2,
    star1, setstar1,
    star2, setstar2,
    star3, setstar3,
    star4, setstar4,
    star5, setstar5,
    navigateProfile, setnavigateProfile,
    ChangeView, setChangeView,
    navigateUser, setnavigateUser,
    profile, setProfile,
    user, setUser,
    height, setheight,
    allstar, setallstar,
    width, setwidth,
    orientation, setOrientation,
    star, setstar,
    piza, setpiza,
    sandwich, setsandwich,
    drink, setdrink,
    allfood, setallfood,
    pageLimit,
    currentPage, setcurrentPage,
    page, setpage,
    sercher, setsercher,
    srch, setSrch,
    showModal, setShowModal,
    current, setcurrent,
    ass, setass,
    search, setsearch,
    navigate, setnavigate,
    textSearch, settextSearch,
    search3, setsearch3,
    num, setnum,
    show1, setshow1,
    foods, setfoods,
    food2, setfood2,
    token, settoken,
    tokenValue, settokenValue,
    allprice, setallprice,
    myPhone, setMyPhone,
    myCode, setMyCode,
    captcha, setCaptcha,
    fullname, setFullname,
    email, setEmail,
    phone, setPhone,
    message, setMessage,
    showForm, setShowForm,
    comment, setcomment,
    allcomment, setallcomment,
    show, setShow,
    search1, setSearch1,
    markers, setmarkers,
    revers, setrevers,
    allItemLocation, setallItemLocation,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    remember, setRemember,
    checkbox, setCheckbox,
    title, setTitle,
    price, setPrice,
    imageUrl, setImageUrl,
    info, setInfo,
    singlefood, setsinglefood,
    replaceInput, setreplaceInput,
    several, setseveral,
    severalTime, setseveralTime,
    severalShow, setseveralShow,
  }

}

export const state = () => new State()
export const context = createContext(state.allState);
export const value = () => useContext(context)