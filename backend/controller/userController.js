import userModel from "../models/userModel.js";
import validator from "validator";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import createToken from "../utils/createToken.js";
import cloudinary from "../middleware/cloudnary.js";
dotenv.config();
const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.json({ message: "Email Id Is Not Exist" });
    }
    const isPassword = await bcryptjs.compare(password, existingUser.password);
    const userData=await userModel.findOne({ email: email }).select("-password");
    if (isPassword) {
      const id=userData._id;
      const token = createToken(res, {id});
      return res.status(200).json({ message: "Login Successfully" ,userData});
    } else {
      console.log("line number 20 in login");
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json("Unauthorized");
  }
};
const Register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!validator.isEmail(email)) {
    return res.status(403).json({ message: "Please Enter Valid Email Id" });
  }

  try {
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res
        .status(401)
        .json({ message: "This Mail Id Is Already Existing" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    const newUser = await userModel.create({
      name: name,
      email: email,
      password: hashPassword,
    });
   
    const token=createToken(res,{id:newUser._id})
    return res
      .status(201)
      .json({ message: "User Registe Successfully" ,user:newUser});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const Logout = (req, res) => {
    try {
      res.clearCookie("jwt", {
        httpOnly: true,
        secure: false, // set to true if using HTTPS
        sameSite: "strict", // or "Strict" depending on your frontend/backend setup
      });
      return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.log(error);
      return res.status(501).json({message:"Internal Server Error"});
    }
};
const updateProfile=async(req,res)=>
{
    const {profilePic}=req.body;
    const userId=req.user._id;
    try {
      const user=await userModel.findById(userId);
      if(!user)
      {
        return res.status(401).json({message:"User Is Not Found"});
      }
      const cloudinaryResponse=(await cloudinary.uploader.upload(profilePic));
      const updatedUser=await userModel.findByIdAndUpdate(userId,{profilePic:cloudinaryResponse.secure_url},{new:true})
      return res.status(200).json({message:"Updated Successfully",user}); 
    } catch (error) {
      console.log(error);
      
      return res.status(501).json({message:"Internal Server Error"});
    }
}
const checkAuth=(req,res)=>{
try {
  return res.json(req.user);
} catch (error) {
  console.log(error);
  res.status(501).json({message:"Internal Server Error"});
}
}
export { Login, Register, Logout ,updateProfile,checkAuth};
