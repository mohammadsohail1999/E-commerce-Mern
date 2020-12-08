import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import {Container} from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen'
import {BrowserRouter, Route} from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
 
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen'; 
import PlaceOrderScreen from './screens/PlaceOrderScreen'; 
import OrderScreen from './screens/OrderScreen';  
import UserListScreen from './screens/UserListScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';

import UserEditScreen from './screens/UserEditScreen';
import OrderListScreen from './screens/OrderListScreen';

const  App  = ()=>{



return <>
<BrowserRouter>
<Header/>
<main className="py-3">
    
<Container>

<Route path='/search/:keyword' exact component={HomeScreen}/>  
<Route path='/' exact component={HomeScreen} />  

<Route path='/page/:pagenumber' exact component={HomeScreen} />  
<Route path='/seacrh/:keyword/page/:pagenumber' exact component={HomeScreen} />  

<Route path='/Shipping' exact component={ShippingScreen}/> 
<Route path='/Payment' exact component={PaymentScreen}/> 
<Route path='/Placeorder' exact component={PlaceOrderScreen}/> 
<Route path='/order/:id' exact component={OrderScreen}/> 

<Route path='/login' exact component={LoginScreen}/> 
<Route path='/register' exact  component={RegisterScreen}/> 
<Route path='/profile' exact  component={ProfileScreen}/> 

<Route path='/product/:id' exact component={ProductScreen}/> 

<Route path='/cart/:id?' component={CartScreen}/>

<Route path='/admin/userlist' component={UserListScreen}/>
<Route path='/admin/productlist' exact component={ProductListScreen}/>
<Route path='/admin/productlist/:pagenumber' exact component={ProductListScreen}/>


<Route path='/admin/orderList' component={OrderListScreen}/>

<Route path='/admin/user/:id/edit' component={UserEditScreen}/>
 
 <Route path='/admin/product/:id/edit' component={ProductEditScreen}/>
  


</Container>



</main>
<Footer/>
</BrowserRouter>
</> 





}




export default App