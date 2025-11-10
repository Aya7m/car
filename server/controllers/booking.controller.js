
// check availbility of car

import { Booking } from "../models/booking.js"
import { Car } from "../models/car.js";

 const checkAvailability=async(car,pickupDate,returnDate)=>{
    const bookings= await Booking.find({
        car,
        pickupData:{$lte:returnDate},
        returnData:{$gte:pickupDate}
    })
    return bookings.length===0;
}

export const checkAvailabilityOfCar=async(req,res)=>{
    try {

        const{location,returnDate,pickupDate}=req.body;
        // fetch all availble cars for given location
        const cars=await Car.find({location,isAvaliable:true})
        // check avalability car for the given data rang using promis

        const availableCarPromess=cars.map(async(car)=>{
          const availabili=  await checkAvailability(car._id,pickupDate,returnDate)
          return {...car._doc,isAvaliable:availabili}
        })

        let availibleCars=await Promise.all(availableCarPromess)
        availibleCars=availibleCars.filter(car=>car.isAvaliable===true)
        res.json({success:true,availibleCars})
        
    } catch (error) {
        return res.json({success:false,message:error.message})
        
    }
}

// create booking

export const createBooking=async(req,res)=>{
    try {
        
        const{_id}=req.user;
    const{car,returnDate,pickupDate}=req.body;

    const isAvailable=await checkAvailability(car,pickupDate,returnDate)
    if(!isAvailable){
        return res.json({success:false,message:'car not available'})
    }
    const carData=await Car.findById(car)

    const picked=new Date(pickupDate);

    const returned=new Date(returnDate);

    const noOfDays=Math.ceil((returned-picked)/(1000*60*60*24))
    const price=carData.pricePerDay*noOfDays

    await Booking.create({car,owner:carData.owner,user:_id,pickupDate,returnDate,price})
    res.json({success:true,message:'booking created'})
    } catch (error) {
        return res.json({success:false,message:error.message})
        
    }
}

// get list of booking to user
export const getUserBooking=async(req,res)=>{
    try {
        
        const{_id}=req.user;
        const booking=await Booking.find({user:_id}).populate('car').sort({createdAt:-1})
        res.json({success:true,booking})
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}

// get owner booking

export const getOwnerBookings=async(req,res)=>{
    try {
        if(req.user.role!=='owner'){
            return res.json({success:false,message:'UnAuthorize'})
        }
        const booking=await Booking.find({owner:req.user._id}).populate('car user').select('-user.password').sort({createdAt:-1})
        res.json({success:true,booking})
        
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}

// change booking status

export const changeBookingStatus=async(req,res)=>{
    try {

        const{_id}=req.user;
        const{bookingId,status}=req.body;
        const booking=await Booking.findById(bookingId)

        if(booking.owner.toString()!==_id.toString()){
            return res.json({success:false,message:'UnAuthorized'})
        }
        booking.status=status;
        await booking.save()
        res.json({success:true,message:'status updated'})
        
    } catch (error) {
        console.log(error);
        
        res.json({success:false,message:error.message})
        
    }
}