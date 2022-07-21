import  Axios  from "axios"


import { User_info_Change_fail, User_info_Change_Req, User_info_Change_succ, User_info_fail, User_info_req, User_info_succ, User_Profile_FAil, User_Profile_Req, User_Profile_succ, User_Profile_Upadte_fail, User_Profile_Upadte_Req, User_Profile_Upadte_succ, User_RE_FAil, User_Re_Req, User_RE_succ, User_Sig_succ, User_Sing_FAil, User_Sing_OUT, User_Sing_Req } from "../constants/USercon"
import { Topseller_req, Topseller_req_fail, Topseller_req_succ, USER_Delete_fail, USER_Delete_REQ, USER_Delete_succ, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS } from "../constants/Userlist"


export const signin=({email,password})=>async(dispatch)=>{
    dispatch({type:User_Sing_Req,payload:{email,password}})
    try {

        const {data} =await Axios.post('/postman/users/signin',{email,password})
        dispatch({type:User_Sig_succ,payload:data})
        localStorage.setItem("userinfo", JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type:User_Sing_FAil,payload:
            error.reponse?error.reponse.data.message:error.message
            
        })
        
        
    }

}
export const RegisterAction=({name,email,password})=>async(dispatch)=>{
    dispatch({type:User_Re_Req,payload:{name,email,password}})
    try {

        const {data} =await Axios.post('/postman/users/register',{name,email,password})
        dispatch({type:User_RE_succ,payload:data})
        dispatch({type:User_Sig_succ,payload:data})
        localStorage.setItem("userinfo", JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type:User_RE_FAil,payload:
            error.reponse?error.reponse.data.message:error.message
            
        })
        
        
    }

}
export const signout=()=>(dispatch)=>{
    dispatch({type:User_Sing_OUT})
    localStorage.removeItem('userinfo')
    localStorage.removeItem('cartitems')

}

export const userProfileAction=(id)=>async(dispatch,getState)=>{
    
    dispatch({
        type:User_Profile_Req,
        payload:id
    })
    try {
        const {UseSigin:{userInfo}}=getState()
        const {data}= await Axios.get(`/postman/users/${id}`,{
            headers:{
                Authorization: `Bearer ${userInfo.token}`

            }
            
        })
        dispatch({
            type:User_Profile_succ,
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:User_Profile_FAil,
            payload:error.message|| error.data.message
        })
        
    }


}


export const Updateprofile=(updated)=>async(dispatch,getState)=>{
   dispatch({
       type:User_Profile_Upadte_Req,
       payload:updated
   })
   try {
       const {UseSigin:{userInfo}}=getState()
       const {data} =await Axios.put('/postman/users/profileupdate',updated,{
           headers:{
               Authorization: `Bearer ${userInfo.token}`
           }
        })
        dispatch({
            type:User_Profile_Upadte_succ,
            payload:data,
        })
       
        localStorage.setItem("userinfo", JSON.stringify(data))
   } catch (error) {

      dispatch({
          type:User_Profile_Upadte_fail,
          payload:error.message|| error.data.message
      })
       
   }
    

}



// export const ListUsers=()=>async(dispatch,getState)=>{
//     dispatch({ type:USER_LIST_REQUEST})
//     try {
//         const {UseSigin:{userInfo}}=getState()
//         const {data} =await Axios.get('/postman/users/userlists',{
//             headers:{
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//          })
//          dispatch({
//              type:USER_LIST_SUCCESS,
//              payload:data,
//          })
//     } catch (error) {
 
//        dispatch({
//            type:USER_LIST_FAIL,
//            payload:error.message|| error.data.message
//        })
        
//     }
     
 
//  }


export const ListUsers=(page)=>async(dispatch,getState)=>{

    dispatch({
        type:USER_LIST_REQUEST
    })
    try {
        const {UseSigin:{userInfo}}=getState()
        const {data}=await Axios.get(`/postman/users/userlists?page=${page}`,{
            headers:{
                Authorization :`Bearer ${userInfo.token}`
            }
        })
        dispatch({
            type:USER_LIST_SUCCESS,
            payload:data
        })
        
    } catch (error) {

        dispatch({
            type:USER_LIST_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })
        
    }


}

export const deleteUserAction=(x)=>async(dispatch,getState)=>{
    dispatch({
        type:USER_Delete_REQ
    })
     
    try {
        const {UseSigin:{userInfo}}=getState();
        const {data}=await Axios.delete(`/postman/users/${x}`,{
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({
            type:USER_Delete_succ,
            payload:data
        })
        
    } catch (error) {
        const msgs= error.response.data.message 
        // const msgs =error.response && error.response.data.message ? error.response.data.message: error.message;
        dispatch({
            type:USER_Delete_fail,
            payload:msgs
           
        })
        
    }


}

export const Userinfo=(id)=>async(dispatch,getState)=>{
    dispatch({
        type:User_info_req
    })
    
    try {
        const {UseSigin:{userInfo}}=getState()
        const {data}=await Axios.get(`/postman/users/${id}`,{
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }

        })
        dispatch({
            type:User_info_succ,
            payload:data
        })
        
    } catch (error) {
         const msgs =error.response && error.response.data.message ? error.response.data.message: error.message;
        dispatch({
            type:User_info_fail,
            payload:msgs
        })
    }


}

export const userlistUpdate=(datas)=>async(dispatch,getState)=>{
    dispatch({
        type:User_info_Change_Req
    })
    
    try {
        const {UseSigin:{userInfo}}=getState()
        const {data}=await Axios.put(`/postman/users/${datas._id}`,datas,{
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }

        })
        dispatch({
            type:User_info_Change_succ,
            payload:data
        })
        
    } catch (error) {
         const msgs =error.response && error.response.data.message ? error.response.data.message: error.message;
        dispatch({
            type:User_info_Change_fail,
            payload:msgs
        })
    }


}


export const Topseller=(()=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:Topseller_req,
           
        })

        const {data}= await Axios.get('/postman/users/Topseller')
        dispatch({
            type:Topseller_req_succ,
            
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:Topseller_req_fail,
            payload:error.response.data.message
        })
    }

})