import {categoryConstants} from "../actions/constants";

const initState ={
    categories:[],
    loading :false,
    error:null,
    action:false,
    deleted:false,
};

const buildNewCategoriesList=(pid,categories,category)=>{
    let maycategories=[];
    for(let cat of categories)
    {
        if(cat._id == pid){
            maycategories.push({
                ...cat,
                children: cat.children && cat.children.length>0 ? buildNewCategoriesList(pid,[...cat.children,{
                    _id:category._id,
                    Categoryname:category.Categoryname,
                    ParentId:category.ParentId,
                    CategorySlug:category.CategorySlug,
                    children:category.children
                }],category):[]

            })
        }else {
            maycategories.push({
                ...cat,
                children: cat.children && cat.children.length>0 ? buildNewCategoriesList(pid,cat.children,category):[]

            })
        }

    }
    return maycategories

}

export default (state=initState,action)=>{
    switch (action.type){
        case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
            state={
                ...state,
                loading: true
            }
            break;
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state ={
                ...state,
                categories:action.payload.categories,
                loading: false,
                action:true
            }
            break;
        case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
            state ={
                ...state,
                loading:false,
                action:false,
                error: action.payload.error
            }
            break;
        case categoryConstants.DELETE_CATEGORY_REQUEST:
            state={
                ...state,
                loading:true,
            }
            break;
        case categoryConstants.DELETE_CATEGORY_SUCCESS:
            state={
                ...state,
                loading:false,
                action: true,
                deleted: true
            }
            break;
        case categoryConstants.DELETE_CATEGORY_FAILURE:
            state={
                ...state,
                loading:false,
                action: false,
            }
            break;
        case categoryConstants.ADD_CATEGORY_REQUEST:
            state={
                ...state,
                loading: true
            }
            break;
        case categoryConstants.ADD_CATEGORY_SUCCESS:
            const updatedcategories =buildNewCategoriesList(action.payload.category.ParentId,state.categories,action.payload.category)
            console.log("The updated List",updatedcategories)
            state={
                ...state,
                categories: updatedcategories,
                loading: true,
            }
            break;
        case categoryConstants.ADD_CATEGORY_FAILURE:
            state={
                ...state
            }
    }

    return state;
}
/*

export default (state=initState,action)=>{
    switch (action.type){

    return state;
}
*/
