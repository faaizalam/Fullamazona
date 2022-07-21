import { Chart_fail, Chart_req, Chart_succ } from "../constants/Chartcon";

export const Chartreducer=(state={loading:true},action)=>{
    switch (action.type) {
        case  Chart_req:
            
            return{
                loading:true
                }
        case  Chart_succ:
            
            return{
                loading:false,
                summary:action.payload

            }
        case  Chart_fail:
            
            return{
                loading:false,
                summary:action.payload

            }
    
        default:
               return state;
    }





}