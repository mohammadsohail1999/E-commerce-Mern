import express from "express"
import products from "./data/products.js"
import dotenv from "dotenv"
import colors from "colors"
import productsRouter from './routes/ProductRoutes.js'
import userRouter from './routes/userRoutes.js';
import {errorHandler,notFound} from './middleWare/errorMiddleware.js';
import orderRoutes from './routes/OrderRoutes.js';
import connectDb from "./config/db.js";
import path from 'path';
import uploadRouter from './routes/uploadRoutes.js';
import morgan from 'morgan';
dotenv.config();

connectDb()
const app = express();


if(process.env.NODE_ENV === 'devlopment'){
    app.use(morgan('dev'))
}

app.use(express.json())



app.use('/api/products',productsRouter);

app.use('/api/users',userRouter);

app.use('/api/orders',orderRoutes);

app.use('/api/upload',uploadRouter); 

app.get('/api/config/paypal',(req,res)=> res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()

app.use('/uploads',express.static(path.join(__dirname,'/uploads')))


if(process.env.NODE_ENV==='production'){


    app.use(express.static(path.join(__dirname,'/frontend/build')))


    app.get('*',
    (req,res)=>res.sendFile(path.resolve(__dirname,'frontend','build','index.html')))



}else{
    app.get('/',(req,res)=>{
        res.send('Api is running....')
    })
}




app.use(notFound);

app.use(errorHandler);


const PORT  = process.env.PORT || 5000;
 



app.listen(PORT,

    console.log(`Server running on port ${process.env.NODE_ENV} mode on port ${PORT}  `.yellow.bold)
    
    
    )  