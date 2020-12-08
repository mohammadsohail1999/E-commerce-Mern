import asyncHandler from 'express-async-handler';
import Order from '../Models/orderModel.js';
import Orders from '../Models/orderModel.js';


 // create new order
// private


export const addOrderItems = asyncHandler(async(req,res)=>{


    const {orderItems
        ,shippingAddress
        ,paymentMethod
        ,itemsPrice
        ,taxPrice
        ,shippingPrice
        ,totalPrice} = req.body



   if(orderItems && orderItems.length===0){

      res.status(400)
      throw new Error('no order items')
        
      return


   }else{

    const order = new Orders({
        orderItems,
        user: req.user._id
        ,shippingAddress
        ,paymentMethod
        ,itemsPrice
        ,taxPrice
        ,shippingPrice
        ,totalPrice
    })

    const createdOrder = await  order.save();

    res.status(201).json(createdOrder);

   }






})




export const getOrderbyId = asyncHandler(async(req,res)=>{


  const order = await Order.findById(req.params.id).populate('user','name email');

  if(order){
      res.json(order)
  }else{
      res.status(404)
      throw new Error('Order not found')
  }




})



//update order to paid

export const updateOrdertopaid = asyncHandler(async(req,res)=>{


  const order = await Order.findById(req.params.id)

  if(order){
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.payer.email_address
      }

      const updatedOrder = await order.save();

      res.json(updatedOrder)

  }else{
      res.status(404)
      throw new Error('Order not found')
  }




})


//privte admin.....


export const updateOrdertoDelivered = asyncHandler(async(req,res)=>{


  const order = await Order.findById(req.params.id)

  if(order){
      order.isDelivered = true
      order.deliveredAt = Date.now()
     

      const updatedOrder = await order.save();

      res.json(updatedOrder)

  }else{
      res.status(404)
      throw new Error('Order not found')
  }




})


// show order on the screen 
//profile orders.....

export const getUserOrders = asyncHandler(async(req,res)=>{

 
  const orders = await Order.find({user: req.user._id})

  res.json(orders);



})


















//get all orders .....................
//private........


export const getMyOrders = asyncHandler(async(req,res)=>{


  const orders = await Order.find({}).populate('user','id name')

  res.json(orders);

  



})


