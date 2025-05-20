import { useState } from "react";
import useAuthStore from "../store/authStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { userAuth, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [name, setName] = useState(userAuth?.name || "");
  const [email, setEmail] = useState(userAuth?.email || "");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-100/80 px-4 py-10">
      <div className="w-full max-w-md bg-slate-800 rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-center text-white">Profile</h2>
        <p className="text-sm text-center text-gray-300">Your profile information</p>

        <div className="flex justify-center">
          <div className="relative w-28 h-28 group">
            <img 
              src={selectedImg || userAuth?.profilePic || "/avatar.png"}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-slate-400 shadow-md"
            />
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-slate-900 p-2 rounded-full cursor-pointer hover:bg-slate-700 transition-all"
            >
              <Camera className="w-4 h-4 text-white" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm text-white font-medium mb-1">
              <User className="w-4 h-4" />
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Full Name"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm text-white font-medium mb-1">
              <Mail className="w-4 h-4" />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Email"
            />
          </div>
        </div>

        <div className="text-sm text-white mt-6 border-t border-slate-600 pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Member Since</span>
            <span>{userAuth?.createdAt?.split("T")[0] || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span>Account Status</span>
            <span className="text-green-500 font-semibold">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
