import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import {delay, motion} from 'motion/react'
const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const{pickupDate,returnDate,setPickupDate,setReturnDate,navigate}=useAppContext()
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    navigate(`/cars?pickupLocation=${pickupLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}`);
  }

  return (
    <motion.div
    initial={{y:50,opacity:0}}
    animate={{y:0,opacity:1}}
    transition={{duration:0.5,ease:'easeInOut'}}
    
    className="h-screen flex flex-col items-center justify-center">
      <motion.h1
      initial={{y:50,opacity:0}}
      animate={{y:0,opacity:1}}
      transition={{duration:0.8,delay:0.2,ease:'easeInOut'}}
       className="text-4xl md:text-5xl font-semibold">
        Luxury Cars on Rent
      </motion.h1>
      <motion.form
      initial={{y:50,opacity:0}}
      animate={{y:0,opacity:1}}
      transition={{duration:0.8,delay:0.4,ease:'easeInOut'}}
       onSubmit={handleSearch} className="flex flex-col md:flex-row items-start md:items-center justify-between mt-7 p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)]">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
          <div className="flex flex-col items-center gap-2">
            <select
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            >
              <option value="">Pickup Location</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <p className="text-gray-500 text-sm px-1">
              {pickupLocation ? pickupLocation : "Please Select Location"}
            </p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <label htmlFor="pickup-date">Pick-up Date</label>
            <input
              type="date"
              id="pickup-date"
              value={pickupDate}
              onChange={e=>setPickupDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="text-sm text-gray-500"
              required
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <label htmlFor="return-date">Return Date</label>
            <input
              type="date"
              id="return-date"
               value={returnDate}
              onChange={e=>setReturnDate(e.target.value)}
              className="text-sm text-gray-500"
              required
            />
          </div>
        </div>

        <motion.button
        whileHover={{scale:1.05}}
         type="submit"
         className="flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dark text-white rounded-full cursor-pointer">
          <img
            src={assets.search_icon}
            alt="search"
            className="brightness-300"
          />
          Search
        </motion.button>
      </motion.form>
      <img src={assets.main_car} alt="mainCar" className="max-h-74" />
    </motion.div>
  );
};

export default Hero;
