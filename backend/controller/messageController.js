import { getReceiverSocketId } from "../lib/socket.js";
import messageModel from "../models/messageModel.js";
import userModel from "../models/userModel.js";
import {v2 as cloudinary} from 'cloudinary'
import { io } from "../lib/socket.js";

const getUsersForSideBar=async(req,res)=>
{
    try {
        const loginUserId=req.user._id;
        const otherUsers=await userModel.find({_id:{$ne:loginUserId}}).select("-password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"})
    }
}
const getmessage=async(req,res)=>{
    try {
        const receiverId=req.params.id;
        const myId=req.user._id;// Access user info set during token verification
        const message=await messageModel.find({
            $or:[{senderId:myId,receiverId:receiverId},{senderId:receiverId,receiverId:myId}]
        })
        return res.status(200).json(message);
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"})
    }
}

const sendMessage=async(req,res)=>
{
    try {
        const receiverId=req.params.id;
        const{text,image}=req.body;
        const senderId=req.user._id;// Access user info set during token verification
        //we add at authentication req.user=user when we verifyToken then we send it after that every one of use it like data passing
        let imageUrl;
        if(image)
        {
            const response=await cloudinary.uploader.upload(image);
            const urlOfImage=response.secure_url;
            imageUrl=urlOfImage;
        }
        const newMessage=await messageModel.create({
            senderId:senderId,
            receiverId:receiverId,
            text,
            image:imageUrl
        })
        const receiverSocketId=getReceiverSocketId(receiverId);
        if(receiverSocketId)
        {
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }
        return res.status(201).json(newMessage);
    } 
    catch (error) {
        console.log(error);
        return res.status(501).json({message:"Internal Server Error"})
    }
}
export {getmessage,getUsersForSideBar,sendMessage};