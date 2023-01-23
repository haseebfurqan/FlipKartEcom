import axios from "../helperax/axios";
import {categoryConstants, productContants} from "./constants";
import {getAllCategories} from "./category.actions";
import {useDispatch} from "react-redux";
export const getAllProducts =()=> {
    return async dispatch =>{
        dispatch({
            type:productContants.GET_ALL_PRODUCTS_REQUEST
        })
        const res = await  axios.get(`product/getallproducts`);
        console.log(res);
        if(res.status === 200)
        {

            /*console.log("actionnnnnnnnnn:",res.data.product)*/
            const productList=res.data.product

            dispatch({
                type:productContants.GET_ALL_PRODUCTS_SUCCESS,
                payload:{
                    products:productList
                }
            })
        }else {
            dispatch({
                type:productContants.GET_ALL_PRODUCTS_FAILED
            })
        }
    }
}
/*export const getAllCategories=()=>{
    return async dispatch =>{
        dispatch({
            type:categoryConstants.GET_ALL_CATEGORIES_REQUEST
        });
        const res= await axios.get("category/getallcategories");
        console.log(res);
        if(res.status ===200)
        {
            const {categoryList}=res.data;
            dispatch({
                type:categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload:{
                    categories:categoryList
                }
            })
        }
        else {
            dispatch({
                type:categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload:{
                    error:res.data.error
                }
            })
        }
    }
}*/

export const addproducts = (form)=>{
    console.log("hello sendding add request")
    return async dispatch =>{
        dispatch({
            type:productContants.ADD_PRODUCTS_REQUEST
        })
        const res = await  axios.post(`product/create`,form,{headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}});
        console.log("produictttttttttttt",res.data.product)
        if(res.status===200){
            dispatch({
                type:productContants.ADD_PRODUCTS_SUCCESS,
                payload:{
                    newproduct:res.data.product
                }
            })
        }else {
            dispatch({
                type:productContants.ADD_PRODUCTS_FAILURE
            })
        }

    }
}
export const editproduct = (form)=>{
    console.log("hello sendding edit requestiwhjcbwicwicbuiwebcipbwecbiwubcuibwdicbiwebc");
    for (var pair of form.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }
    return async dispatch =>{
        dispatch(
            {
                type:productContants.EDIT_PRODUCT_REQUEST
            }
        )

        const res = await  axios.post(`product/editproduct`,form);
        if(res.status==200){
            dispatch(
                {
                    type:productContants.EDIT_PRODUCT_SUCCESS,
                    payload:{
                        editpro:res.data.product
                }}
            )
        }
        else {
            dispatch({
                type:productContants.EDIT_PRODUCT_FAILED,
            })
        }
    }
    // return async dispatch =>{
    //
    //
    // }
}

export const deleteproduct = (form)=>{
    console.log("hello sendding del request")
    return async dispatch =>{
        const res = await  axios.post(`product/deleteproduct`,form,{headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}});

    }
}
