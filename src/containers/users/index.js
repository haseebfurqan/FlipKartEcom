import React, {useEffect, useState} from "react";
import header from "../../components/Header";
import Layout from "../../components/Layouts";
import {useDispatch, useSelector} from "react-redux";
import {userlisting} from "../../actions/user.action";
import userReducer from "../../reducers/user.reducer";
import tableData from "./tableData";
import Post from "./tableData";
import Paginations from "./Pagination";
import "../../App.css"

const Users =()=>{

    let index=0;
//Use States
    const [Tabledata,setTabledata]=useState([]);
    const [loading,setLoading]=useState(false);
    const [currentPage,setCurrentPage]=useState(1);
    const [postPerPage,setPostPerPage]=useState(10);

/*console.log(localStorage.getItem("token"))*/
    //UseSelectors
    const user=useSelector(state=>state.userReducer);

    //Redux Actions
    const dispatch= useDispatch();
    useEffect(()=>{
        dispatch(userlisting())
       /* setTabledata(user.userListing)*/

    },[]);


 /*   console.log(user.userListing)
    //handlers*/
    const indexOfLastPost = currentPage * postPerPage
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentPost=user.userListing.slice(indexOfFirstPost,indexOfLastPost);
    const paginates=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    return(
        <>
            <Layout LeftNav></Layout>
            <div className="container-fluid mt-5">
                <h1 className="text-primary mb-5" style={{marginLeft:"53%"}}>Users</h1>
                <div className="boarder" style={{marginLeft:"20%",marginRight:"5%"}}>
                <Post TableData={currentPost} index={index} ></Post>
                <Paginations  PostPerPage={postPerPage} totalpost={user.userListing.length} paginate={paginates}/>
                </div>
            </div>
        </>
    )

}
export default Users