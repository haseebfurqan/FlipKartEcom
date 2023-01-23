import React from "react"
import Header from "../Header";
import Container from 'react-bootstrap/Container';
import "../../App.css"
import {Link} from "react-router-dom";
import {NavLink} from "react-router-dom";
const Layout =(props)=>{
    return(
        <>
            <Header/>
            {
                props.LeftNav ?
                    <Container fluid>
                            <div className="row">
                                <div className="col-2 sidebar">
                                    <ul >
                                        <li><NavLink to={`/home`}>dashboard</NavLink></li>
                                        <li><NavLink to={`/users`}>users</NavLink></li>
                                        <li><NavLink to={`/products`}>products</NavLink></li>
                                        <li><NavLink to={'/orders'}>orders</NavLink></li>
                                        <li><NavLink to={'/categories'}>categories</NavLink></li>
                                    </ul>
                                </div>
                                <div className="col-10" style={{ marginLeft:'auto'}}>
                                    {props.children}
                                </div>
                            </div>
                    </Container> :
                    props.children
            }


        </>
    );
}
export default Layout