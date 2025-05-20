import { useRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import authStore from '../store/authStore';
const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate()
  const {register} =authStore();
  const [formData,setFormData]=useState({
    name:'',
    email:'',
    password:''
  })
  const handleChange=(e)=>{
    setFormData((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    register(formData);
   }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-slate-800">Register to ChatApp</h2>
        <form onSubmit={handleSubmit}  className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2  text-black"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-black"
              placeholder="you@example.com"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword?'text':'password'}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-2  text-black"
              placeholder="********"
            />
            <div
              className="absolute right-3 top-10 cursor-pointer text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-slate-800 text-white py-3 rounded-lg font-semibold hover:bg-slate-900 transition cursor-pointer"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center text-gray-500">
          Already have an account? <span className="text-indigo-600 cursor-pointer hover:underline cursor-pointer" onClick={()=>{navigate('/login')
          }}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
