import React, {useState} from "react"
import {Route,Navigate,Outlet} from "react-router-dom";



    /*const ProtectedRoutes =({auth,element,...rest})=>{
        return (
            <Route {...rest} render={(props)=>{
                if(auth){
                    return <element {...props}/>;

                }
                if(!auth)
                {
                    return <Navigate to={"/signup"} state={{ from: props.location }} />
                }
            }}
            />
        )

}*/
/*{{path:"/",state:{from : props.location}}*/
/*
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const auth = null; // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Outlet /> : <Navigate to="/login" />;
}*/

const ProtectedRoutes =()=>{
    let auth =null
   /* const [loggedin,setloggedin]=useState("");*/
    if(localStorage.getItem("token"))
    {
       /* setloggedin(true)*/
        auth= true
       /* return <Navigate to={"/home"} />*/
    }
    /*else {
        /!*setloggedin(false)*!/
        return <Navigate to={"/signin"}/>
    }*/
/*
if(loggedin===true)
{
    setloggedin(null)
    return <Navigate to={"/home"}/>
}
else {
    return <Navigate to={"/signin"}/>
}
*/
    return auth ? <Outlet /> : <Navigate to="/" />;
}
export default ProtectedRoutes;
/*
class Auth{
    constructor() {
        this.authenticated =false
    }
    login(cb){
        this.authenticated=true
        cb()
    }
    logout(cb)
    {
        this.authenticated=false
        cb()
    }

    isAuthenticated(){
        return this.authenticated;
    }

}
export default new Auth();*/
