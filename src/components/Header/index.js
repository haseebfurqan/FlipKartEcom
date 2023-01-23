import React from "react"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useDispatch, useSelector} from "react-redux";
import {LoggedOut, LogOut} from "../../actions";

const Header =()=>{

    const dispatch = useDispatch();
    const auth= useSelector(state => state.auth);
     const pressed =()=>
     {
         localStorage.clear()
     }
    const renderNonLoggedInLinks=()=>{
        return(
            <Nav>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
                <Nav.Link href="/" >Sing In</Nav.Link>
            </Nav>
        )
    }
    const LogOut=()=>{

        dispatch(LogOut());
    }
    const renderLoggedInLinks=()=>{
        return(
            <Nav>
                <Nav.Link href="/" onClick={pressed}>Sign Out</Nav.Link>
            </Nav>
        )
    }
    return(
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{bsnavbarpaddingy: "0rem", zIndex:1}}>
                <Container fluid>
                    <Navbar.Brand href="/">admin Panel</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    );
}
export default Header