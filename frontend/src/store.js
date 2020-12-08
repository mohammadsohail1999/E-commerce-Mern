import {createStore,applyMiddleware,combineReducers} from 'redux';

import thunk from 'redux-thunk';

import {composeWithDevTools} from 'redux-devtools-extension';
import { productDeleteReducer, productDetailsReducer, productListReducer,productCreateReducer,productUpdateReducer, productReviewCreateReducer,productTopRatedReducer} from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import { UsersListReducer,userLoginReducer,userRegisterReducer,userDetailReducer,userUpdateProfileReducer,UserDeleteReducer,UserUpdateReducer} from './reducers/userReducers';
import {orderCreateReducer, orderDetailsReducer,orderPayReducer, GetOrderList,GetUserOrderList, orderDeliverReducer} from './reducers/orderReducer';



const reducer = combineReducers({

    productList : productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
     userDetails: userDetailReducer,
     userUpdateProfile: userUpdateProfileReducer,
     orderCreate: orderCreateReducer,
     orderDetail: orderDetailsReducer,
     orderPay: orderPayReducer,
     orderDeliver: orderDeliverReducer,
     orderList: GetOrderList,
     userList: UsersListReducer,
     userDelete: UserDeleteReducer,
     userUpdate: UserUpdateReducer,
     productDelete: productDeleteReducer,
     productCreate: productCreateReducer,
     productUpdate: productUpdateReducer,
     userOrderList: GetUserOrderList,
     productReviewCreate: productReviewCreateReducer,
     productTopRated: productTopRatedReducer

})








const cartItemFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: {
        cartItems: cartItemFromStorage,
         shippingAddress: shippingAddressFromStorage,
    },
    userLogin: {
        userInfo:userInfoFromStorage
    }
}

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(thunk)));


export default store; 

