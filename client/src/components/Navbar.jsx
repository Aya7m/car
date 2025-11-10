import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets, menuLinks } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import {motion} from 'motion/react'

const Navbar = () => {

  const{setShowLogin,user,logOut,isOwner,axios,setIsOwner}=useAppContext()
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const changeRole=async()=>{
    try {
      
      const{data}=await axios.post('/api/owner/changeRole')
      if(data.success){
        setIsOwner(true)
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      
    }
  }
  return (
    <motion.div
    initial={{y:-100,opacity:0}}
    animate={{y:0,opacity:1}}
    transition={{duration:0.5,ease:'easeInOut'}}

      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 ml:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all ${
        location.pathname === "/" && "bg-light"
      }`}
    >
      <Link to="/">
        <motion.img whileHover={{scale:1.05}} src={assets.logo} alt="logo" className="h-8" />
      </Link>
      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${
          location.pathname === "/" ? "bg-light" : "bg-white"
        } ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}
      >
        {menuLinks.map((item, index) => (
          <Link key={index} to={item.path}>
            {item.name}
          </Link>
        ))}

        <div className="hidden lg:flex items-center gap-2 border border-borderColor px-3 rounded-full max-w-56">
          <input
            type="text"
            className="w-full py-1.5 bg-transparent outline-none placeholder-gray-500"
            placeholder="Search Product"
          />
          <img src={assets.search_icon} alt="Search" />
        </div>

        <div className="flex max-sm:flex-col sm:items-center items-center gap-6">
          <button onClick={() =>isOwner? navigate("/owner"):changeRole()} className="cursor-pointer">
            {isOwner?'Dashboard':'List Cars'}
          </button>
          <button
            onClick={() =>{user?logOut(): setShowLogin(true)}}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dark text-white transition-all rounded-lg"
          >
            {user?'Logout':'Login'}
          </button>
        </div>
      </div>
      <button
        className="sm:hidden cursor-pointer"
        aria-label="menu"
        onClick={() => setOpen(!open)}
      >
        <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
      </button>
    </motion.div>
  );
};

export default Navbar;
