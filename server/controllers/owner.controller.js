import imageKit from "../config/imagekite.js";
import { Booking } from "../models/booking.js";
import { Car } from "../models/car.js";
import { User } from "../models/user.js";
import fs from 'fs'


export const changeRoleToOwner=async(req,res)=>{
    try {
        
        const{_id}=req.user;
        await User.findByIdAndUpdate(_id,{role:'owner'})
        res.json({success:true,message:'Now You Can List Cars..'})
    } catch (error) {
       return res.json({success:false,message:error.message})
    }
}

// add car
export const addCar=async(req,res)=>{
    try {
        const{_id}=req.user;
        let car=JSON.parse(req.body.carData);

        // upload image to imageKit
        const imageFile=req.file;
        const fileBuffer=fs.readFileSync(imageFile.path)
        const response=await imageKit.upload({
            file: fileBuffer.toString("base64"),
            fileName:imageFile.originalname,
            folder:'/cars'
        })

        // optimaze imagekit url transformission
        var optimazeImageUrl=imageKit.url({
            path:response.filePath,
            transformation:[
                {width:'1280'},
                {quality:'auto'},
                {format:'webp'},
            ],

        })
        const image=optimazeImageUrl;
        await  Car.create({...car,owner:_id,image})
        return res.json({success:true,message:'car added..'})

    } catch (error) {
       return  res.json({success:false,message:error.message})
    }
}

// owners cars

export const getOwnerCars=async(req,res)=>{
    try {
        
        const{_id}=req.user;
        const cars=await Car.find({owner:_id})
        res.json({success:true,cars})
    } catch (error) {
         return  res.json({success:false,message:error.message})
    }
}

// toggle car avilability

export const toggleCarAvailability=async(req,res)=>{
    try {
        const{_id}=req.user;
        const{carId}=req.body;
        const car=await Car.findById(carId)

        // check if car belong to user or not
        if(car.owner.toString()!==_id.toString()){
            return res.json({success:false,message:'unAuthorize'})
        }
        car.isAvaliable=!car.isAvaliable;
        await car.save()
        res.json({success:true,message:'Available Toggle'})
    } catch (error) {
         return  res.json({success:false,message:error.message})
        
    }
}

export const deleteCar=async(req,res)=>{
     try {
        const{_id}=req.user;
        const{carId}=req.body;
        const car=await Car.findById(carId)

        // check if car belong to user or not
        if(car.owner.toString()!==_id.toString()){
            return res.json({success:false,message:'unAuthorize'})
        }
        car.isAvaliable=false;
        car.owner=null;

        await car.save()
        res.json({success:true,message:'car removed'})
    } catch (error) {
         return  res.json({success:false,message:error.message})
        
    }

}

export const getDashboardData=async(req,res)=>{
    try {
        
        const{_id,role}=req.user;
        if(role!=='owner'){
            return res.json({success:false,message:'Unauthorize'})
        }
        const cars=await Car.find({owner:_id})
        const bookings =await Booking.find({owner:_id}).populate('car').sort({createdAt:-1})

        const pendingBookings=await Booking.find({owner:_id,status:'pending'})
        const completeBookings=await Booking.find({owner:_id,status:'conformed'})

        // calculite monthly revuneu  from booking where status is conform
        const monthlyRevenue=bookings.slice().filter(booking=>booking.status==='conformed').reduce((acc,booking)=>acc+booking.price,0)

        const dashboardData={
            totalCars:cars.length,
            totalBookings:bookings.length,
            pendingBookings:pendingBookings.length,
            completeBookings:completeBookings.length,
            recentBookings:bookings.slice(0,3),
            monthlyRevenue

        }
         res.json({success:true,dashboardData})

    } catch (error) {
         return  res.json({success:false,message:error.message})
    }
}


// update user Image

export const updateUserImage = async (req, res) => {
  try {
    const { _id } = req.user;

    const imageFile = req.file;
    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload image to ImageKit
    const response = await imageKit.upload({
      file: fileBuffer.toString("base64"),
      fileName: imageFile.originalname,
      folder: "/users",
    });

    // استخدمي الرابط النهائي من response.url مباشرة
    const image = response.url;

    await User.findByIdAndUpdate(_id, { image });
    res.json({ success: true, message: "Image updated successfully" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};
