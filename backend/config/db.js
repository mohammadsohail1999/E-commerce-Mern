import mongoose from 'mongoose';

const connectDb  = async (url)=>{

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || url,{
                 
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true



        })

        console.log(`MongoDb Connected: ${conn.connection.host}`.cyan.underline)

    } catch (error) {
        console.log(`Error: ${error}`.red.underline.bold)
    process.exit(1);
    }






}



export default connectDb;