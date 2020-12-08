import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {Form,Button,Col} from 'react-bootstrap'
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {savePaymentMethod} from  '../actions/cartActions'
import CheckOutSteps from '../components/CheckOutSteps';


const PaymentScreen = ({history}) => {
 
    const cart = useSelector(state=>state.cart);

    const {shippingAddress} = cart
    
    if(!shippingAddress){
        history.push('/shipping')
    }
     
   const [paymentMethod,setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch()

    const submitHandler = (e)=>{
        e.preventDefault()
        console.log('hello');
        dispatch(savePaymentMethod(paymentMethod))
      history.push('/placeorder')
           
    } 


    return (
        <FormContainer>
            <CheckOutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>

<Form.Group>
    <Form.Label as="legend" >
        Select Method
    </Form.Label>

<Col>
<Form.Check type='radio' label="PayPal or Credit Card" id="PayPal" name="paymentMethod" value="PayPaL" checked onChange={(e)=>{setPaymentMethod(e.target.value)}}>
    
</Form.Check>
<Form.Check type='radio' label="Stripe" id="Stripe" name="paymentMethod" value="Stripe"  onChange={(e)=>{setPaymentMethod(e.target.value)}}>

</Form.Check>
</Col>
</Form.Group>
                   <Button  type="submit" variant="primary">

                       Continue

                   </Button>
            </Form>
        </FormContainer>
    )
}




export default PaymentScreen
