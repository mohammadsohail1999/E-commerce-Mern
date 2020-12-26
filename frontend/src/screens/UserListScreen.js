import React,{useEffect} from 'react';
import {LinkContainer} from 'react-router-bootstrap'
import {Table,Button} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import Message  from '../components/Message';
import Loader from '../components/Loader';
import {getUserList,UserDelete} from '../actions/userActions';  


const UserListScreen = ({history}) => {
    const dispatch = useDispatch();
  
    const userList = useSelector(state => state.userList);

    const {loading,err,users} =  userList
   
    const userLogin = useSelector(state => state.userLogin);

    const {userInfo} =  userLogin

    const userDelete = useSelector(state => state.userDelete);

    const {success: successDelete} =  userDelete

    const deletehandler = (id)=>{

        if(window.confirm('Are you sure ?')){


          dispatch(UserDelete(id))

   


        }
        
       

    }



    useEffect(()=>{

if(userInfo && userInfo.isAdmin){
    dispatch(getUserList())

}
else{
    history.push('/login')
}
        

 
    },[dispatch,history,userInfo,successDelete])




     

    return (
        <>
         <h1>Users</h1>
    {loading ? <Loader/> : err ? <Message variant='danger'>{err}</Message>:
    
    (<Table striped bordered hover responsive className="table-sm">
        <thead>
            <tr>
                <th>
                    ID
                </th>
                <th>
                name
                </th>
                <th>
                    Email
                </th>
                <th>
                    Admin
                </th>
            </tr>
        </thead>
<tbody>

{users.map((user)=>
<tr key={user._id}>
<td>{user.id}</td>
<td>{user.name}</td>
<td><a href={`mailto:${user.email}`}>{user.email}</a></td>
<td>{user.isAdmin ? <i className='fas fa-check' style={{color:'green'}}></i>: 

<i className="fas fa-times" style={{color:'red'}}></i>

}</td>
<td><LinkContainer to={`/admin/user/${user._id}/edit`}><Button variant='light' className='btn-sm'>
    
    <i className='fas fa-edit'></i>
    
    </Button></LinkContainer>
<Button variant='danger' className='btn-sm' onClick={() => deletehandler(user._id)}>
<i className='fas fa-trash'></i>
</Button>
</td>
</tr>


)}


</tbody>


    </Table>)
    
    
    }
                      
        </>
    )
}

export default UserListScreen
