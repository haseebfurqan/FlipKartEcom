import React, {useEffect, useState} from "react";
import Layout from "../../components/Layouts";
import Container from "react-bootstrap/Container";
import "../../App.css"
import {useDispatch, useSelector} from "react-redux";
import {addcategory, DeleteCategory, getAllCategories,createcategoryList} from "../../actions";
import {Col, Row} from "react-bootstrap";
import {Modal , Button} from "react-bootstrap";
import {InputGroup} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import CheckboxTree from "react-checkbox-tree"
import {IoCheckbox, IoCheckboxOutline, IoCheckboxSharp,IoChevronDownOutline,IoChevronUpOutline} from "react-icons/io5"
import 'react-checkbox-tree/lib/react-checkbox-tree.css';



const Categories =(props)=>{
    //Use States
    const [show, setShow] = useState(false);
    const [showDel,setShowDel]=useState(false);
    const [CategoryImage, setcategoryImage]=useState();
    const [delItem,setDelItem]=useState("")
    const [checked,setChecked]=useState([])
    const [expanded, setExpanded]=useState([])




    //Handlers
    const handleShowDel =()=> setShowDel(true);
    const handleShow = () => setShow(true);


    //Use Selectors
    const category =useSelector(state=>state.category);

    //action redux calling
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getAllCategories());
    },[])

    const [formData,setFormData] = useState({
        Categoryname:"",
        ParentId:null,

    })




    const handleCloseDel =()=>{
        const form={
            delItem
        }
        console.log("delItem: ",form);

        dispatch(DeleteCategory(form))
        if(category.deleted===true)
        {
            console.log("hello",category.deleted)
            return alert("category deleted")
        }
        setShowDel(false)
    };




    const handleClose = () => {

        const form = new FormData();
        form.append('Categoryname',formData.Categoryname);
        form.append('Categoryimage',CategoryImage);
        if(formData.ParentId != null)
        {
            form.append('ParentId',formData.ParentId);
        }
        dispatch(addcategory(form));
        /* const cat={
             formData,
             CategoryImage,
         }*/
        console.log("form:",form);
        setShow(false);
    }





    const inputHandler=(e)=>{
        const name = e.target.name
        const value = e.target.value

        //setFormData(pre=>({...pre,[name]:value}));
        setFormData(pre=>({...pre,[name]:value}));
    }
    const InputdelHandler =(e)=>{
        const value= e.target.value;
        setDelItem(value);
    }


    const renderCategories =(categories)=>{

        let mycategories=[];
        for (let category of categories)
        {
            mycategories.push(
                {
                    label: category.Categoryname,
                    value: category._id,
                    children:category.children.length >= 0 &&renderCategories(category.children)
                }
                /*<li key={category.Categoryname}>
                    {category.Categoryname}
                    {category.children.length >= 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>*/
            );

        }
        return mycategories
    }


    const createcategoryList=(categories, options=[])=>{
        for (let category of categories)
        {
            options.push({value : category._id, name: category.Categoryname})
            if(category.children.length >0)
            {
                createcategoryList(category.children,options)
            }
        }

        return options
    }

    const handleCategoryImage=(e)=>{
        setcategoryImage( e.target.files[0]);
    }
    /*   console.log("formData: ", formData)
       console.log("image:",CategoryImage)*/
    return(
        <Layout LeftNav>
            <Container fluid>
                <div className="row">
                    <br/>
                    <div className="col-10">
                        <div className="Add">
                            <h3>Categories</h3>
                            <Button onClick={handleShow}>Add</Button>
                        </div>

                    </div>
                    <div className="col-1">
                        <div className="Add">
                            <Button onClick={handleShowDel}>Delete</Button>
                        </div>
                    </div>
                </div>
                <Row style={{ height: '800px',overflow:"scroll"}} >
                    <div className="col-12">
                        <ul>
                            {/*{renderCategories(category.categories)}*/}
                            {/*{JSON.stringify(createcategoryList(category.categories))}*/}

                            <CheckboxTree
                                nodes={renderCategories(category.categories)}
                                checked={checked}
                                expanded={expanded}
                                onCheck={checked => setChecked(checked)}
                                onExpand={expanded => setExpanded(expanded)}
                                icons={{
                                check:<IoCheckbox></IoCheckbox>,
                                    uncheck:<IoCheckboxOutline></IoCheckboxOutline>,
                                    halfCheck:<IoCheckboxOutline/>,
                                    expandClose:<IoChevronUpOutline/>,
                                    expandOpen:<IoChevronDownOutline/>,
                                }}
                            />

                        </ul>
                    </div>
                </Row>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Category Name</Form.Label>
                                    <Form.Control type="name" name="Categoryname" onChange={inputHandler} placeholder="Enter category name" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Select onChange={inputHandler} name="ParentId" >
                                        <option>Select Category</option>
                                        {
                                            createcategoryList(category.categories).map(option=>  <option key={option.value} value={option.value}>{option.name}</option>)
                                        }
                                    </Form.Select>
                                </Form.Group>

                                <input  type="file" name="CategoryImage" onChange={handleCategoryImage} ></input>
                            </Row>
                        </Form>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* delete model   */}
                <Modal show={showDel} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Select onChange={InputdelHandler} name="value" >
                                    <option>Select Category</option>
                                    {
                                        createcategoryList(category.categories).map(option=>  <option key={option.value} value={option.value}>{option.name}</option>)

                                    }
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        {/* <InputGroup>
                        <InputGroup.text id="basic-1">Category</InputGroup.text>
                            <Form.Control
                                placeholder="Category Name"
                                aria-label="Category Name"
                                aria-describedby="basic-1"
                            />
                        </InputGroup>*/}
                    </Modal.Body>
                    {/*  <InputGroup>
                        <InputGroup.text id="basic-1">Category Name</InputGroup.text>
                    </InputGroup>*/}
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseDel}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </Layout>

    )

}
export default Categories