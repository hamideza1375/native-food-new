import { localhost } from './host.json'
// import axios from './axios axios'
import axios from './axios fetch'


export const registerUser = (data) => axios.post(`${localhost}/register`, data)

export const loginUser = (data) => axios.post(`${localhost}/login`, data)

export const forgetpassword = (data) => axios.post(`${localhost}/forgetpassword`, data)

export const resetpassword = (id, data) => axios.post(`${localhost}/resetpassword/${id}`, data)

export const sendcode = (data) => axios.post(`${localhost}/sendcode`, data)

export const verifycode = (data) => axios.post(`${localhost}/verifycode`, data)

export const useradmin = (data) => axios.post(`${localhost}/useradmin/`, data)

export const deleteAdmin = (data) => axios.post(`${localhost}/deleteadmin/`, data)
// export const useradmin = (id, data) => axios.post(`${localhost}/useradmin/${id}`, data)
export const addpasswordadmin = (data) => axios.post(`${localhost}/addpasswordadmin`, data)

export const sendNewMessage = (data, id) => axios.post(`${localhost}/sendNewMessage${id}`, data)

export const getNewMessage = (id) => axios.get(`${localhost}/getNewMessage${id}`)
