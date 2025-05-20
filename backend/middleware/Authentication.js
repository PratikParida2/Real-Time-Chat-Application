import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import userModel from '../models/userModel.js';
dotenv.config();
const verifyToken=async(req,res,next)=>
{
    
    try {
        const token=req.cookies.jwt;
       
        
        if(!token)
        {
           return res.status(401).json({message:"Unauthorized"});
        }
        const decodeToken=jwt.verify(token,process.env.SECREAT_KEY);
        console.log(decodeToken);
        
        if(!decodeToken)
            return res.status(401).json({message:"Unauthorized"});
        const user=await userModel.findById(decodeToken.id.id).select("-password");
        req.user=user;
        next()
    } 
    catch (error) {
        console.log(error);
    return res.status(501).json({message:"Internal Server Error"})
    }
}
export default verifyToken;