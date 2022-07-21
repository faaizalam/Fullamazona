import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from '../../node_modules/react-router-dom/index'

export const Adminroutes = ({children}) => {
 const {userInfo}=useSelector(state=>state.UseSigin)

 const Adminprivt =userInfo.isAdmin?children:<Navigate to='/'/>
 return Adminprivt

 
  
}
