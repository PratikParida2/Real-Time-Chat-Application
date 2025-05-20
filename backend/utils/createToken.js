import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
const createToken=(res,id)=>
{
    const token=jwt.sign({id},process.env.SECREAT_KEY,{
      expiresIn:"30d"
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    
      return token;
}
export default createToken;