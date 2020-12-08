import axios from 'axios';

export const CreateOrder = (order)=> async(dispatch,getState)=>{


    try{
        dispatch({
            type:'ORDER_CREATE_REQUEST',

        })
        const {userLogin:{userInfo}} = getState()
        

        const  {data} = await axios.post('/api/orders',order,{

            headers:{
               Authorization: `Bearer ${userInfo.token}`

            }
            
        })
        dispatch({type: 'ORDER_CREATE_SUCCESS',
    payload: data
    })



    }catch(error){
       dispatch({ 
        type: 'ORDER_CREATE_FAIL',
        payload: error.response && error.response.data.message ? error.response.data.message : error.message 
       })




    }







}


export const GetOrderDetails = (orderId)=> async(dispatch,getState)=>{


    try{
        dispatch({
            type:'ORDER_DETAIL_REQUEST',

        })
        const {userLogin:{userInfo}} = getState()
        

        const  {data} = await axios.get(`/api/orders/${orderId}`,{

            headers:{
               Authorization: `Bearer ${userInfo.token}`

            }
            
        })
        dispatch({type: 'ORDER_DETAIL_SUCCESS',
    payload: data
    })

    



    }catch(error){
       dispatch({ 
        type: 'ORDER_DETAIL_FAIL',
        payload: error.response && error.response.data.message ? error.response.data.message : error.message 
       })




    }







}






export const payOrder = (orderId,paymentResult)=> async(dispatch,getState)=>{


    try{
        dispatch({
            type:'ORDER_PAY_REQUEST',

        })
        const {userLogin:{userInfo}} = getState()
        

        const  {data} = await axios.put(`/api/orders/${orderId}/pay`,paymentResult,{

            headers:{
               Authorization: `Bearer ${userInfo.token}`,
             

            }
            
        })
        dispatch({type: 'ORDER_PAY_SUCCESS',
    payload: data
    })



    }catch(error){
       dispatch({ 
        type: 'ORDER_PAY_FAIL',
        payload: error.response && error.response.data.message ? error.response.data.message : error.message 
       })




    }







}



export const delivereOrder = (order)=> async(dispatch,getState)=>{


    try{
        dispatch({
            type:'ORDER_DELIVER_REQUEST',

        })
        const {userLogin:{userInfo}} = getState()
        

        const  {data} = await axios.put(`/api/orders/${order._id}/deliver`,{},{

            headers:{
               Authorization: `Bearer ${userInfo.token}`,
             

            }
            
        })
        dispatch({type: 'ORDER_DELIVER_SUCCESS',
    payload: data
    })



    }catch(error){
       dispatch({ 
        type: 'ORDER_DELIVER_FAIL',
        payload: error.response && error.response.data.message ? error.response.data.message : error.message 
       })




    }







}




export const getMyOrders = ()=> async(dispatch,getState)=>{


    try{
        dispatch({
            type:'ORDER_LIST_REQUEST',

        })
        const {userLogin:{userInfo}} = getState()
        

        const  {data} = await axios.get(`/api/orders/`,{

            headers:{
               Authorization: `Bearer ${userInfo.token}`,
             

            }
            
        })
        dispatch({type: 'ORDER_LIST_SUCCESS',
    payload: data
    })



    }catch(error){
       dispatch({ 
        type: 'ORDER_LIST_FAIL',
        payload: error.response && error.response.data.message ? error.response.data.message : error.message 
       })




    }







}

export const getUserOrders = ()=> async(dispatch,getState)=>{


    try{
        dispatch({
            type:'ORDER_USERLIST_REQUEST',

        })
        const {userLogin:{userInfo}} = getState()
        

        const  {data} = await axios.get(`/api/orders/myorders`,{

            headers:{
               Authorization: `Bearer ${userInfo.token}`,
             

            }
            
        })
        console.log(data);
        dispatch({type: 'ORDER_USERLIST_SUCCESS',
         payload: data
    })



    }catch(error){
       dispatch({ 
        type: 'ORDER_USERLIST_FAIL',
        payload: error.response && error.response.data.message ? error.response.data.message : error.message 
       })




    }







}




