import userChatStore from "../store/userChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = userChatStore();

  return (
    <div className="h-screen bg-slate-700 flex flex-col pt-16">
      {/* Main Chat Area */}
      <div className="flex flex-1 overflow-hidden ">
        <div className="bg-base-100 rounded-lg shadow-lg w-full flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 min-w-[250px] ">
            <Sidebar />
          </div>

          {/* Chat Section */}
          <div className="flex-1 overflow-y-auto pl-6">
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
