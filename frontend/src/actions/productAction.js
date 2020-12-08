import axios from 'axios';


export const getProductsList = (keyword='',pagenumber='')=>{

  return async (dispatch)=>{
         
    try{
        dispatch({type: 'PRODUCT_LIST_REQUEST'})
       
        const {data} = await axios.get(`/api/products?keyword=${keyword}&pagenumber=${pagenumber}`);

        dispatch({
            type: 'PRODUCT_LIST_SUCCESS',
            payload: data
        })
    
    }catch(err){
        dispatch({type:'PRODUCT_LIST_FAIL',
         payload: err.response && err.response.data.message ? err.response.data.message : err.message

    })
    }


  }






} 


export const listProductDetails = (id)=>{

  return async (dispatch)=>{
         
    try{
        dispatch({type: 'PRODUCT_DETAILS_REQUEST'})
       
        const {data} = await axios.get(`/api/products/${id}`);
      
        dispatch({
            type: 'PRODUCT_DETAILS_SUCCESS',
            payload: data
        })
    
    }catch(err){
        dispatch({type:'PRODUCT_DETAILS_FAIL',
         payload: err.response && err.response.data.message ? err.response.data.message : err.message

    })
    }


  }






} 


export const deleteProduct = (id)=>{

  return async (dispatch,getState)=>{

    const {userLogin} = getState();
         
    try{
        dispatch({type: 'PRODUCT_DELETE_REQUEST'})
       
         await axios.delete(`/api/products/${id}`,{
           headers:{
             Authorization : `Bearer ${userLogin.userInfo.token}`
           }
         });
      
        dispatch({
            type: 'PRODUCT_DELETE_SUCCESS',
           
        })
    
    }catch(err){
        dispatch({type:'PRODUCT_DELETE_FAIL',
         payload: err.response && err.response.data.message ? err.response.data.message : err.message

    })
    }


  }






} 

export const createProduct = ()=>{

  return async (dispatch,getState)=>{

    const {userLogin} = getState();
         
    try{
        dispatch({type: 'PRODUCT_CREATE_REQUEST'})
       
     const {data} = await axios.post(`/api/products/`,{},{
           headers:{
             Authorization : `Bearer ${userLogin.userInfo.token}`
           }
         });
      
        dispatch({
            type: 'PRODUCT_CREATE_SUCCESS',
            payload: data
           
        })
    
    }catch(err){
        dispatch({type:'PRODUCT_CREATE_FAIL',
         payload: err.response && err.response.data.message ? err.response.data.message : err.message

    })
    }


  }






} 

export const updateProduct = (product)=>{

  return async (dispatch,getState)=>{

    const {userLogin} = getState();
         
    try{
        dispatch({type: 'PRODUCT_UPDATE_REQUEST'})
       
     const {data} = await axios.put(`/api/products/${product._id}`,product,{
           headers:{
             Authorization : `Bearer ${userLogin.userInfo.token}`
           }
         });
      
        dispatch({
            type: 'PRODUCT_UPDATE_SUCCESS',
            payload: data
           
        })
    
    }catch(err){
        dispatch({type:'PRODUCT_UPDATE_FAIL',
         payload: err.response && err.response.data.message ? err.response.data.message : err.message

    })
    }


  }






} 



export const productReviewCreate = (productId,review)=>{

  return async (dispatch,getState)=>{

    const {userLogin} = getState();
         
    try{
        dispatch({type: 'PRODUCT_CREATE_REVIEW_REQUEST'})
       
     await axios.post(`/api/products/${productId}/reviews`,review,{
           headers:{
             Authorization : `Bearer ${userLogin.userInfo.token}`
           }
         });
      
        dispatch({
            type: 'PRODUCT_CREATE_REVIEW_SUCCESS',
            
           
        })
    
    }catch(err){
        dispatch({type:'PRODUCT_CREATE_REVIEW_FAIL',
         payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }


  }






} 


export const getTopProduct = ()=>{

  return async (dispatch)=>{

    
    try{
        dispatch({type: 'PRODUCT_TOP_RATED_REQUEST'})
       
   const {data} =  await axios.get(`/api/products/top`);
      
        dispatch({
            type: 'PRODUCT_TOP_RATED_SUCCESS',
            payload:data
            
           
        })
    
    }catch(err){
        dispatch({type:'PRODUCT_TOP_RATED_FAIL',
         payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }


  }






} 




