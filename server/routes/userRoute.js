import { Router } from "express";
import { getAllCars, getUserData, loginUser, registerUser } from "../controllers/user.controller.js";
import { protect } from "../middlewares/authUser.js";

const userRoute=Router()

userRoute.post('/register',registerUser)
userRoute.post('/login',loginUser)
userRoute.get('/data',protect,getUserData)
userRoute.get('/cars',getAllCars)
export default userRoute