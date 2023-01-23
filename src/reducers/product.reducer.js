import {productContants} from "../actions/constants";
import products from "../containers/Products";

const initState={
    products:[],
    action:false,
    loading:false,
    error:false,

}
const newProductListing=(id,newPro,products)=>{
    let newlisting=[]
    for (let pro of products)
    {
        newlisting.push({
            ...pro
        })
    }
    newlisting.push({
        ...newPro
    })
    return newlisting
}
export default (state=initState,action)=>{
    switch (action.type){
        case productContants.GET_ALL_PRODUCTS_SUCCESS:
            state={
                action:true,
                products:action.payload.products
            }
            break;
        case productContants.ADD_PRODUCTS_REQUEST:
            state={
                ...state,
                loading: true,
            }
            break;
        case productContants.ADD_PRODUCTS_SUCCESS:
            const product = newProductListing(action.payload.newproduct._id,action.payload.newproduct,state.products)
            state={

                products: product,
                action: true,
                loading: false,
            }
            break;
        case productContants.ADD_PRODUCTS_FAILURE:
            state={
                ...state
            }
    }
    return state;
}