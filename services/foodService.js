import { localhost } from './host.json'
// import axios from './axios axios'
import axios from './axios fetch'


// ! comment
export const createcommentchildfood = (id, queryId, data) => axios.post(`${localhost}/createcommentchildfood/${id}?id=${queryId}`, data)

export const getcommentchildfood = async (id, queryId) => axios.get(`${localhost}/getcommentchildfood/${id}?id=${queryId}`)

export const getcommentsinglefood = async (id, queryId,singleId) => axios.get(`${localhost}/getcommentsinglefood/${id}?id=${queryId}&&single_id=${singleId}`)

export const editcomment = async (courseId, queryId, commentid, data) => axios.put(`${localhost}/editcomment/${courseId}?id=${queryId}&&commentid=${commentid}`, data)

export const deletecomment = (courseId, queryId, commentid, data) => axios.delete(`${localhost}/deletecomment/${courseId}?id=${queryId}&&commentid=${commentid}`, data)
// ! comment

// ! Food
export const createfood = async (data) => axios.post(`${localhost}/createfood`, data)

export const getfoods = async () =>  axios.get(`${localhost}/getfoods`)

export const getSingleTitleFoods = async (id) => await axios.get(`${localhost}/getsingletitlefoods/${id}`)

export const getfood = async (id) => axios.get(`${localhost}/getfood${id}`)

export const editfood = (id, data) => axios.put(`${localhost}/editfood/${id}`, data)

export const deletefood = (id) => axios.delete(`${localhost}/deletefood/${id}`)
// ! Food

// ! Piza
export const createchildfood = async (id, data) => axios.post(`${localhost}/createchildfood/${id}`, data)

export const getallchildfood = async (id) => axios.get(`${localhost}/getallchildfood/${id}`)

export const getsinglechildfood = async (id, queryId) => axios.get(`${localhost}/getsinglechildfood/${id}?id=${queryId}`)

export const editchildfood = (id, queryId, data) => axios.put(`${localhost}/editchildfood/${id}?id=${queryId}`, data)

export const deletechildfood = (id, queryId) => axios.delete(`${localhost}/deletechildfood/${id}?id=${queryId}`)
// ! Piza

// ! Payment  
export const payment = (allprice, data) => axios.post(`${localhost}/confirmpayment?allprice=${allprice}`, data)
export const verifypayment = () => axios.get(`${localhost}/verifypayment`)
// ! Payment

// ! GeoCode
export const reverse = async (data) => axios.post(`${localhost}/reverse`, data)

export const geocode = async (data) => axios.post(`${localhost}/geocode`, data)
// ! GeoCode

// ! Notification

export const createNotification = async (data) => axios.post(`${localhost}/createnotification`, data)
export const notification = async () => axios.get(`${localhost}/notification`)
// ! Notification

export const imagechat = async (data) => axios.post(`${localhost}/imagechat`, data)

export const unAvailable = async (data,id,_id) => axios.post(`${localhost}/unavailable/${id}?_id=${_id}`,data)

export const listAvailable = async () => axios.get(`${localhost}/listavailable`)

export const sendProfile = async (data) => axios.post(`${localhost}/sendprofile`,data)

export const getProfile = async (data) => axios.get(`${localhost}/getprofile`, data)

//!alladdress
export const getAllAddress = async () => axios.get(`${localhost}/getAllAddress`)

export const deleteAddress = async (id) => axios.delete(`${localhost}/deleteaddress/${id}`)

