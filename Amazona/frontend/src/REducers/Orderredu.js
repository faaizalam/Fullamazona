
import { Orderdeliver_fail, Orderdeliver_req, Orderdeliver_reset, Orderdeliver_succ, OrderLIST_delete_req, OrderLIST_Fail, OrderLIST_Fail_delete_req, OrderLIST_req, OrderLIST_Succes, OrderLIST_Succes_delete_req, Orderpay_Fail, Orderpay_req, OrderPay_Rest, Orderpay_Succes, Order_Fail, ORder_get_Fail, ORder_get_Req, ORder_get_Succ, Order_Req, Order_Rest, Order_Sucess } from "../constants/Orderconstnt";
import { PRODUCT_delete_reset } from "../constants/productconstant";
import { List_Admin_Req,  List_Order_Admin_fail, List_Order_Admin_RESET, List_Order_Admin_succ } from "../constants/Shipping";


export const orderreducer =(state={},action)=>{
  switch (action.type) {
      case Order_Req:
          return{
              loading:true,

          }
          case Order_Sucess:
              return{
                  loading:false,sucess:true,order:action.payload
              }
          case Order_Fail:
              return{
                  loading:false, sucess:false, error:action.payload
              }
          case Order_Rest:
              return{}
          
          
  
      default:
          return state;
  }


}
export const OrderdeatilReducer =(state={loading:true},action)=>{
    switch (action.type) {
        case ORder_get_Req:
            return{
                loading:true,
            
            }
        case ORder_get_Succ:
            return{
                loading:false,
                order:action.payload
            
            }
        case ORder_get_Fail:
            return{
                loading:false,
                error:action.payload
            
            }
        
            
            
    
        default:
            return state;
    }

}

export const OrderpayReducer =(state={},action)=>{
  switch (action.type) {
      case Orderpay_req:
        return{
            loading:true,

        }
        case Orderpay_Succes:
            return{
                loading:false,
               sucess:true
            }
       case Orderpay_Fail:
           return{
               loading:false,
               error:action.payload
           }
           case OrderPay_Rest:
               return{}
      default:
          return state
  }

}
export const OrderListreducer=(state={Orderlist:[]},action)=>{
    switch (action.type) {
        case OrderLIST_req:
            return{
                loading:true,}
                case OrderLIST_Succes:
                    return{
                        loading:false,
                       Orderlist:action.payload
                       
                    }
                    case OrderLIST_Fail:
                        return{
                            loading:false,
                            error:action.payload
                        }
    
        default:
            return state;
    }

}
export const OrderlistAdreducer=(state={loading:true},action)=>{
    switch (action.type) {
        case List_Admin_Req:
            return{
                loading:true,}
                case List_Order_Admin_succ:
                    return{
                        loading:false,
                        Orderss:action.payload
                       
                    }
                    case List_Order_Admin_fail:
                        return{
                            loading:false,
                            error:action.payload
                        }
                        case List_Order_Admin_RESET:
                            return{}
                        
    
        default:
            return state;
    }

}

// export const OrderlistAdreducer=(state={Orderss:[]},action)=>{
//     switch (action.type) {
//         case List_Order_Admin_req:
//             return{
//                 loading:true

//             }
//             case List_Order_Admin_succ:
//                 return{
//                     loading:false,
//                     Orderss:action.payload

//                 }
//                 case List_Order_Admin_fail:
//                     return{
//                         loading:false,
//                         error:action.payload
                        
//                     }
    
//         default:
//             return state
//     }

// }
export const OrderdeleteReducer=(state={},action)=>{
    switch (action.type) {
        case OrderLIST_delete_req:
            return{
                loading:true
            }
        case OrderLIST_Succes_delete_req:
            return{
                loading:false,
                sucess:true
            }
        case OrderLIST_Fail_delete_req:
            return{
                loading:false,
                error:action.payload
            }
            case PRODUCT_delete_reset:
                    return{}
    
        default:
            return state
    }
    
}
export const OrderdeliReducer =(state={},action)=>{
    switch (action.type) {
        case Orderdeliver_req:
          return{
              loading:true,
  
          }
          case Orderdeliver_succ:
              return{
                  loading:false,
                 sucess:true
              }
         case Orderdeliver_fail:
             return{
                 loading:false,
                 error:action.payload
             }
             case Orderdeliver_reset:
                 return{}
        default:
            return state
    }
  
  }