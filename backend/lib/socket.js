import {Server} from 'socket.io'
import express from 'express'
import http from 'http'
const app=express();
const httpServer=http.createServer(app);
const io=new Server(httpServer,
{
    cors:{
        origin:["http://localhost:7050","https://real-time-chat-application-frontend-olive.vercel.app"],
        credentials:true
    }
}
)

//use for online users
const userSocketMap={};

export function getReceiverSocketId(userId){
    return userSocketMap[userId];
}

io.on('connection', (socket) => {
    console.log("Connection Is Established");
    
    const userId=socket.handshake.query?.userId;
    if(userId)
    {
        userSocketMap[userId]=socket.id;
        console.log(userSocketMap);
        
    }
    io.emit("getOnlineUsers",Object.keys(userSocketMap))
    // Handle disconnect automatically when the socket disconnects
    socket.on('disconnect', () => {
        console.log("Disconnected");
        delete userSocketMap[userId];
        io.emit('getOnlineUsers',Object.keys(userSocketMap))
    });
})
export {app,httpServer,io} ;