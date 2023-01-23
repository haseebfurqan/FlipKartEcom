import axios from "axios";
import {api} from "./urlConfig"
import {authConstants} from "../actions/constants";
import {useDispatch} from "react-redux";

const axiosinstance = axios.create({
    baseURL:api,

});

axiosinstance.interceptors.request.use((req)=>{
    return req;
})

axiosinstance.interceptors.response.use((res)=>{
    return res;
},(error)=>{
    console.log(error.response);
    const {status}=error.response;
    if(status == 500){
        localStorage.clear()
        useDispatch({type:authConstants.LOGOUT_REQUEST})
    }
    return Promise.reject(error)
})

export default  axiosinstance