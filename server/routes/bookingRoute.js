import { Router } from "express";
import { changeBookingStatus, checkAvailabilityOfCar, createBooking, getOwnerBookings, getUserBooking } from "../controllers/booking.controller.js";
import { protect } from "../middlewares/authUser.js";

const bookingRouter=Router()

bookingRouter.post('/check-availibility',checkAvailabilityOfCar)
bookingRouter.post('/create',protect,createBooking)
bookingRouter.get('/user',protect,getUserBooking)
bookingRouter.get('/owner',protect,getOwnerBookings)
bookingRouter.post('/change-status',protect,changeBookingStatus)

export default bookingRouter