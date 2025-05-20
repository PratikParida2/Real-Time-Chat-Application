import {create} from 'zustand'
import axiosInstance from '../lib/axios';
import { toast } from 'react-toastify';
import validator from 'validator'
import {io} from 'socket.io-client'
const BASE_URL=import.meta.env.VITE_BASE_URL;
const authStore=create((set,get)=>({
    userAuth:null,
    isSignUp:false,
    isLogin:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,
    register:async(formData)=>{
   if(!validator.isEmail(formData.email))
    {
      toast.error('Enter Valid Email Id');
      return;
    }
   if(!validator.isStrongPassword(formData.password))
   {
    toast.error("Enter A Strong Password")
    return ;
   }
    try {
      const response= await axiosInstance.post('/user/register',formData);
      console.log(response);
      if(response.status===201)
      {
        set({userAuth:response.data.user})
        get().socketConnect();
        toast.success("User Register Successfully");
      }
    } catch (error) {
      console.log(error);
      
    }
    },
    login:async(formData)=>{
        set({isLogin:true})
    try {
      const response=await axiosInstance.post('/user/login',formData);
      console.log(response);
      
     set({userAuth:response.data.userData})
     get().socketConnect();
     const updatedData=get().userAuth;
     console.log(updatedData);
     
      toast.success(response.data.message);
      
    } 
    catch (error) 
    {
      toast.error(error.response?.data?.message+"")
      console.log(error);
    }
    finally{
        set({isLogin:false})
    }
},
    checkAuth:async()=>{  

        try {
            const response=await axiosInstance.get('/user/check');
            set({userAuth:response.data})
            get().socketConnect();
        } catch (error) {
            console.log("Error In Checking Auth "+error);
            
            set({userAuth:null})
        }
        finally{
            set({isCheckingAuth:false})
        }
    },
    logout:async()=>{
        try {
            await axiosInstance.post('/user/logout');
            
            
            set({userAuth:null})
            get().socketDisconnet();
            toast.success("Logout Succesfully")
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    },
    updateProfile:async(imgData)=>{
        set({isUpdatingProfile:true})
        try {
            const response=await axiosInstance.put('user/update-profile',imgData);
            console.log(response);
            set({userAuth:response.data})
            toast.success("Profile Update Succesfully");
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message)
        }
        finally{
            set({isUpdatingProfile:false})
        }
    },
//     socketConnect:()=>{
//         const {userAuth}=get();
//         if(!userAuth || get().socket?.connected)
//             return;
//         const socketIo=io(BASE_URL,{ 
//             query:{
//                 userId:userAuth._id
//             }
//         });
//         socketIo.connect();
//         set({socket:socketIo});
//         socketIo.on('getOnlineUsers',(onlineUser)=>{
//             console.log(onlineUser);
//             set({onlineUsers:onlineUser})
//         })   
//     },
// socketDisconnet: () => {
//     get().socket.disconnect(); 
//     if (get().socket?.connected) {
//         get().socket.disconnect(); 
//     }}
socketConnect: () => {
    const { userAuth, socket } = get();
    if (!userAuth || socket) return;

    const socketIo = io(BASE_URL, {
        query: { userId: userAuth._id },
        withCredentials: true,
    });

    set({ socket: socketIo });

    socketIo.on('getOnlineUsers', (onlineUsers) => {
        console.log("Online users:", onlineUsers);
        set({ onlineUsers });
    });
},

socketDisconnet: () => {
    const socket = get().socket;
    if (socket && socket.connected) {
        socket.off(); // clean up all event listeners
        socket.disconnect();
        set({ socket: null, onlineUsers: [] });
    }
}
}))
export default authStore;