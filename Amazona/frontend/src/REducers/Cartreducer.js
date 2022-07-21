/* eslint-disable default-case */
import { CART_ADD_ITEMS, CART_Delete_ITEMS, Cart_empty, CART_item_fail } from "../constants/Cartadditem";
import {Payment_save, Shipping_save} from "../constants/Shipping"

export const CartReducer=(state={cartItems:[]},action)=>{
    switch(action.type){
        
        case CART_ADD_ITEMS:
        const item =action.payload;
        const existitem=state.cartItems.find((x)=>x.product===item.product)
        if (existitem) {
            return{
                ...state,
                cartItems:[...state.cartItems.map((x)=>x.product===existitem.product?item:x)],
            };
          
            
        }else{
            return{
                ...state ,cartItems:[...state.cartItems,item]

            }
        }
        case CART_Delete_ITEMS:
            return{
                
                ...state, error:'',cartItems:[...state.cartItems.filter(x=>x.product !==action.payload)]
            }
            case Shipping_save:
   // we use ...state in every request when we use one reducer for more than one filed as shhiping,paymemt,caritems,becouse when one stuff change say payment method we dont want to be changed other fields
            return{
            ...state, shipping:action.payload
            }
            case Payment_save:
        return{
            ...state,paymentmethod:action.payload
        }
        case Cart_empty:
        return{
            ...state,error:'',cartItems:[]
        }
          
        case CART_item_fail:
            return{
                ...state,error:action.payload
            }

        default:
            return state
    }

}

// export const ShippingReducer=(state={},action)=>{
   
//     switch (action.type) {
//         case Shipping_save:
//             return{
//             ...state, shipping:action.payload
//             }
            
            
    
//         default:
//             return state ;
//     }


// }

// export const PaymentReducer=(state={},action)=>{
// switch (action.type) {
//     case Payment_save:
//         return{
//             ...state,paymentmethod:action.payload
//         }

//     default:
//         return state;
// }
// }