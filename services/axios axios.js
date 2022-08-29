import localStorage from "@react-native-async-storage/async-storage"
import toast from "../Components/Toast"
import axios from 'axios'

axios.defaults.headers.post["Content-Type"] = "application/json";


const sum = (async () => {
   const token = await localStorage.getItem("token");
   if (token) axios.defaults.headers.common["Authorization"] = token;
})()


axios.interceptors.response.use(null, error => {
   if (error.response && error.response.status > 400 && error.response.status <= 500){
       console.log(error);
       toast("مشکلی از سمت سرور رخ داده است.");
   }
   if(error.response.status == 400){
       toast('خطا دوباره امتحان کنید')
   }

   return Promise.reject(error);
});


function axios2() {
   (async () => {

      this.get = async (url) => {
            let response = await axios.get(url)
            return { data: response.data , status: response.status }
      }


      this.post = async (url, data) => {
         console.log(data)
         if(!data['_parts']){
            const dt = new FormData()
            for (let i in data) { dt.append(String(i), data[i])}
            let response = await axios.post(url, dt)
            return { data: response.data , status: response.status }
            }
            else{
               let response = await axios.post(url, data)
               return { data: response.data , status: response.status }
            }
      }


      this.put = async (url, data) => {
         try {
            if(!data['_parts']){
            const dt = new FormData()
            for (let i in data) {dt.append(String(i), data[i])}
            let response = await axios.put(url, dt)
            return { data: response.data, status: response.status }
            }
            else{
               let response = await axios.put(url, data)
               return { data: response.data , status: response.status }
            }
         } catch (err) {console.log(err)}
      }


      this.delete = async (url, body) => {
         try {
            let response = await axios.delete(url)
            return { data: response.data, status: response.status }
         } catch (err) {console.log(err)}
      }


   })()

}

export default Axios = new axios2()