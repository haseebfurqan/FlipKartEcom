import axios from "../helperax/axios";
import {categoryConstants} from "./constants";


const createcategoryList=(categories, options=[])=>{
    for (let category of categories)
    {
        options.push({value : category._id, name: category.Categoryname})
        if(category.children.length >0)
        {
            createcategoryList(category.children,options)
        }
    }
    localStorage.setItem("categoryList",JSON.stringify(options))}


    export const getAllCategories=()=>{
    return async dispatch =>{
        dispatch({
            type:categoryConstants.GET_ALL_CATEGORIES_REQUEST
        });
        const res= await axios.get("category/getallcategories");
        console.log(res);
        if(res.status ===200)
        {

            const {categoryList}=res.data;

            /*localStorage.setItem("categoryList",JSON.stringify(categoryList))*/
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

}

export const addcategory = (form)=>{
    return async dispatch =>{
        dispatch({
            type:categoryConstants.ADD_CATEGORY_REQUEST
        })
        try{
            const res = await  axios.post(`category/create`,form,{headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}});
            console.log("ressssssssssssssss",res.data.cat);
            if(res)
            {
                dispatch({
                    type: categoryConstants.ADD_CATEGORY_SUCCESS,
                    payload:{
                        category:res.data.cat
                    }
                })
            }else
            {
                dispatch({
                    type: categoryConstants.ADD_CATEGORY_FAILURE
                })
                console.log("soryyyyyyyyyyyyyyyyyyyyyyyyyyyy")
            }
        }catch (error)
        {
            console.log("soryyyyyyyyyyyyyyyyyyyyyyyyyyyy")
            console.log(error.response)
        }

    }
}

export const DeleteCategory =(form)=>{
    return async dispatch=>{
        dispatch=({
            type:categoryConstants.DELETE_CATEGORY_REQUEST
        })
        const res= await axios.post(`category/deletecategory`,form);
        if(res.status==200)
        {
            dispatch({
                type: categoryConstants.DELETE_CATEGORY_SUCCESS
            })
        }
        else {
            dispatch({
                type:categoryConstants.DELETE_CATEGORY_FAILURE
            })
        }
    }
}

