import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Form,Button} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import Message from '../components/Message'
import Loader from '../components/Loader';
import {listProductDetails,updateProduct} from '../actions/productAction';
import FormContainer from '../components/FormContainer';

import axios from 'axios';

const ProductEditScreen = ({match,history}) => {
    
    const productId = match.params.id; 
    
    
    const [name,setname] = useState('')
    const [price,setPrice] = useState(0)
    const [image,setImage] = useState('')
    
    const [brand,setbrand] = useState('')
    const [countInStock,setCountInStock] = useState(0)
    const [category,setCategory] = useState('')
    
    const [description,setDescription] = useState('')
    
    const [upload,setUpload] = useState(false) 
   
  
   const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading,error,product} = productDetails
  
    const productUpdate = useSelector(state => state.productUpdate)
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate} = productUpdate
  
   


  
    useEffect(()=>{
    
        if(successUpdate){
            dispatch({type:'PRODUCT_UPDATE_RESET'})
            history.push('/admin/productlist')
        }
        else{
             if(!product.name || product._id !== productId){
 
            dispatch(listProductDetails(productId))
        }
        else{
              
            setname(product.name);
            setPrice(product.price);
            setCountInStock(product.countInStock);
            setDescription(product.description);
            setbrand(product.brand);
            setImage(product.image);
            setCategory(product.category);
        
    
            
        
        }
 
    } 
      
       
    },[productId,dispatch,product,history,successUpdate])


    const uploadFilehandler = async(e)=>{
     const file = e.target.files[0]
     const formData = new FormData()
     formData.append('image',file)
     setUpload(true)

     try {

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        } 


        const {data} = await axios.post('/api/upload',formData,config)
       
        setImage(data);
        setUpload(false);
        
     } catch (error) {

        console.error(error);
        setUpload(false);
         
     }

    }




    const submitHandler = (e)=>{
        e.preventDefault();

        dispatch(updateProduct({
            _id: productId,
            name: name,
            price,
            image,
            brand,
            countInStock,
             description,
             category

        }))
        
    }


    
    
    return (
        <>
        <Link to='/admin/productlist'>Go back!</Link>
    
       <FormContainer>
           <h1>Edit Product</h1>

  {loadingUpdate && <Loader/>}  
    {errorUpdate && <Message variant="red">{errorUpdate}</Message>}
 
    {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message>:(
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>name</Form.Label>
                <Form.Control type='name' placeholder="Enter name" value={name}
                onChange={(e)=>setname(e.target.value)}
                
                >


                </Form.Control>
            </Form.Group>

            <Form.Group controlId='Price'>
                <Form.Label>Price  </Form.Label>
                <Form.Control type='number' placeholder="Enter Price" value={price}
                onChange={(e)=>setPrice(e.target.value)}
                
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
                <Form.Label>Upload Image  </Form.Label>
                <Form.Control type='text' placeholder="Enter Image Url" value={image}
                onChange={(e)=>setImage(e.target.value)}
                
                ></Form.Control>
                <Form.File id='image-file' label='Choose-file' custom onChange={uploadFilehandler}>

                </Form.File>
               
               {upload && <Loader/>}


            </Form.Group>
            <Form.Group controlId='brand'>
                <Form.Label>brand</Form.Label>
                <Form.Control type='text' placeholder="Enter brand" value={brand}
                onChange={(e)=>setbrand(e.target.value)}
                
                ></Form.Control>
            </Form.Group>


            <Form.Group controlId='CountInstock'>
                <Form.Label>CountInStock</Form.Label>
                <Form.Control type='number' placeholder="Enter CountInstock" value={countInStock}
                onChange={(e)=>setCountInStock(e.target.value)}
                
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='Category'>
                <Form.Label>Category</Form.Label>
                <Form.Control type='text' placeholder="Enter Category" value={category}
                onChange={(e)=>setCategory(e.target.value)}
                
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control type='text' placeholder="Enter Description" value={description}
                onChange={(e)=>setDescription(e.target.value)}
                
                ></Form.Control>
            </Form.Group>
            

             <Button type='submit' variant="primary">
                     Update
                  </Button>

          </Form>
    )}
           
        
           
        </FormContainer>
        </>     
       
    )
}

export default ProductEditScreen
