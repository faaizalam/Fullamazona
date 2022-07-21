/* eslint-disable default-case */


// import { error } from "console";
import { Comments_fail, Comments_Reset, Comments_rq, Comments_succ, LIKE_fail, LIKE_Reset, LIKE_rq, LIKE_succ } from "../constants/Comments";
import { delete_product_database, delete_req, delete_req_error,PRODUCTHOME_LIST_Cat,PRODUCTHOME_LIST_CAT_fail,PRODUCTHOME_LIST_Cat_suc,PRODUCTHOME_LIST_fail,PRODUCTHOME_LIST_REQUEST,PRODUCTHOME_LIST_REQ_Cat,PRODUCTHOME_LIST_succ,PRODUCT_Created_fail, PRODUCT_Created_req, PRODUCT_Created_reset, PRODUCT_Created_succ, PRODUCT_DEATIALS_FAIL, PRODUCT_DEATIALS_REQUEST, PRODUCT_DEATIALS_SUCESS, PRODUCT_delete_reset, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCESS, Pro_update_fail, Pro_update_req, Pro_update_rest, Pro_update_succ} from "../constants/productconstant";







// danger
export const productListreducer=(state={loading:true},action)=>{
    switch(action.type){ 
        case PRODUCT_LIST_REQUEST:
        return{
            loading:true
        }
        case PRODUCT_LIST_SUCESS:
        return{
            loading:false,
            product:action.payload.product,
            pages:action.payload.pages,
            // page:action.payload.page,
            // pages:action.payload.pages
        }
        case PRODUCT_LIST_FAIL:
            return{
                loading:false,error:action.payload
            }
            default:
                return state;
    }
}

export const HomeList=(state={loading:true},action)=>{
    switch(action.type){ 
        case PRODUCTHOME_LIST_REQUEST:
        return{
            loading:true
        }
        case PRODUCTHOME_LIST_succ:
        return{
            loading:false,
            products:action.payload,
            
            // pages:action.payload.pages
        }
        case PRODUCTHOME_LIST_fail:
            return{
                loading:false,error:action.payload
            }
            default:
                return state;
    }
}
export const CATEGORY=(state={loading:true},action)=>{
    switch(action.type){ 
        case PRODUCTHOME_LIST_Cat:
        return{
            loading:true
        }
        case PRODUCTHOME_LIST_Cat_suc:
        return{
            loading:false,
            category:action.payload,
            
            // pages:action.payload.pages
        }
        case PRODUCTHOME_LIST_CAT_fail:
            return{
                loading:false,error:action.payload
            }
            default:
                return state;
    }
}

export const  datailsProductReduer=(state={loading:true},action)=>{

    switch(action.type){
        case PRODUCT_DEATIALS_REQUEST:
        return{
            loading:true
        }
        case PRODUCT_DEATIALS_SUCESS:
        return{
            loading:false ,product:action.payload
        }
        case PRODUCT_DEATIALS_FAIL:
        return{
            loading:false,error:action.payload
        }
        default:
            return state;
    }

}
export const ProductCreatedredcuer =(state={},action)=>{
    switch (action.type) {
        case PRODUCT_Created_req:
        return{
            loading:true

        }
        case PRODUCT_Created_succ:
        return{
          loading:false,
          sucess:true,
          created:action.payload
        }
        case PRODUCT_Created_fail:
        return{
            loading:false,
            error:action.payload

        }
        case PRODUCT_Created_reset:
        return{}
    
        default:
            return state;
    }
}

export const Deltered=(state={},action)=>{
    switch (action.type) {
        case delete_req:
            return{
                loading:true
            }
        case delete_product_database:
            return{
                loading:false,
                sucess:true,
            }
            case delete_req_error:
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

export const Produpdatereducer=(state={},action)=>{
    switch (action.type) {
        case Pro_update_req:
            return{
                loading:true

            }
        case Pro_update_succ:
            return{
                loading:false,
                sucess:true

            }
        case Pro_update_fail:
            return{
                loading:false,
                error:action.payload

            }
    
        case Pro_update_rest:
            return{ }
    
        default:
            return state;
    }
   



}

export const commentReducer=(state={Reviews:{}},action)=>{
   switch (action.type) {
    case Comments_rq:
        return{  
            loading:true,
           
         }
    case Comments_succ:
        return{
         
            loading:false,
            sucess:true,
            Reviews:action.payload,

        }

    case Comments_fail:
        return{
         loading:false,
       error:action.payload
        }
        case Comments_Reset:
            return{ }
   
    default:
        return state
   }



}



export const LIKEred=(state={Like:[]},action)=>{
    switch (action.type) {
     case LIKE_rq:
         return{  
             loading:true,
            
          }
     case LIKE_succ:
         return{
          
             loading:false,
             sucess:true,
             Like:action.payload,
 
         }
 
     case LIKE_fail:
         return{
          loading:false,
        error:action.payload
         }
         case LIKE_Reset:
             return{ }
    
     default:
         return state
    }
 
 
 
 }