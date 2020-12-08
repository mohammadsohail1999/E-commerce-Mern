import asyncHandler from 'express-async-handler';

import Products from '../Models/productModel.js';


// Fetch all  products
export const getProducts = asyncHandler(async (req,res)=>{

    const pageSize = 10
    const page = Number(req.query.pagenumber) || 1 ;







    const keyword = req.query.keyword ? {
        name:{
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count =  await Products.countDocuments({...keyword})
    const products = await Products.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1))

       
    res.json({products,page,pages:Math.ceil(count/pageSize)});






})

export const getProductbyId = asyncHandler(async (req,res)=>{

    const product = await Products.findById(req.params.id)

    if(product){
     res.json(product);
   
    }
    else{
       res.status(404)
       throw new Error('Product not found')
    }




})


///Delete Products
//private Route admin 


export const DeleteProduct = asyncHandler(async (req,res)=>{

    const product = await Products.findById(req.params.id)

    if(product){
       await product.remove();
        
       res.json({message:'product removed!'})
   
    }
    else{
       res.status(404)
       throw new Error('Product not found')
    }




})


export const CreateProduct = asyncHandler(async (req,res)=>{

    

    const product = new Products({
        name: 'sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample Category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample decription'

    }) 


    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
     



})




export const UpdateProduct = asyncHandler(async (req,res)=>{



    const {name,price,description,image,brand,category,countInStock} = req.body

    const product = await Products.findById(req.params.id)

    if(product){

     product.name = name || product.name
     product.price = price || product.price
     product.description = description || product.description
     product.image = image || product.image
     product.brand = brand || product.brand
     product.category=category || product.category
     product.countInStock = countInStock || product.countInStock


    const updatedProduct = await product.save()

    res.json(updatedProduct);
     
    }else{
        res.status(404)
        throw new Error('Product not found!')
    }

    



})



//Post requuest Add reviews
//private 


export const createProductReview = asyncHandler(async (req,res)=>{



    const {rating,comment} = req.body

    const product = await Products.findById(req.params.id)

    if(product){
            
        const alreadyReviewed = product.reviews.find(r=>r.user.toString()===req.user._id.toString()) 

        if(alreadyReviewed){
            res.status(400)
            throw new Error('Product Already Reviewed')
        }
 

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id

             

        }

        product.reviews.push(review)
    
        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc,item)=>item.rating + acc,0)/product.reviews.length

        await product.save()


        res.status(201).json({message: 'Review Added'})

     
    }else{
        res.status(404)
        throw new Error('Product not found!')
    }

    



})


//Get Top rated products!!!!!



export const getTopProducts = asyncHandler(async (req,res)=>{


    const products = await Products.find({}).sort({rating: -1}).limit(3);


    res.json(products);
    



})



