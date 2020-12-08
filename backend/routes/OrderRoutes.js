import express from 'express';

import {addOrderItems, getMyOrders,getOrderbyId, getUserOrders, updateOrdertoDelivered, updateOrdertopaid} from '../controllers/orderController.js'


import {protect,isAdmmin} from '../middleWare/authMiddleWare.js';

const router = express.Router();


router.route('/')
.post(protect,addOrderItems)
.get(protect,isAdmmin,getMyOrders)

router.route('/myorders').get(protect,getUserOrders);



router.route('/:id').get(protect,getOrderbyId)

router.route('/:id/pay').put(protect,updateOrdertopaid)

router.route('/:id/Deliver').put(protect,isAdmmin,updateOrdertoDelivered);



export default router