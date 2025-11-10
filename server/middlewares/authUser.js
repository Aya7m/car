import { User } from "../models/user.js";
import jwt from 'jsonwebtoken'

export const protect=async(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token){
         
        return res.json({success:false,message:"not-authorized"})
    }

    try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ استخدمي verify مش decode

    const user = await User.findById(decoded.userId).select("-password"); // ✅ استخدمي decoded.userId
    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: "not-authorized" });
  
    }
}