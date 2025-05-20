import React, { useEffect, useRef } from 'react';
import userChatStore from '../store/userChatStore';
import MessageSkeleton from './skelitons/MessageSkeleton';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import authStore from '../store/authStore';

const ChatContainer = () => {
  const { message, isMessagesLoading, selectedUser, getMessage, addMessage } = userChatStore();
  const { userAuth } = authStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessage(selectedUser._id);
      addMessage();
    }
  }, [selectedUser?._id,getMessage,addMessage]);

  useEffect(() => {
    if (message && messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);
  useEffect(()=>{},[message]);
  if (!userAuth?._id || !selectedUser?._id) {
  return <div className="flex items-center justify-center h-full">Loading...</div>;
}

  if (isMessagesLoading) {
    return (
      <div className="w-full h-full flex flex-col">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto">
          <MessageSkeleton />
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <ChatHeader />

      {/* Scrollable message section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {message.map((msg) => (
          <div
            key={msg._id}
            className={`chat ${msg.senderId === userAuth._id ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={msg.senderId === userAuth._id
                    ? userAuth.profilePic || "/avatar.png"
                    : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {msg.createdAt && new Date(msg.createdAt).toLocaleTimeString()}
              </time>
            </div>
            <div className="chat-bubble flex flex-col items-center justify-center text-center">
              {msg.image && (
                <img
                  src={msg.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2 mx-auto"
                />
              )}
              {msg.text && <p>{msg.text}</p>}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Input always at the bottom */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
