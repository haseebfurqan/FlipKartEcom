import {userConstants} from "../actions/constants";


const initial={
    userListing:[],
    loading:false,
    action:false,
}


const UpdateUser=(userListing,userupateListing,id)=>{
    const update=[]

    for(let user of userListing)
    {
        if(user._id === id)
        {
            update.push({
                ...userupateListing})
        }
        else {
            update.push({
                ...user})
        }
    }
    return update
}




export default (state=initial,action)=>{
    switch (action.type)
    {
        case userConstants.GET_ALL_USERS_REQUEST:
            state={
                ...state,
                loading: true
            }
            break;
        case userConstants.GET_ALL_USERS_SUCCESS:
            state={
                loading: false,
                action: true,
                userListing: action.payload.userList
            }
            break;
        case userConstants.GET_ALL_USERS_FAILED:
            state={
                ...state,
            }
            break;
        case userConstants.EDIT_ALL_USERS_REQUEST:
            state={
                ...state,
                loading: true
            }
            break;
        case userConstants.EDIT_ALL_USERS_SUCCESS:
            const listingg=UpdateUser(state.userListing,action.payload.userupateListing,action.payload.userupateListing._id)
            state={
                loading: false,
                action: true,
                userListing: listingg
            }
    }
    return state
}