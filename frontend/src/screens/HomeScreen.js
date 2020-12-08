
import React,{useEffect} from 'react'
import { Col, Row } from 'react-bootstrap';



import Product from '../components/Product'
import {useDispatch,useSelector} from 'react-redux';
import {getProductsList} from '../actions/productAction'; 
import Message from '../components/Message';
import Loader from '../components/Loader'; 
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import {Link} from 'react-router-dom';

const HomeScreen = ({match}) => {


  const keyword = match.params.keyword

  const pagenumber = match.params.pagenumber || 1




const dispatch = useDispatch()
const productList = useSelector((state)=>{

 return state.productList
  

})


const{loading,error,products,page,pages } = productList;


useEffect(()=>{
        
  
  dispatch(getProductsList(keyword,pagenumber))


   },[dispatch,keyword,pagenumber])


  
    return (
        <>
       <Meta/>
        {!keyword ? <ProductCarousel/>: <Link to='/' className='btn btn-light'>Go back!</Link>}
          <h1> Latest Products</h1>
          
    {loading ? <Loader/>: error ?<Message variant="danger" />:products.length > 0 ? 
          <Row>
            { products.map(product=>{

                    return <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                    
                  <Product product={product}/>
                    
                    
                    </Col>






            })}  
           
              
          </Row> : <h2 style={{textAlign:'center'}}>no Product Found!</h2> 
    
    
    

    }
     <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>     
        </>
    )
}

export default HomeScreen


