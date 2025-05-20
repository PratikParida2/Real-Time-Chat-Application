import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoute from './routes/userRoutes.js'
import connectDB from './databaseConnection.js'
import verifyToken from './middleware/Authentication.js'
import messageRoute from './routes/messageRoute.js'
import bodyParser from 'body-parser'
import { httpServer,io,app } from './lib/socket.js'
connectDB();

// If using body-parser
app.use(bodyParser.json({ limit: '10mb' })); // or more like '20mb'
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
app.use(cors({
    origin:'https://real-time-chat-application-frontend-sooty.vercel.app',
    credentials:true
}));
app.use(cookieParser());
dotenv.config();


app.get('/',(req,res)=>{
    res.send('<h1>Real Time Chat Application</h1>')
})

app.use('/api/user',userRoute);
app.use('/api/message',messageRoute);
httpServer.listen(process.env.PORT,()=>{
    console.log("Server Is Started At Port Number "+process.env.PORT);
})
