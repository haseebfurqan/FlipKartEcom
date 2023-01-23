import axios from "../helperax/axios";
import {userConstants} from "./constants";
import config from "bootstrap/js/src/util/config";
import {Navigate} from "react-router-dom";
import React from "react";

export const userlisting=()=>{
    return async dispatch=>{
            dispatch({
                type:userConstants.GET_ALL_USERS_REQUEST
            })
       try{
           const res= await axios.get(`admin/userlisting`,{headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}})

           if(res.status==200)
           {
               const users=res.data.userlisting
               /* console.log("elooooooo",users)*/
               dispatch({
                   type:userConstants.GET_ALL_USERS_SUCCESS,
                   payload:{
                       userList:users
                   }
               })
           }
           else {
               dispatch({
                   type:userConstants.GET_ALL_USERS_FAILED
               })
           }
       }catch (error)
       {
           console.log("1111111111111111111")
        /*   if(error.response.status==500)
           {
              /!* return <Navigate to="/signin/" />*!/
              /!* console.log(error.response)*!/
           }*/
       }


    }
}

export const Edituser=(form)=>{
    return async dispatch=>{
    dispatch({
        type:userConstants.GET_ALL_USERS_REQUEST
    })
        const res= await axios.post(`admin/EditUser`,form,{headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}})
        if(res.status===200)
        {
            const ListingUpdate=res.data.edituser;
            console.log("updateeeeeeeeeeeeeeeee",res.data.edituser)
            dispatch({
                type:userConstants.EDIT_ALL_USERS_SUCCESS,
                payload:{
                    userupateListing: ListingUpdate
                }
            })

        }
        else {
            dispatch({
                type:userConstants.EDIT_ALL_USERS_FAILED
            })
        }
    }
}