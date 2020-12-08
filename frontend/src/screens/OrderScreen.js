import axios from 'axios';

import {PayPalButton} from 'react-paypal-button-v2';
import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import Message from '../components/Message';
import {Row,Col,ListGroup,Image,Card,Button} from 'react-bootstrap';



import Loader from '../components/Loader';

import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import {GetOrderDetails, payOrder,delivereOrder} from '../actions/orderActions';

const OrderScreen = ({match,history}) => {



     

  
    


    const orderId = match.params.id


    const [sdk,setSdk] = useState(false);


     const dispatch = useDispatch();


    
   

          




    const orderDetails = useSelector(state =>state.orderDetail)

    const {order,loading,error} = orderDetails;
       

    const user = useSelector(state =>state.userLogin)
     
    const{userInfo} = user
    
    
    
 
   
   const orderPay= useSelector(state =>state.orderPay)

   const {loading:loadingPay ,success:successPay} = orderPay;
 
   
   const orderDeliver= useSelector(state =>state.orderDeliver)

   const {loading:loadingDeliver ,success:successDeliver} = orderDeliver;
 
   if(!loading){

    if(order){

      order.itemPrice = order.orderItems.reduce((acc,item)=>{
        return acc + item.price * item.qty
    },0)

    if(orderId !== order._id){
        dispatch({type:'ORDER_DETAIL_RESET'})
    }

    }
   }
  
    


   useEffect(()=>{

    if(!userInfo){
        history.push('/login');
    }

        
       
    const addPayPalScript = async()=>{


        const {data: clientId} = await axios.get('/api/config/paypal');
    
        const script = document.createElement('script')
          
        script.type = 'text/javascript'

        script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}` 

        script.async = true

         script.onload = ()=>{

            setSdk(true)



         }


         document.body.appendChild(script);



    }

   

    
       


    if(!order || successPay || successDeliver){

        dispatch({type:'ORDER_PAY_RESET'})
        
        dispatch({type:'ORDER_DELIVER_RESET'})
        
        dispatch(GetOrderDetails(orderId)) 

           
       
 
    
    }else if(!order.isPaid){
        if(!window.paypal){
            addPayPalScript()
        }else{
            setSdk(true)
        }
    }
    

   return ()=>{
       dispatch({type:'ORDER_CREATE_RESET'})
     
   } 
       
    


   },[dispatch,orderId,successPay,order,successDeliver,history,userInfo])



   const successPaymentHandler = (paymentResult)=>{
     
    console.log(paymentResult);

    dispatch(payOrder(orderId,paymentResult))

}


  const deliverHandler = ()=>{

    dispatch(delivereOrder(order));

  }




return loading ? <Loader/> : error ? <Message variant="danger" >{error}</Message>: order ? <>


<h1>Order {order._id}</h1>


<Row>
    <Col md={8}>
        <ListGroup variant="flush">
         <ListGroup.Item>
             <h2>Shipping</h2>
<p>   <strong >name: {order.user.name}</strong> </p>

    <p>   
        <strong>Email:  </strong> 
<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
</p>

             <p>
                 <strong>
                    Address: 
                 </strong>
                 {order.shippingAddress.address},{order.shippingAddress.city} {order.shippingAddress.postalCode},{' '} {order.shippingAddress.country}
             </p>

             {order.isDelivered ? <Message variant='success'>is Delivered on {order.deliveredAt}</Message>: <Message variant="danger">not Delivered</Message>}
          


         </ListGroup.Item>

         <ListGroup.Item>
             <h2>Payment Method</h2>
             <p>
                   <strong>Method: </strong>
             {order.PaymentMethod}
             
             </p>

{order.paidAt ? <Message variant='success'>Paid on: {order.paidAt}</Message>: <Message variant="danger">not Paid</Message>}
           
         </ListGroup.Item>

         <ListGroup.Item>
             <h2>Order Items</h2>
             {order.orderItems.length === 0 ? <Message> Your Order is Empty</Message>:
              
             <ListGroup variant="flush">
                 {order.orderItems.map((item,index)=>
                     (<ListGroup.Item key={index}>
                         <Row>
                             <Col md={1}>
                                 <Image src={item.image} alt={item.name} fluid rounded/>
                             
                             </Col>
                             <Col>
                     <Link to={`/product/${item.product}`}>{item.name}</Link>
                             </Col>
                             <Col md={4}>
                               {item.qty} x ${item.price} = ${item.qty*item.price}
                             </Col>
                         </Row>

                     </ListGroup.Item>)
                  )}

             </ListGroup>

              
             
             }


         </ListGroup.Item>



        </ListGroup>
    </Col>
    <Col md={4}>
        <Card>
        <ListGroup.Item>
            <h2>Order Summary</h2>

        </ListGroup.Item>

        <ListGroup.Item>
            <Row>
                <Col>
                Items</Col>
            <Col>${order.itemPrice}</Col>
            </Row>
        </ListGroup.Item>

        <ListGroup.Item>
            <Row>
                <Col>
                Shipping</Col>
            <Col>${order.shippingPrice}</Col>
            </Row>
        </ListGroup.Item>

        <ListGroup.Item>
            <Row>
                <Col>
                Tax</Col>
            <Col>${order.taxPrice}</Col>
            </Row>
        </ListGroup.Item>

        <ListGroup.Item>
            <Row>
                <Col>
                Total</Col>
            <Col>${(order.taxPrice + order.shippingPrice + order.itemPrice).toFixed(2)}</Col>
            </Row>
            {!order.isPaid && (<ListGroup.Item>
                    {loadingPay && <Loader/>  }
                    {!sdk ? <Loader/>:(<PayPalButton
                    amount={(order.taxPrice + order.shippingPrice + order.itemPrice).toFixed(2)} onSuccess={successPaymentHandler}
                    
                    />) }
            </ListGroup.Item>)}
            
            {loadingDeliver && <Loader/>}

            {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                    <Button type='button' className="btn btn-block" onClick={deliverHandler}>
                        Mark As Deliver!
                    </Button>
                    </ListGroup.Item>
            )}
            </ListGroup.Item>
   



        
        
        
        
        </Card>
    </Col>
</Row>



    












</>:null
}

export default OrderScreen
