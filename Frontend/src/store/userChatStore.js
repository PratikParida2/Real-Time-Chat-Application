import {create} from 'zustand'
import {toast} from 'react-toastify'
import axiosInstance from '../lib/axios';
import authStore from './authStore';
 const userChatStore=create((set,get)=>({
    message:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessagesLoading:false,
    getUsers:async()=>{
        set({isUserLoading:true})
        try {
            const response=await axiosInstance.get('/message/users');
            set({users:response.data})
            console.log(response);
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error);
        }
        finally{
            set({isUserLoading:false})
        }
    },
    getMessage:async(userId)=>{
        set({isMessagesLoading:true})
        try {
            const response=await axiosInstance.get(`/message/${userId}`)
            set({message:response.data})
        } catch (error) {
            // console.log(error);
            toast.error(error.response?.data?.message);
        }
        finally{
            set({isMessagesLoading:false})
        }
    },
    sendMessage:async(messageData)=>{
        const {message,selectedUser}=get();
        try {
            const response=await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData)
            set({message:[...message,response.data]})

        } 
        catch (error) 
        {
            toast.error(error.response?.data?.message);
        }
    },
    addMessage:()=>{
        const {selectedUser}=get();
        if(!selectedUser)
            return;
        const socket=authStore.getState().socket;
        socket.on("newMessage",(newMessage)=>{
            if(newMessage.senderId!==selectedUser._id)
                return ;
            
            set({message:[...get().message,newMessage]})
        })
    },
    unSubscribeToMessage:()=>{
        const socket=authStore.getState().socket;
        socket.off('newMessage');
    },
    setSelectedUser:(selectedUser)=>set({selectedUser})
}))
export default userChatStore;