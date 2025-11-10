import { Router } from "express";
import { protect } from "../middlewares/authUser.js";
import { addCar, changeRoleToOwner, deleteCar, getDashboardData, getOwnerCars, toggleCarAvailability, updateUserImage } from "../controllers/owner.controller.js";
import upload from "../middlewares/multer.js";

const ownerRoute=Router()

ownerRoute.post('/changeRole',protect,changeRoleToOwner)
ownerRoute.post('/add-car',upload.single('image'),protect,addCar)
ownerRoute.get('/cars',protect,getOwnerCars)
ownerRoute.post('/togle-avalib',protect,toggleCarAvailability)
ownerRoute.post('/delete-car',protect,deleteCar)
ownerRoute.get('/dashboard',protect,getDashboardData)
ownerRoute.post('/update-image',upload.single('image'),protect,updateUserImage)
export default ownerRoute