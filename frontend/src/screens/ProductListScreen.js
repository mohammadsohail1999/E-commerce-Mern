import React,{useEffect} from 'react';
import {LinkContainer} from 'react-router-bootstrap'
import {Table,Button,Row,Col} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import Message  from '../components/Message';
import Loader from '../components/Loader';
import {getProductsList,deleteProduct,createProduct} from '../actions/productAction';  
import Paginate from '../components/Paginate';


const ProductListScreen = ({history,match}) => {
   
    const pagenumber = match.params.pagenumber || 1;
   

   
    const dispatch = useDispatch();
  
    const productList = useSelector(state => state.productList);

    const {loading,error:err,products,pages,page} =  productList
   
    const productDelete = useSelector(state => state.productDelete);

    const {loading:loadingDelete,error:errDelete,success} =  productDelete
   
    const userLogin = useSelector(state => state.userLogin);

    const {userInfo} =  userLogin
   
    const productCreate = useSelector(state => state.productCreate);

    const {product,success:successCreate,error:errorCreate,loading:loadingCreate} =  productCreate

  
    const createProductHandler = ()=>{
        dispatch(createProduct()) 
        

    }

    const deletehandler = (id)=>{

        if(window.confirm('Are you sure')){
            

          dispatch(deleteProduct(id));



        }
       

        }
        
       





    useEffect(()=>{
        dispatch({type:'PRODUCT_CREATE_RESET'})
if(!userInfo.isAdmin){
    history.push('/login')
}

if(successCreate){
    history.push(`/admin/product/${product._id}/edit`)
}
else{
    dispatch(getProductsList('',pagenumber))
}


        

 
    },[dispatch,history,userInfo,success,product,successCreate,pagenumber])




     

    return (
        <>
        <Row className="align-items-center">
            <Col>
            <h1>Products</h1>
            </Col>
            <Col className="text-right">
                <Button className="my-3" onClick={createProductHandler}>
                    <i className="fas fa-plus" >
                    
                    </i> Create Product
                 </Button>
            
            </Col>
        </Row>
        {loadingCreate && <Loader/> }
    {errorCreate && <Message variant="danger">{errorCreate}</Message>}
         
        {loadingDelete && <Loader/> }
    {errDelete && <Message variant="danger">{errDelete}</Message>}
         
    {loading ? <Loader/> : err ? <Message variant='danger'>{err}</Message>:
    
    (
    <>
    <Table striped bordered hover responsive className="table-sm">
        <thead>
            <tr>
                <th>
                    ID
                </th>
                <th>
                name
                </th>
                <th>
                    Price
                </th>
                <th>
                    Category
                </th>
                <th>
                brand
                </th>
            </tr>
        </thead>
<tbody>

{products.map((product)=>
<tr key={product._id}>
<td>{product._id}</td>
<td>{product.name}</td>
<td>${product.price}</td>
<td>{product.category}</td>
<td>{product.brand}</td>
<td><LinkContainer to={`/admin/product/${product._id}/edit`}><Button variant='light' className='btn-sm'>
      
    <i className='fas fa-edit'></i>
     
    </Button></LinkContainer>
<Button variant='danger' className='btn-sm' onClick={() => deletehandler(product._id)}>
<i className='fas fa-trash'></i>
</Button>
</td>
</tr>


)}


</tbody>


    </Table>

    <Paginate page={page} pages={pages} isAdmin={true}/>
    
    </>
    )
    
    
    }
                      
        </>
    )
}

export default ProductListScreen
