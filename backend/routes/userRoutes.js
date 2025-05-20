import express from 'express'
const userRoute=express.Router();
import veryfyToken from '../middleware/Authentication.js';
import {Login,Register,Logout,updateProfile,checkAuth} from '../controller/userController.js'
userRoute.post('/login',Login);
userRoute.post('/register',Register);
userRoute.post('/logout',Logout);
userRoute.put('/update-profile',veryfyToken,updateProfile)
userRoute.get('/check',veryfyToken,checkAuth)
export default userRoute;