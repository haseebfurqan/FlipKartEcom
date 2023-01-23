import authReducers from "./auth.reducers";
import {combineReducers} from "redux";
import productReducer from "./product.reducer"
import categoryReducer from "./category.reducer"
import userReducer from "./user.reducer"
import orderRducer from "./orderReducer"
const rootReducer = combineReducers({
    auth:authReducers,
    category:categoryReducer,
    productReducer:productReducer,
    userReducer:userReducer,
    orderRducer:orderRducer
});
export default rootReducer;