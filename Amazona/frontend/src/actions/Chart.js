// import axios from 'axios'
import  Axios  from "axios"
import { Chart_fail, Chart_req, Chart_succ } from "../constants/Chartcon"
export const Chartaction=()=>async(dispatch,getState)=>{
   dispatch({
    type:Chart_req,
    
   })


  try {

  const {UseSigin}=getState()
    const {data}=await Axios.get('/postman/orders/chart',{
        headers:{
           Authorization: `Bearer ${UseSigin.userInfo.token}`
        }
    })
    dispatch({
        type:Chart_succ,
        payload:data
    })
  } catch (error) {
    dispatch({
        type:Chart_fail,
        payload:error.response&&error.response.data.message?error.response.data.message:error.message
    })
    
  }


}