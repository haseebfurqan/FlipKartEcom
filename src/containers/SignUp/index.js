import React from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Layouts from "../../components/Layouts";
import {Col, Row} from "react-bootstrap";
import "../../App.css"
const SignUp =()=>{
    return(
        <>
            <Layouts></Layouts>

            <Container style={{paddingTop:"15%"}}>

                <Row>
                    <Col md={{span:4 , offset:0}}>
                        <img src={'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg'} style={{width:"100%",height:"100%"}}/>
                    </Col>
                    <Col md={{span:6 , offset:0}}>
                        <Form style={{backgroundColor:"#C752E7", padding:"20px", marginLeft:"20%"}} className="boarder">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <div className="row">
                                <div className="col-6">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="name" name="fname" placeholder="Enter First Name" />
                                    </Form.Group>
                                </div>

                                <div className="col-6">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="name" name="lname" placeholder="Enter Last Name" />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control type="Country" name="country" placeholder="Enter Country Name" />
                                    </Form.Group>
                                </div>
                                <div className="col-6">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="number" name="phoneNumber" placeholder="Enter phoneNumber" />
                                    </Form.Group>
                                </div>
                            </div>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Password" />
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

export default SignUp;