import {authConstants} from "./constants";
import axiosinstance from "../helperax/axios";

export const login=(user)=>{
    console.log("abc : ", user)
    return async (dispatch)=>{
        dispatch({
            type:authConstants.LOGIN_REQUEST
        })
        const res = await axiosinstance.post('admin/login',{
            ...user
        })

        if(res.data.status === "success")
        {
            const{token,user}=res.data;
            localStorage.setItem('token',token);
            localStorage.setItem('user',JSON.stringify(user));
            console.log("token: ",token,"user :",user)
            dispatch({
                type:authConstants.LOGIN_SUCCESS,
                payload:{
                    token,user
                }
            })
        }else {


                dispatch({
                    type:authConstants.LOGIN_FAILURE,
                    payload:{error:res.data.message}

                })





        }


    }
}


export const isUserLoggedIn=()=>{
    return async dispatch=>{
        const token = localStorage.getItem('token');
        if(token)
        {
            const user=JSON.parse(localStorage.getItem('user'));
            dispatch({
                type:authConstants.LOGIN_SUCCESS,
                payload:{
                    token,user
                }
            })
        }else{
            dispatch({
                type:authConstants.LOGIN_FAILURE,
                payload:{error:'failed to login'}
            })
        }
    }
}

export const LogOut=()=>{
    return async dispatch=>{
        localStorage.clear()
        dispatch({
            type:authConstants.LOGOUT_REQUEST
        });
    }
}