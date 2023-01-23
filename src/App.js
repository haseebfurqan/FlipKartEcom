
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from "./containers/Home"
import SignUp from "./containers/SignUp"
import SignIn from "./containers/SignIn"
import ProtectedRoutes from "./auth";
import {useEffect} from "react";
import {getAllCategories, getAllProducts, isUserLoggedIn, userlisting} from "./actions";
import {useDispatch, useSelector} from "react-redux";
import Products from "./containers/Products";
import Orders from "./containers/orders";
import Categories from "./containers/categories";
import Users from "./containers/users";
function App() {
    const dispatch = useDispatch();
    const auth = useSelector(state =>state.auth)
    useEffect(()=>{
        if(!auth.authenticate){
            dispatch(isUserLoggedIn());

        }


    },[]);

    return (
        <>
            <Routes>
                <Route path={"/"} element={<SignIn/>}/>
                <Route path={"/signup"} element={<SignUp/>}/>
                <Route path={"/"} element={<ProtectedRoutes/>}>
                    <Route exact path='/home' element={<Home/>}/>
                    <Route  path='/products' element={<Products></Products>}/>
                    <Route  path='/orders' element={<Orders></Orders>}/>
                    <Route  path='/users' element={<Users></Users>}/>
                    <Route  path='/categories' element={<Categories></Categories>}/>
                </Route>
            </Routes>
            {/*<Layout></Layout>*/}

        </>
    );
}

export default App;
