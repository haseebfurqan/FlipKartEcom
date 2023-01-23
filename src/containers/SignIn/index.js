import React, {useEffect, useState} from "react"
import Layout from "../../components/Layouts";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import {Alert, Col, Row} from "react-bootstrap";
import "../../App.css"
import axios from "axios"
import {isUserLoggedIn, login} from "../../actions"
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom"

const SignIn =()=>{
    const dispatch =useDispatch();
    const [formData,setFormData] = useState({
        email:"",
        password:""
    })



    const [errors, seterrors]=useState("")
    const auth =useSelector(state=>state.auth)
    const inputHandler=(e)=>{
        const name = e.target.name
        const value = e.target.value
        //setFormData(pre=>({...pre,[name]:value}));
        setFormData(pre=>({...pre,[name]:value}));

    }

    /*const sendData=async (e)=>{
        e.preventDefault();


        console.log(formData);
        if(formData.email !="" && formData.password != "") {
            await axios.post("http://localhost:3001/api/admin/login", {...formData}).then(res => {
                console.log(res.data.token)
                //savelocaldata(token);

                if (res.data.token) {
                    const tok= res.data.token;
                 localStorage.setItem("token",tok)
                    console.log(localStorage.getItem("token"))
                    return  window.location.href = '/home'
                } else {
                    return alert("wrong email password")
                }


            }).catch(err => {
                console.log(err)
            });
            e.target.reset();
            setFormData({


                email: "",
                password: ""
            })
        }else {
            return alert("enter All feilds")
        }
    }*/
    const userLogin=(e)=>{
        e.preventDefault();
        dispatch(login(formData));

        console.log("auth:",auth.token)
    }
    if(auth.authenticate)
    {
            return <Navigate to={"/home"}/>
    }


    return(
        <>
            <Layout></Layout>

            <Container style={{paddingTop:"15%"}}>

                <Row>
                    <Col md={{span:4 , offset:0}}>
                        <img src={'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg'} style={{width:"100%",height:"100%"}}/>
                    </Col>
                    <Col md={{span:6 , offset:0}}>

                        <Form style={{backgroundColor:"#C752E7", padding:"20px", marginLeft:"20%"}} className="boarder" onSubmit={userLogin} >
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name="email" onChange={inputHandler} placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" onChange={inputHandler} placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>

                    </Col>

                </Row>

            </Container>
        </>
    );
}

export default SignIn;