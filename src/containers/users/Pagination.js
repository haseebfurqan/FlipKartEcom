import React from "react"
import Container from "react-bootstrap/Container";
import {NavLink} from "react-router-dom";

const Paginations =({ PostPerPage, totalpost, paginate})=>{
    const pageNumbers=[];
    for(let i=1;i<=Math.ceil(totalpost/PostPerPage); i++){
        pageNumbers.push(i);
    }
   /* console.log("pageeeeeeeeeeeee",pageNumbers)*/
   /* <ul >
    <li><NavLink to={`/home`}>dashboard</NavLink></li>
    <li><NavLink to={`/users`}>users</NavLink></li>
    <li><NavLink to={`/products`}>products</NavLink></li>
    <li><NavLink to={'/orders'}>orders</NavLink></li>
    <li><NavLink to={'/categories'}>categories</NavLink></li>*/
    return(
        <>

            <nav>
                <ul className="pagination">
                    {pageNumbers.map(num=>(
                        <li key={num} className="page-item">
                            <a  onClick={()=>paginate(num)} className="page-link">
                                {num}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

        </>
    )
}


export default Paginations