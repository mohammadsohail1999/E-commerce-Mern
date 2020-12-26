import axios from 'axios';



export const login= (email,password)=> async(dispatch)=>{


    try{
        dispatch({
            type: 'USER_LOGIN_REQUEST'
        })
     
      const {data} = await axios.post('/api/users/login',{email,password}
         
      )

        
      dispatch({
          type: 'USER_LOGIN_SUCCESS',
          payload: data
      })


         localStorage.setItem('userInfo',JSON.stringify(data))


    }
       catch(err){
        dispatch({type:'USER_LOGIN_FAIL',
        payload: err.response && err.response.data.message ? err.response.data.message : err.message

       })  

}



}

export  const LogOut = () => (dispatch)=>{

localStorage.removeItem('userInfo')
localStorage.removeItem('cartItems')
localStorage.removeItem('shippingAddress')
localStorage.removeItem('paymentMethod')



dispatch({type: 'USER_LOGOUT'})
 dispatch({type: 'USER_LIST_RESET'})
  dispatch({type: 'ORDER_USERLIST_RESET'})
  dispatch({type:'USER_DETAILS_RESET'})

  document.location.href = '/login'

}

export const register= (name,email,password)=> async(dispatch)=>{


    try{
        dispatch({
            type: 'USER_REGISTER_REQUEST'
        })
     
      const {data} = await axios.post('/api/users',{name,email,password}
         
      )

        
      dispatch({
          type: 'USER_REGISTER_SUCCESS',
          payload: data
      })

      dispatch({
          type:'USER_LOGIN_SUCCESS',
          payload: data
      })

           localStorage.setItem('userInfo',JSON.stringify(data))


    }
       catch(err){ 
        dispatch({type:'USER_REGISTER_FAIL',
        payload: err.response && err.response.data.message ? err.response.data.message : err.message

       })  

}



}

export const getUserDetails= (id)=> async(dispatch,getState)=>{


    try{
        dispatch({
            type: 'USER_DETAILS_REQUEST'
        })

        const {userLogin} = getState()
     
      const {data} = await axios.get(`/api/users/${id}`,{
       headers:{
           'Authorization': `Bearer ${userLogin.userInfo.token}`
       } 
      }
         
      )

     

        
      dispatch({
          type: 'USER_DETAILS_SUCCESS',
          payload: data
      })

      

    }
       catch(err){ 
        dispatch({type:'USER_DETAILS_FAIL',
        payload: err.response && err.response.data.message ? err.response.data.message : err.message

       })  

}



}


export const updateUserProfile= (user)=> async(dispatch,getState)=>{


    try{
        dispatch({
            type: 'USER_UPDATE_PROFILE_REQUEST'
        })

        const {userLogin} = getState()
     
      const {data} = await axios.patch(`/api/users/profile`,user,{
       headers:{
           'Authorization': `Bearer ${userLogin.userInfo.token}`
       } 
      }
         
      )

      

        
      dispatch({
          type: 'USER_UPDATE_PROFILE_SUCCESS',
          payload: data
      })

      dispatch({
          type: 'USER_LOGIN_SUCCESS',
          payload: data
      })

      localStorage.setItem('userInfo',JSON.stringify(data))

      

    }
       catch(err){ 
        dispatch({type:'USER_UPDATE_PROFILE_FAIL',
        payload: err.response && err.response.data.message ? err.response.data.message : err.message

       })  

}


}



export const getUserList= ()=> async(dispatch,getState)=>{


    try{
        dispatch({
            type: 'USER_LIST_REQUEST'
        })

        const {userLogin} = getState()
     
      const {data} = await axios.get(`/api/users`,{
       headers:{
           'Authorization': `Bearer ${userLogin.userInfo.token}`
       } 
      }
         
      )

      

        
      dispatch({
          type: 'USER_LIST_SUCCESS',
          payload: data
      })

      

    }
       catch(err){ 
        dispatch({type:'USER_LIST_FAIL',
        payload: err.response && err.response.data.message ? err.response.data.message : err.message
 
       })  

}



}




export const UserDelete = (id)=> async(dispatch,getState)=>{


    try{
        dispatch({
            type: 'USER_DELETE_REQUEST'
        })

        const {userLogin} = getState()
     
       await axios.delete(`/api/users/${id}`,{
       headers:{
           'Authorization': `Bearer ${userLogin.userInfo.token}`
       } 
      }
         
      )

      

        
      dispatch({
          type: 'USER_DELETE_SUCCESS',
          
      })

      

    }
       catch(err){ 
        dispatch({type:'USER_DELETE_FAIL',
        payload: err.response && err.response.data.message ? err.response.data.message : err.message
 
       })  

}



}


export const UserUpdate = (user)=> async(dispatch,getState)=>{


    try{
        dispatch({
            type: 'USER_UPDATE_REQUEST'
        })

        const {userLogin} = getState()
     
    const {data} =   await axios.patch(`/api/users/${user._id}`,user,{
       headers:{
           'Authorization': `Bearer ${userLogin.userInfo.token}`
       } 
      }
          
      )

      

        
      dispatch({
          type: 'USER_UPDATE_SUCCESS',
          
      })
      dispatch({
          type: 'USER_DETAILS_SUCCESS',payload: data
      })
      dispatch({
        type: 'USER_UPDATE_PROFILE_SUCCESS',
        payload: data
    })

      dispatch({
          type: 'USER_DETAILS_RESET'
      })

      

    }
    catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === 'Not authorized, token failed') {
          dispatch(LogOut())
        }
        dispatch({
          type: 'USER_UPDATE_FAIL',
          payload: message,
        })
      }




}








