import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {Form,Button} from 'react-bootstrap'

import FormContainer from '../components/FormContainer';
import {saveShippingAddress } from  '../actions/cartActions'
import CheckOutSteps from '../components/CheckOutSteps';


const ShippingScreen = ({history}) => {
 
    const cart = useSelector(state=>state.cart);

    const {shippingAddress} = cart
 
    const [address,setAddress] = useState(shippingAddress.address)
    const [city,setCity] = useState(shippingAddress.city)
    const [postalCode,setPostalCode] = useState(shippingAddress.postalCode)
    const [country,setCountry] = useState(shippingAddress.country)
     
    const dispatch = useDispatch()

    const submitHandler = (e)=>{
        e.preventDefault()
        console.log('hello');
        dispatch(saveShippingAddress({address,city,postalCode,country}))
      history.push('/payment')
           
    } 


    return (
        <FormContainer>
            <CheckOutSteps step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
               <Form.Group>
                   <Form.Label>
                   address
                   </Form.Label>
                   <Form.Control
                   type="text"
                   placeholder="Enter address"
                   value={address}
                   required
                   onChange={(e)=>setAddress(e.target.value)}
                   >

                   </Form.Control>
                   
                   
                   
                   
                   </Form.Group> 

               <Form.Group>
                   <Form.Label>
                   City
                   </Form.Label>
                   <Form.Control
                   type="text"
                   placeholder="Enter City"
                   value={city}
                   required
                   onChange={(e)=>setCity(e.target.value)}
                   >

                   </Form.Control>
                   
                   
                   
                   
                   </Form.Group> 

               <Form.Group>
                   <Form.Label>
                   PostalCode
                   </Form.Label>
                   <Form.Control
                   type="text"
                   placeholder="Enter PostalCode"
                   value={postalCode}
                   required
                   onChange={(e)=>setPostalCode(e.target.value)}
                   >

                   </Form.Control>
                   
                   
                   
                   
                   </Form.Group> 

               <Form.Group>
                   <Form.Label>
                   Country
                   </Form.Label>
                   <Form.Control
                   type="text"
                   placeholder="Enter Country"
                   value={country}
                   required
                   onChange={(e)=>setCountry(e.target.value)}
                   >

                   </Form.Control>
                   
                   
                   
                   
                   </Form.Group> 
                   <Button type="submit" variant="primary">

                       Continue

                   </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
