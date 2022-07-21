import React from 'react'
import { Navigate } from '../../node_modules/react-router-dom/index';
import { useSelector } from 'react-redux'

const Privt=({children})=>{
  
  const userSig =useSelector((state)=>state.UseSigin)
  const {userInfo}=userSig;
  const returnpart= userInfo?children:<Navigate to="/sigin"/>
  return returnpart;

}
export default Privt


// export default function Privt({component:Component, ...rest}) {
//   const userinfo =useSelector(state=>state.UseSigin)
//   const {userInfo}=userinfo


//     return(
//         <Route {...rest} render={(props)=>userInfo?(<Component {...props}></Component>):(<Redirect to="/sigin" />)} >

//         </Route>
//     )
    
// }