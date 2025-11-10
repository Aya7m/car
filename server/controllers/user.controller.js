import { User } from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Car } from "../models/car.js";

// generate token

export const generateToken = async (userId) => {
  const payload = { userId };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" }); // ✅ التعديل هنا
};

export const registerUser=async(req,res)=>{
    try {
        
        const{name,email,password}=req.body;
        if(!name ||!email ||! password ||password.length<6){
            return res.json({success:false,message:'all fields is required'})
        }

        const existUser=await User.findOne({email})
        if(existUser){
            return res.json({success:false,message:'user is already exist'})
        }
        const hashPassword=await bcrypt.hash(password,10)
        const user=await User.create({
            name,
            email,
            password:hashPassword
        })

        const token=await generateToken(user._id.toString())
        res.json({success:true,token})

    } catch (error) {
        console.log(error.message);
        
        return res.json({success:false,message:error.message})
    }
}

// login

export const loginUser=async(req,res)=>{
    try {

        const{email,password}=req.body;
        // if user exist
        const userExist=await User.findOne({email})
        if(!userExist){
           return res.json({success:false,message:'user not found'})
        }

        const isMatched=await bcrypt.compare(password,userExist.password)
        if(!isMatched){
            return res.json({success:false,message:'invalid credentials'})
        }
        
        const token=await generateToken(userExist._id.toString())
        res.json({success:true,token})
    } catch (error) {
        console.log(error.message);
        return res.json({success:false,message:error.message})
    }
}
// get user data

export const getUserData=async(req,res)=>{
    try {
        
        const{user}=req;
        res.json({success:true,user})
    } catch (error) {
         console.log(error.message);
        return res.json({success:false,message:error.message})
    }
}

// get all cars to frontend

export const getAllCars=async(req,res)=>{
    try {
        
        const cars=await Car.find({isAvaliable:true})
        res.json({success:true,cars})
    } catch (error) {
         return res.json({success:false,message:error.message})
    }

}