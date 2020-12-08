import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Form,Button,Row,Col} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import Message from '../components/Message'
import Loader from '../components/Loader';
import {register} from '../actions/userActions';
import FormContainer from '../components/FormContainer';

const RegisterScreen = ({location,history}) => {
    const [name,setname] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
   const[confirmPassword,setConfirmPassword] = useState('')
   
   const [message,setMessage] = useState(null)
   
   
   const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const {loading,error,userInfo} = userRegister



    const redirect = location.search ? location.search.split('=')[1] : '/'
     
    useEffect(()=>{
    
        if(userInfo){
            history.push('/')

        }

    },[history,userInfo,redirect])




    const submitHandler = (e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('PassWords do not match')
        }
        else{
        //dipatch Register
        dispatch(register(name,email,password))
        }
    }


    
    
    return (
       <FormContainer>
           <h1>Sign Up</h1>
    {message && <Message variant="danger">{message}</Message>}
    {error && <Message variant="danger">{error}</Message>}
    {loading && <Loader/>}
           <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>name</Form.Label>
                <Form.Control type='name' placeholder="Enter name" value={name}
                onChange={(e)=>setname(e.target.value)}
                
                >


                </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder="Enter Email" value={email}
                onChange={(e)=>setEmail(e.target.value)}
                
                >


                </Form.Control>
            </Form.Group>
            
         
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder="enter password" value={password}
                onChange={(e)=>setPassword(e.target.value)}
                
                >
                 
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='conformpassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' placeholder="Confirm password" value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                
                >
                 
                </Form.Control>
            </Form.Group>
             <Button type='submit' variant="primary">
                     Register
                  </Button>

          </Form>
        
           <Row className='py-3'>
           
           <Col>
           Have an Account ?{' '} <Link to={redirect ? `/login?redirect=${redirect}`:'/register'} >Login</Link>
           
           </Col>


           </Row>
        </FormContainer>
             
       
    )
}

export default RegisterScreen
