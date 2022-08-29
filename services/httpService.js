import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";
import localStorage from "@react-native-async-storage/async-storage"
import toast from "../Components/Toast"


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

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};
