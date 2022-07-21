

import { User_delete_reset, User_info_Change_fail, User_info_Change_Req, User_info_Change_reset, User_info_Change_succ, User_info_fail, User_info_req, User_info_reset, User_info_succ, User_Profile_FAil, User_Profile_Req, User_Profile_succ, User_Profile_Upadte_fail, User_Profile_Upadte_Req, User_Profile_Upadte_reset, User_Profile_Upadte_succ, User_RE_FAil, User_Re_Req, User_RE_succ, User_Sig_succ, User_Sing_FAil, User_Sing_OUT, User_Sing_Req } from "../constants/USercon";
import { Topseller_req, Topseller_req_fail, Topseller_req_succ, USER_Delete_fail, USER_Delete_REQ, USER_Delete_succ, USER_LIST_FAIL, USER_LIST_REQUEST, User_LIST_reset, USER_LIST_SUCCESS } from "../constants/Userlist";

export const Registerreducer = (state={},action)=>{
    switch (action.type) {
        case User_Re_Req:
            return{
                loading:true
            }
            case User_RE_succ:
                return{
                    loading:false,userInfo:action.payload
                }
                case User_RE_FAil:
                    return{
                        loading:false,error:action.payload
                    }
    
    
        default:
            return state
    }
}

















export const UserSiginReducer=(state={},action)=>{
    switch(action.type){
        case User_Sing_Req:
            return{
                loading:true
            }
        case User_Sig_succ:
            return{
                loading:false ,userInfo:action.payload
            }
        case User_Sing_FAil:
            return{
                loading:false ,error:action.payload
            }
            case User_Sing_OUT:
                return{}
            default:return state;
    }
}

export const Userprofilereducer =(state={loading:true},action)=>{
    switch (action.type) {
        case User_Profile_Req:
           return{
               loading:true
           }
           case User_Profile_succ:
               return{
                   loading:false,
                    Profile:action.payload
               }
               case User_Profile_FAil:
               return{
                   loading:false,
                   error:action.payload
               }
    
        default:
            return state;
    }

}

export const UserprofileUpdate =(state={},action)=>{
    switch (action.type) {
        case User_Profile_Upadte_Req:
        return{
            loading:true
        }
        case User_Profile_Upadte_succ:
        return{
         loading:false,
          ProfileUpdate:action.payload,
          sucess:true
        }
        case User_Profile_Upadte_fail:
        return{
            loading:false,
            error:action.payload
        }
        case User_Profile_Upadte_reset:
        return{ }
    
        default:
            return state;
    }
}


// export const UserListreducer =(state={loading:true}, action)=>{
//     switch (action.type) {
//         case USER_LIST_REQUEST:
//         return{
//             loading:true
//         }
//         case USER_LIST_SUCCESS:
//         return{
//          loading:false,
//          useritems:action.payload,
//         }
//         case USER_LIST_FAIL:
//         return{
//             loading:false,
//             error:action.payload
//         }
    
//         default:
//             return state;
//     }
// }
export const UserListreducer=(state={loading:true},action)=>{
    switch (action.type) {
        case USER_LIST_REQUEST:
            return{
                loading:true

            }
            case USER_LIST_SUCCESS:
            return{
                loading:false,
                useritems:action.payload,
                // pages:action.payload.pages

            }
            case USER_LIST_FAIL:
            return{
                loading:false,
                error:action.payload

            }
            case User_LIST_reset:
            return{ }
    
        default:
            return state;
    }

}

export const UserDELETE=(state={},action)=>{
    switch (action.type) {
        case USER_Delete_REQ:
            return{
                loading:true

            }
            case USER_Delete_succ:
            return{
                loading:false,
                // useritems:action.payload
                sucess:true

            }
            case USER_Delete_fail:
            return{
                loading:false,
                error:action.payload

            }
            case User_delete_reset:
                return{}
    
        default:
            return state;
    }

}
export const UserInfo=(state={loading:true},action)=>{
    switch (action.type) {
        case User_info_req:
            return{
                loading:true

            }
            case User_info_succ:
            return{
                loading:false,
                useredit:action.payload,
                // sucess:true

            }
            case User_info_fail:
            return{
                loading:false,
                error:action.payload

            }
            case User_info_reset:
            return{ }
            
           
    
        default:
            return state;
    }

}


export const UserInfoChnageReducer=(state={},action)=>{
    switch (action.type) {
        case User_info_Change_Req:
            return{
                loading:true

            }
            case User_info_Change_succ:
            return{
                loading:false,
                userupdate:action.payload,
                sucess:true
                // sucess:true

            }
            case User_info_Change_fail:
            return{
                loading:false,
                error:action.payload

            }
            case User_info_Change_reset:
                return{}
           
           
    
        default:
            return state;
    }

}


export const Topsellerlist=(state={topsellers:[]},action)=>{

    switch(action.type){
      case Topseller_req:
        return{
            loading:true,
           

        }
        case Topseller_req_succ:
            return{
                loading:false,
                topsellers:action.payload
            }

            case Topseller_req_fail:
                return{
                    loading:false,
                    topsellers:action.payload
                }



      default:
      return state


    }





}