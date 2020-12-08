import React,{useEffect} from 'react'
import {Button,Row,Col,ListGroup,Image,Card} from 'react-bootstrap';

import {useDispatch,useSelector} from 'react-redux';
import Message from '../components/Message';


import CheckoutSteps from '../components/CheckOutSteps';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import {CreateOrder} from '../actions/orderActions';

const PlaceOrderScreen = (props) => {
  

    
    const cart = useSelector(state=> state.cart)
     const dispatch = useDispatch()

    cart.itemPrice = cart.cartItems.reduce((acc,item)=>{
        return acc + item.price * item.qty
    },0)
    
    cart.shippingPrice = cart.itemPrice > 100 ? 0 : 100
 
    const addDecimals = (num)=>{
        return (Math.round(num * 100)/100).toFixed(2);
    }
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemPrice).toFixed(2)))
    
    cart.totalPrice = (Number(cart.itemPrice) 
    + Number(cart.shippingPrice)
    + Number(cart.taxPrice)).toFixed(2);
    

    const orderCreate = useSelector(state =>state.orderCreate)

   const {order,success,error} = orderCreate;



   useEffect(()=>{
       if(success){
         
           props.history.push(`/order/${order._id}`)
       }
   },[props.history,success,order,dispatch])


  const placeOrderHandler = ()=>{
    


    dispatch(CreateOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.PaymentMethod,
        itemsPrice: cart.itemsPrice,
        
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,

    }))
 


}
    return (
        <>
<CheckoutSteps step1 step2 step3 step4/>

<Row>
    <Col md={8}>
        <ListGroup variant="flush">
         <ListGroup.Item>
             <h2>Shipping</h2>
             <p>
                 <strong>
                    Address: 
                 </strong>
                 {cart.shippingAddress.address},{cart.shippingAddress.city} {cart.shippingAddress.postalCode},{' '} {cart.shippingAddress.country}
             </p>
         </ListGroup.Item>

         <ListGroup.Item>
             <h2>Payment Method</h2>
             <strong>Method: </strong>
             {cart.PaymentMethod}
         </ListGroup.Item>

         <ListGroup.Item>
             <h2>Order Items</h2>
             {cart.cartItems.length === 0 ? <Message> Your cart is Empty</Message>:
             
             <ListGroup variant="flush">
                 {cart.cartItems.map((item,index)=>
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
            <Col>${cart.itemPrice}</Col>
            </Row>
        </ListGroup.Item>

        <ListGroup.Item>
            <Row>
                <Col>
                Shipping</Col>
            <Col>${cart.shippingPrice}</Col>
            </Row>
        </ListGroup.Item>

        <ListGroup.Item>
            <Row>
                <Col>
                Tax</Col>
            <Col>${cart.taxPrice}</Col>
            </Row>
        </ListGroup.Item>

        <ListGroup.Item>
            <Row>
                <Col>
                Total</Col>
            <Col>${cart.totalPrice}</Col>
            </Row>
            </ListGroup.Item>
        <ListGroup.Item>
            {error && <Message variant='danger'>{error}</Message>}
            
            </ListGroup.Item>    

<ListGroup.Item>
    <Button type='button' className="btn-block" disabled={cart.cartItems===0} onClick={placeOrderHandler}>Place Order!</Button>
</ListGroup.Item>

        
        
        
        
        </Card>
    </Col>
</Row>



        </>
    )
}

export default PlaceOrderScreen
