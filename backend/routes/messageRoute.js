import express from 'express'
import verifyToken from '../middleware/Authentication.js';
import {getmessage,getUsersForSideBar,sendMessage} from '../controller/messageController.js'
const messageRoute=express.Router();

messageRoute.get('/users',verifyToken,getUsersForSideBar);
messageRoute.get('/:id',verifyToken,getmessage)
messageRoute.post('/send/:id',verifyToken,sendMessage)
export default messageRoute;