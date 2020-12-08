import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../Models/userModel.js';



export const protect = asyncHandler( async (req,res,next)=>{

let Token


if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
{
    console.log('token found')
}


try{
    Token = req.headers.authorization.split(' ')[1]

    const decoded = jwt.verify(Token,process.env.JWT_SECRET)

     
    req.user = await User.findById(decoded.id).select('-password');

    

next()


}catch(err){

    console.log(err)
    res.status(401)
    throw new Error('not authorised token failed!')


}










}

)




export const isAdmmin = (req,res,next)=>{



    if(req.user && req.user.isAdmin){
        console.log(req.user);
        next()
    }
    else{
        res.status(401)
            throw new Error('not authorized as admin')
        } 
    }







