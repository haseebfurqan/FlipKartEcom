import React from 'react'
import Table from 'react-bootstrap/Table';
import "../../App.css"
import Button from "react-bootstrap/Button";
import {useState} from "react"
import {Modal, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {useDispatch} from "react-redux";
import {Edituser} from "../../actions";

const Post=({TableData,index})=>{
const dispatch= useDispatch();
    const [showEditModel,setShowEditModel]=useState(false)
    const [userdata,setUserData]=useState();
    const [input,setInput]=useState();

    /*if(Loading)
    {
        return(
            <>
                Loading
            </>
        )
    }
*/
    //Get current post

    const EditHandler=(user)=>{
        setShowEditModel(true);
   /*     console.log("userrrrrrrrrr",user)*/
        setUserData(user)
        /*console.log("updateeeeee user",userdata)*/
    }
    const EditHandleClose=()=>{
        const form={
            _id:userdata._id,
            userRole:userdata.userRole,
            userStatus:userdata.userStatus
        }
     /*   console.log("formmmmmmmmmmmm",form)*/
        dispatch(Edituser(form))
        setShowEditModel(false);
    }


    const inputHandlerRole=(e)=>{
        const name = e.target.name
        const value = e.target.value
        setUserData(pre=>({...pre,[name]:value}));

      /*  console.log("updateeeeeeeeeee",userdata);*/
    }
    const HandlerExit=()=>{
        setShowEditModel(false);
    }

    const renderEditModel=()=>{
        if(showEditModel==true)
        {
            return(
                <Modal show={showEditModel} onHide={HandlerExit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Info</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>

                            <Row>
                                <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
                                    <Form.Label>First Name</Form.Label><br/>
                                    <Form.Label type="String" name="fname"  placeholder="First name" style={{padding:"10%",paddingRight:"50%"}} className="boarder">{userdata.fname}</Form.Label>
                                </Form.Group>
                                <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
                                    <Form.Label>Last Price</Form.Label><br/>
                                    <Form.Label type="String" name="productprice"  placeholder="last name" style={{padding:"10%",paddingRight:"50%"}} className="boarder">{userdata.lname}</Form.Label>
                                </Form.Group>

                            </Row>
                            <hr/>

                            <Form.Group className="mb-3 " controlId="formBasicEmail">
                                <Form.Label>User Email</Form.Label><br/>
                                <Form.Label type="email" name="userEmail"  placeholder="Users email" style={{padding:"10%",paddingRight:"50%"}} className="boarder"> {userdata.email}</Form.Label>
                            </Form.Group>
                            <hr/>
                            <Row>
                                <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
                                    <Form.Label>Users Country</Form.Label><br/>
                                    <Form.Label type="name" name="Users City"  placeholder="Users City" style={{padding:"10%",paddingRight:"50%"}} className="boarder">{userdata.country}</Form.Label>
                                </Form.Group>

                                <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
                                    <Form.Label>Users City</Form.Label><br/>
                                    <Form.Label type="name" name="Users City"  placeholder="Users City" style={{padding:"10%",paddingRight:"50%"}} className="boarder">{userdata.city}</Form.Label>
                                </Form.Group>
                            </Row>
                            <hr/>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Users PhoneNumber</Form.Label><br/>
                                <Form.Label type="Number" name="PhoneNumber"  placeholder="Users PhoneNumber" style={{padding:"10%",paddingRight:"50%"}} className="boarder">{userdata.phoneNumber}</Form.Label>
                            </Form.Group>
                            <hr/>
                            <Row>
                                <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
                                    <Form.Label>Users Status</Form.Label>
                                    <Form.Select  name="userStatus" onChange={inputHandlerRole}>
                                        <option >{userdata.userStatus}</option>
                                        <option>Disable</option>
                                        <option>Enable</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
                                    <Form.Label>Users Role</Form.Label>
                                    <Form.Select  name="userRole" onChange={inputHandlerRole}>
                                        <option >{userdata.userRole}</option>
                                        <option>Admin</option>
                                        <option>User</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <hr/>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={EditHandleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            )
        }
    }

    return(
        <>
            <Table responsive >
                <thead>
                <tr>
                    <th>UNO.</th>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>User Status</th>
                    <th>User Role</th>
                    <th>Edit User</th>
                </tr>
                </thead>
                <tbody>
                {TableData.length>0 ? TableData.map(user=>(
                    <tr key={user._id}>
                        <td className="bulitRemove">{++index}</td>
                        <td className="bulitRemove">{user.fname+" "+user.lname}</td>
                        <td className="bulitRemove">{user.email}</td>
                        <td className="bulitRemove">{user.userStatus}</td>
                        <td className="bulitRemove">{user.userRole}</td>
                        <td className="bulitRemove">
                            <Button onClick={()=>EditHandler(user)}>edit</Button>
                        </td>
                    </tr>
                )):null}
                </tbody>
            </Table>
            {renderEditModel()}
            {/*  <ul className="list btn-group mb-4">
                {TableData.map(
                    post=>(
                        <li key={post._id} className="list-group-item">
                            {post.fname}
                        </li>
                    )
                )}
            </ul>*/}
        </>
    )

}
export default Post;