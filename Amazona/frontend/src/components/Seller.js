import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from '../../node_modules/react-router-dom/index'

export const Seller = ({children}) => {
    const {userInfo}= useSelector(state=>state.UseSigin)
              
    return  userInfo && userInfo.isSeller? children :<Navigate to='/'/>
    
}
