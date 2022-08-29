import localStorage from "@react-native-async-storage/async-storage"
import Toast from "../Components/Toast"


const toast = () => {
   Toast('مشکلی از سمت سرور پیش آمده')
}

const toast400 = () => {
   Toast('خطا دوباره امتحان کنید')
}


function fetch2() {
   (async () => {

      let errorMessage = true
      let show = true
      let interval = ''
      function sum() { show = true }

      let token = await localStorage.getItem("token")
      let hdr = { Accept: 'application/json', 'Content-Type': 'application/json' }
      if (token) hdr["Authorization"] = token


      this.get = async (url) => {
         try {
            let response = await fetch(url, { headers: hdr })
            if (response.status >= 400) throw new Error()
            clearInterval(interval)
            errorMessage = true
            return { data: await response.json(), status: response.status }
         } catch (err) {

            if (errorMessage) {
               toast()
               errorMessage = false
            }

            interval = setInterval(sum, 20000)
            console.log(err);
            if (show) {
               toast()
               show = false
            }
         }
      }


      this.post = async (url, data) => {
         try {
            if(!data['_parts']){
            const dt = new FormData()
            for (let i in data) {dt.append(String(i), data[i])}
            let response = await fetch(url, {method: 'post', body: dt, headers: hdr})
            if (response.status === 400) return toast400()
            if (response.status > 400) throw new Error()
            return { data: await response.json(), status: response.status }
         }
         else{
            let response = await fetch(url, {method: 'post', body: data, headers: hdr})
            if (response.status === 400) return toast400()
            if (response.status > 400) throw new Error()
            return { data: response.data , status: response.status }
         }
         } catch (err) {
            console.log(err)
            toast()
         }
      }


      this.put = async (url, data) => {
         try {
            if(!data['_parts']){
            const dt = new FormData()
            for (let i in data) {dt.append(String(i), data[i])}
            let response = await fetch(url, {method: 'put', body: dt, headers: hdr})
            if (response.status === 400) return toast400()
            if (response.status > 400) throw new Error()
            return { data: await response.json(), status: response.status }
         }
         else{
            let response = await fetch(url, { method: 'put', body: data, headers: hdr})
            if (response.status === 400) return toast400()
            if (response.status > 400) throw new Error()
            return { data: response.data , status: response.status }
         }
         } catch (err) {
            console.log(err)
            toast()
         }
      }


      this.delete = async (url, body) => {
         try {
            let response = await fetch(url, { method: 'delete', headers: hdr, body })
            if (response.status === 400) return toast400()
            if (response.status > 400) throw new Error()
            return { data: await response.json(), status: response.status }
         } catch (err) {
            console.log(err)
            toast()
         }
      }

   })()

}

export default axios = new fetch2()