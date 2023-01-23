import React from "react"
import Layout from "../../components/Layouts";
import {useEffect} from "react"
import {createcategoryList, getAllCategories, getAllProducts} from "../../actions";
import {useDispatch, useSelector} from "react-redux";

const Home =()=>{

    return(
        <>
            <Layout LeftNav> dashboard</Layout>

        </>
    );
}

export default Home;