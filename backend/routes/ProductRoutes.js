import express from 'express';

const router = express.Router()

import {protect,isAdmmin} from '../middleWare/authMiddleWare.js';
import {getProducts,getProductbyId, DeleteProduct,UpdateProduct, CreateProduct,createProductReview, getTopProducts} from '../controllers/productController.js';

// Fetch all  products
router.route('/')
.get(getProducts)
.post(protect,isAdmmin,CreateProduct)   

router.route('/top').get(getTopProducts)

router.route('/:id/reviews')
.post(protect,createProductReview);
//get Products by id   
   router.route('/:id')
   .get(getProductbyId)
   .delete(protect,isAdmmin,DeleteProduct)
    .put(protect,isAdmmin,UpdateProduct)


     




   export default router;