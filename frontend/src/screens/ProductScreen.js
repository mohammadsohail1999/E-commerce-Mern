import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import {Row,Col,Image,ListGroup,Card,Button, Form} from 'react-bootstrap';
import Rating from '../components/Rating';

import {useDispatch,useSelector}  from 'react-redux';
import { listProductDetails,productReviewCreate as ProductReviewCreate } from '../actions/productAction';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';




const ProductScreen = ({history,match}) => {

    const [qty,setQty] = useState(1);
    const [rating,setRating] = useState(0);
    const [comment,setComment] = useState('');

    

    



    const dispatch = useDispatch()
   
const productDetails = useSelector(state=> state.productDetails);
const {loading,error,product} = productDetails;


const user = useSelector(state=>state.userLogin);

const {userInfo} = user;



const productReviewCreate = useSelector(state=> state.productReviewCreate);
const {error:reviewError,success:successReview} = productReviewCreate;


const submitHandler = (e)=>{
    e.preventDefault()

    dispatch(ProductReviewCreate(match.params.id,{rating,comment}))

}


useEffect(()=>{

    if(successReview){
        alert('Review Submitted')
        setRating(0)
        setComment('')
        dispatch({type:'PRODUCT_CREATE_REVIEW_RESET'})

    }

        
   dispatch(listProductDetails(match.params.id));

 
   
 
 
    },[dispatch,match,successReview])
 

const addToCartHandler = ()=>{


 history.push(`/cart/${match.params.id}?qty=${qty}`)
 




}


    return (
      <>
      
      <Link to="/" className='btn btn-dark my-3'>Go back!</Link>
    
    {loading ? <Loader/>:error?<Message variant="danger">{error}</Message>:
    <>
    <Meta title={product.name} />
    <Row>
        <Col className="mb-2" md={6}>
         <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
        <ListGroup className='mb-2' variant="flush">
         <ListGroup.Item>

    <h3>{product.name}</h3>



         </ListGroup.Item>
        <ListGroup.Item>
      
      <Rating value={product.rating} text={`${product.numReviews} reviews`}/>



        </ListGroup.Item>
    

       <ListGroup.Item>
     
         Price: ${product.price}


       </ListGroup.Item>

       <ListGroup.Item >
         
         Description: {product.description}


       </ListGroup.Item>




        </ListGroup>
        
        </Col>
<Col md={3}>
    <Card>
        <ListGroup variant="flush">
            
            <ListGroup.Item>
                <Row>
                    <Col>
                    price:
                    </Col>
                    <Col>
    <strong>$ {product.price}</strong>
                    </Col>
                </Row>
            </ListGroup.Item>

            <ListGroup.Item>
                <Row>
                    <Col>
                    Status:
                    </Col>
                    <Col>
    <strong>{product.countInStock > 0 ?  'In Stock': 'Out of Stock'}</strong>
                    </Col>
                </Row>
            </ListGroup.Item>
         
         {product.countInStock > 0 && (
             <ListGroup.Item>
                 <Row>
                     <Col>
                       Qty
                     </Col>
                     <Col>
                     <Form.Control as='select' value={qty} onChange = {(e)=>{setQty(e.target.value)}}>
                         {[...Array(product.countInStock).keys()].map(x=>{
                         return   <option key={x+1}>
                             {x + 1}
                         </option>
                         })}
                     </Form.Control>
                     </Col>
                 </Row>
             </ListGroup.Item>
         )}
        

       <Button 
       onClick={addToCartHandler}
       className="btn-block p-2" type="button" disabled={product.countInStock=== 0}>
        ADD TO CART
       </Button>

        </ListGroup>
    </Card>
</Col>
 
    </Row>
    
    <Row>
      <Col md={6}>
          <h2> REVIEWS</h2>
          {product.reviews.length===0 && <Message>no Reviews</Message>}
         <ListGroup variant="flush">

             {product.reviews.map((review)=><ListGroup.Item>
                    
                    <strong>
                       {review.name} 
                    </strong>
                    <Rating  value={review.rating}/>
             <p>{review.createdAt.substring(0,10)}</p>
             <p>{review.comment}</p>

             </ListGroup.Item>)}

             <ListGroup.Item>
                 <h2>
                     Write a Customer Review
                 </h2>

             {reviewError && <Message variant='danger'>{reviewError}</Message>}

            {userInfo ? (<h1>
                <Form onSubmit={submitHandler}>
                   
                   <Form.Group controlId='rating'>
                       <Form.Label>
                           Rating
                       </Form.Label>
                      <Form.Control as='select' value={rating} onChange={(e)=>setRating(e.target.value)}>
                          <option value=''>Select...</option>
                          
                          <option value='1'>1-Poor</option>
                          
                          <option value='2'>2-Fair</option>
                          
                          <option value='3'>3-Good</option>
                          
                          <option value='4'>4-Very Good</option>
                          
                          <option value='5'>5-Excellent</option>
                          
                          </Form.Control> 
                   </Form.Group>
                   <Form.Group controlId='Comment'>
                       <Form.Label>Comment</Form.Label>
                       <Form.Control rows={3} onChange={e=>setComment(e.target.value)} as='textarea'>

                        </Form.Control>

                   </Form.Group>
               <Button type='submit' variant='primary'>Add Review</Button>

                </Form>
            </h1>) : <Message>Please <Link to='/login'>Sign in</Link>to write a review!</Message> }


             </ListGroup.Item>

         </ListGroup>
          </Col>  
    </Row>



  </>
   }
     </> 
    )
}

export default ProductScreen
