import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
const connectDB=async()=>
{
    try {
        await mongoose.connect(process.env.CONNECTION_STRING).then(()=>{console.log("Database Connected Succesfully")
        });
    } catch (error) {
        console.log("Error In Mongodb Connect");
        console.log(error);
        
    }
}
export default connectDB;