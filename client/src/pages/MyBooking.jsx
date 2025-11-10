import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyBooking = () => {
  const [bookings, setBooking] = useState([]);

  const{axios,user,currency}=useAppContext();
  
  const fetchBookingData = async () => {
    try {
      
      const { data } = await axios.get("/api/booking/user");
      if (data.success) {
        setBooking(data.booking);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      
    }
    
  };

  useEffect(() => {
   user && fetchBookingData();
  }, [user]);
  return (
    <div className="max-w-7xl mt-24 text-sm lg:px-24 xl-px-32 2xl:px-48">
      <Title
        title={"My Bookings"}
        subTitle={"View and manage your car bookings"}
        align={"left"}
      />

      <div>
        {bookings.map((booking, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first-mt-12"
          >
            {/* car image and info */}
            <div className="md:col-span-1">
              <div className="rounded-md overflow-hidden mb-4">
                <img
                  src={booking.car.image}
                  alt="w-full h-auto object-cover aspect-video"
                />
              </div>
              <p>
                {booking.car.brand}
                {booking.car.model}
              </p>
              <p>
                {booking.car.year} . {booking.car.category}.
                {booking.car.location}
              </p>
            </div>
            {/* booking info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <p className="px-3 py-1.5 bg-light rounded">
                  Booking #{index + 1}
                </p>
                <p
                  className={`px-3 py-1 text-xs rounded-full ${
                    booking.status === "confirmed"
                      ? "bg-green-400/15 text-green-600"
                      : "bg-red-400/15 text-red-600"
                  }`}
                >
                  {booking.status}
                </p>
              </div>

              <div className="flex items-start gap-2 mt-3">
                <img
                  src={assets.calendar_icon_colored}
                  alt="calender"
                  className="w-4 h-4 mt-1"
                />
                <div>
                  <p className="text-gray-500">Rental Period</p>
                  <p>
                    {booking?.pickupDate?.split("T")[0]} To{" "}
                    {booking?.returnDate?.split("T")[0]}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 mt-3">
                <img
                  src={assets.location_icon_colored}
                  alt="calender"
                  className="w-4 h-4 mt-1"
                />
                <div>
                  <p className="text-gray-500">Pickup - Location</p>
                  <p>{booking.car.location}</p>
                </div>
              </div>

               
            </div>

            {/* price */}

            <div className="md:col-span-1 flex flex-col justify-between gap-6">
                <div className="text-sm text-gray-500 text-right">
                    <p>Total Price</p>
                    <h1 className="text-primary font-semibold text-2xl">{currency}{booking.price}</h1>
                    <p>Booked on {booking.createdAt.split('T')[0]}</p>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooking;
