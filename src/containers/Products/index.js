import React from "react";
import Table from 'react-bootstrap/Table';
import Layout from "../../components/Layouts";
import "../../App.css"
import {useState,useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addcategory, addproducts, deleteproduct, editproduct, getAllCategories, getAllProducts} from "../../actions";
import productReducer from "../../reducers/product.reducer";
import Button from "react-bootstrap/Button";
import {Col, Modal, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";

const Products =(props)=>{
    const user=  JSON.parse(localStorage.getItem('user'));
    const dispatch = useDispatch()
    const [proimages,setProimages]=useState([])
    const products = useSelector(state=> state.productReducer)
    const category =useSelector(state=> state.category)
    const [showAdd, setShowAdd] = useState(false);
    const [showedit, setShowedit] = useState(false);
    const [formData,setFormData] = useState({
        productname:"",
        productprice:"",
        productQunatity:"",
        productdescription:"",
        categoryId:""
    })


    const [editform,setEditform]=useState({

        _id:"",
        productname:"",
        productprice:"",
        productQunatity:"",
        productdescription:"",
        categoryId:"",
        productpictures:"",

    })
    const [showedel,setShowdel]=useState(false);

    const [delid,setdelid]=useState()

    let  pro =[];
    pro=products.products;

    useEffect(()=>{
        dispatch(getAllProducts());
        dispatch(getAllCategories());
    },[])
    const handleShow=()=>{
        setShowAdd(true)
    }

    const handleClose=()=>{

        const form=new FormData();
        for(let i=0;i<=proimages.length;i++)
        {
            form.append('productpictures',proimages[i])}
        form.append('productname',formData.productname);
        form.append('productprice',formData.productprice);
        form.append('productdescription',formData.productdescription);
        if(formData.categoryId != null) {
            form.append('categoryId', formData.categoryId);
        }
        form.append('productQunatity',formData.productQunatity);
        form.append('createdby',user._id)


        dispatch(addproducts(form))
        setShowAdd(false)
    }
    const handleCloseAddno=()=>{
        setShowAdd(false)
    }
    const handleProductImage = (e) => {
        setProimages([...proimages,e.target.files[0]])
        console.log(proimages.length)
    }
    const inputHandler=(e)=>{
        const name = e.target.name
        const value = e.target.value
        setFormData(pre=>({...pre,[name]:value}));
    }


    const renderaddmodel=()=>{
        return(
            <Modal show={showAdd} onHide={handleCloseAddno}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>product Name</Form.Label>
                                <Form.Control type="name" name="productname" onChange={inputHandler} placeholder="Enter product name" />
                            </Form.Group>
                            <Row>
                                <div className="col 5">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>product Price</Form.Label>
                                        <Form.Control type="number" name="productprice" onChange={inputHandler} placeholder="Enter price" />
                                    </Form.Group>
                                </div>
                                <div className="col 5">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Product Quantity</Form.Label>
                                        <Form.Control type="number" name="productQunatity" onChange={inputHandler} placeholder="Enter product description" />
                                    </Form.Group></div>
                            </Row>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Product Description</Form.Label>
                                <Form.Control type="name" name="productdescription" onChange={inputHandler} placeholder="Enter product description" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Product Category</Form.Label>
                                <Form.Select  name="categoryId" onChange={inputHandler}>
                                    <option>Select Category</option>
                                    {
                                        createcategoryList(category.categories).map(option=>  <option key={option.value} value={option.value}>{option.name}</option>)
                                    }
                                </Form.Select>
                            </Form.Group>

                            <input  type="file" name="productpictures" onChange={handleProductImage} ></input>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }



    const renderTable=()=>{
        let index=0
        return(
            <Table responsive>
                <thead>
                <tr>
                    <th>PNO.</th>
                    <th>product Name</th>
                    <th>Product Price</th>
                    <th>Product Quantity</th>
                    <th>Category Name</th>
                    {/* <th>Product Image</th>*/}
                    <th>Edit product</th>
                </tr>
                </thead>
                <tbody>
                {pro.length>0 ? pro.map(pro=>(
                    <tr key={pro._id}>
                        <td className="bulitRemove">{++index}</td>
                        <td className="bulitRemove">{pro.productname}</td>
                        <td className="bulitRemove">{pro.productprice}</td>
                        <td className="bulitRemove">{pro.productQunatity}</td>
                        {/*<td className="bulitRemove">{getCategoryName(pro.categoryId,category.categories)}</td>*/}
                        <td className="bulitRemove">{pro.categoryId}</td>
                        {/* <td className="bulitRemove"><img src='pro.productpictures.image[0]' alt="image here"/></td>*/}
                        <td className="bulitRemove">
                            <Button onClick={()=>handleShowedit(pro)} >edit</Button>

                            <Button style={{marginLeft:"10%"}} onClick={()=>handleshowdel(pro)} >delete</Button>
                        </td>
                    </tr>
                )):null}

                </tbody>

            </Table>
        )
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


    const handleShowedit=(pro)=>{
        console.log("edittttttttttttttttttttttttttttttttttttttt",pro)
        const production =pro
         // setProductdetails(production)
        setEditform(production)
        setShowedit(true)
        console.log("editform.....:",editform)
        // console.log("productdetails.....:",productdetails)
    }
    const handleCloseedit=()=>{
        const form=new FormData();

        form.append('_id',editform._id)
        form.append('productname',editform.productname);
        form.append('productprice',editform.productprice);
        form.append('productdescription',editform.productdescription);
        if(formData.categoryId != null) {
            form.append('categoryId', editform.categoryId);
        }
        form.append('productQunatity',editform.productQunatity);
        form.append('createdby',user._id)
        dispatch(editproduct(form))
        setShowedit(false)
    }
    const handleCloseeditno=()=>{
        setShowedit(false)
    }
    const inputHandlerEdit = (e) => {
        let  name=e.target.name;
        let value=e.target.value
        setEditform(pre=>({...pre,[name]:value}));

    };


    const rendereditmodel=()=>{

        if(showedit == true){
            return(
                <>
                    <Modal show={showedit} onHide={handleCloseeditno}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Info</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Row>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>product Name</Form.Label>
                                        <Form.Control type="productname" name="productname" onChange={inputHandlerEdit} placeholder="Enter product name" value={editform.productname} />
                                    </Form.Group>
                                    <Row>
                                        <div className="col 5">
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>product Price</Form.Label>
                                                <Form.Control type="number" name="productprice" onChange={inputHandlerEdit} placeholder="Enter price" value={editform.productprice}/>
                                            </Form.Group>
                                        </div>
                                        <div className="col 5">
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Product Quantity</Form.Label>
                                                <Form.Control type="number" name="productQunatity" onChange={inputHandlerEdit} placeholder="Enter product description"  value={editform.productQunatity}/>
                                            </Form.Group></div>
                                    </Row>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Product Description</Form.Label>
                                        <Form.Control type="name" name="productdescription" onChange={inputHandlerEdit} placeholder="Enter product description" value={editform.productdescription}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Product Category</Form.Label>
                                        <Form.Select  name="categoryId" onChange={inputHandlerEdit}>
                                            <option >{editform.categoryId}</option>
                                            {
                                                createcategoryList(category.categories).map(option=>  <option key={option.value} value={option.value} >{option.name}</option>)
                                            }
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label style={{fontWeight:"bold", marginTop:"5%",color:"red"}}>Pictures are not editable</Form.Label>
                                    </Form.Group>

                                    <Form.Label>images</Form.Label>


                                    {editform.productpictures.map(pic=>(

                                        <div className="imageSizing ">
                                            <img  src={pic.image} alt="no pic"/>
                                        </div>

                                    ))}
                                </Row>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleCloseedit}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )
        }else {
            console.log(null)
        }
    }





    const handleshowdel=(pro)=>{
        console.log("prooooooooooo",pro)
        setdelid(pro)
        setShowdel(true)
    }
    const closeHandleDel=()=>{
        console.log("eloooo",delid)
        dispatch(deleteproduct(delid))
        setShowdel(false)

    }
    const closeHandleDelnothing=()=>{
        setShowdel(false)
    }



    const renderdeleteproductmodel=()=>{
        return(
            <Modal show={showedel} onHide={closeHandleDelnothing}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Are you sure you want to delete this product </Form.Label>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={closeHandleDel}>
                        Save Changes
                    </Button>
                    <Button variant="primary" onClick={closeHandleDelnothing}>
                        Cancle
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }





    return(
        <>
            <Layout LeftNav></Layout>
            <div className="row" style={{marginTop:"2%"}}>
                <div className="col-8" style={{paddingLeft:"90%"}}>
                    <div className="Add">
                        <Button onClick={handleShow}>Add</Button>
                    </div>
                </div>
            </div>


            {/*add model*/}

            <div className="row">
                <div className="col-9 boarder" style={{marginLeft:"20%",marginTop:"1%"}}>
                    {renderTable()}
                </div>
            </div>
            {renderaddmodel()}
            {rendereditmodel()}
            {renderdeleteproductmodel()}
        </>
    )
}
export default Products
