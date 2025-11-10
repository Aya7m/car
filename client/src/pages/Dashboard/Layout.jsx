import React, { useEffect } from 'react'
import NavbarOwner from '../../components/Dashboard/NavbarOwner'
import SideBar from '../../components/Dashboard/SideBar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {

  const{isOwner,navigate}=useAppContext()

  useEffect(()=>{
    if(!isOwner){
      navigate('/')
    }
  },[isOwner])
  return (
    <div className='flex flex-col'>
        <NavbarOwner/>
        <div className='flex'>
            <SideBar/>
            <Outlet/>
        </div>
    </div>
  )
}

export default Layout