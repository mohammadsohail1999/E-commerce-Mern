import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Form,Button} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import Message from '../components/Message'
import Loader from '../components/Loader';
import {getUserDetails,UserUpdate} from '../actions/userActions';
import FormContainer from '../components/FormContainer';


const UserEditScreen = ({match,history}) => {
    
    const userId = match.params.id; 
    
    
    const [name,setname] = useState('')
    const [email,setEmail] = useState('')
    const [isAdmin,setIsAdmin] = useState(false)
   
  
   const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading,error,user} = userDetails
  
    const userUpdate = useSelector(state => state.userUpdate)
    const {loading:loadingUpdate,error:err,success:successUpdate} = userUpdate



  
    useEffect(()=>{
    
        if(successUpdate){
            dispatch({type:'USER_UPDATE_RESET'})
            history.push('/admin/userlist')

        }
        else{
             if(!user.name || user._id !== userId){

            dispatch(getUserDetails(userId))
        }
        else{
            setname(user.name)
            setEmail(user.email);
        
        }
 
        }
      
       
    },[user,dispatch,userId,successUpdate,history])




    const submitHandler = (e)=>{
        e.preventDefault();

        dispatch(UserUpdate({_id:userId,name,email,isAdmin}))
       
    }


    
    
    return (
        <>
        <Link to='/admin/userlist'>Go back!</Link>
    
       <FormContainer>
           <h1>Edit User</h1>
    {loadingUpdate && <Loader/>}
    {err && <Message variant='danger'>{err}</Message>}

    {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message>:(
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
            
    

            <Form.Group controlId='isAdmin'>
               
                <Form.Check type='checkbox' label="IsAdmin"  
                onChange={(e)=>setIsAdmin(e.target.checked)} checked={isAdmin}
                
                >
                 
                </Form.Check>
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

export default UserEditScreen
