import  Axios  from "axios"
import { Comments_fail, Comments_rq, Comments_succ, LIKE_fail, LIKE_rq, LIKE_succ } from "../constants/Comments";

// import { useSelector } from "react-redux";
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCESS,PRODUCT_LIST_FAIL,delete_req_error,PRODUCTHOME_LIST_REQUEST,PRODUCTHOME_LIST_fail,PRODUCTHOME_LIST_succ, PRODUCT_DEATIALS_REQUEST, PRODUCT_DEATIALS_SUCESS, PRODUCT_DEATIALS_FAIL, PRODUCT_Created_req, PRODUCT_Created_succ, PRODUCT_Created_fail, delete_product_database,delete_req, Pro_update_req, Pro_update_succ, PRODUCTHOME_LIST_Cat_suc, PRODUCTHOME_LIST_CAT_fail, PRODUCTHOME_LIST_Cat } from "../constants/productconstant"

export const ListaCatogery =()=> async(dispatch)=>{
    try {
            dispatch({
                type: PRODUCTHOME_LIST_Cat,
            })
        const { data }= await Axios.get(`/postman/products/catogeries`);
        dispatch({
            type: PRODUCTHOME_LIST_Cat_suc,
             payload:data
        })
    } catch (err) {
        dispatch({
            
            type: PRODUCTHOME_LIST_CAT_fail,
            payload:err.response && err.response.data.message ? err.response.data.message: err.message,
        })
        
    }
}
export const homeproAction =(name='',category='', min='', max='',rating='',lowhigh='')=> async(dispatch)=>{
    try {
     
    //   console.log(max,min)
        // console.log(category)
            dispatch({
                type: PRODUCTHOME_LIST_REQUEST,
            })
        const { data }= await Axios.get(`/postman/products?name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&lowhigh=${lowhigh}`);
        dispatch({
            type: PRODUCTHOME_LIST_succ,
             payload:data
        })
    } catch (err) {
        dispatch({
            type: PRODUCTHOME_LIST_fail,
            payload:err.response && err.response.data.message ? err.response.data.message: err.message,
        })
        
    }
}







// danger
export const listproducts =(page ,seller='')=> async(dispatch,getState)=>{
    dispatch({
        type:PRODUCT_LIST_REQUEST
    })
    try {
        const {UseSigin:{userInfo}}=getState()
        const { data }= await Axios.get(`/postman/products/admin?page=${page}&seller=${seller}`,{
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({
            type:PRODUCT_LIST_SUCESS , payload:data
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_LIST_FAIL ,payload:error.message
        })
        
    }
}


export const detailsProducts=(ProductId)=> async(dispatch)=>{
    dispatch({
        type:PRODUCT_DEATIALS_REQUEST ,payload:ProductId
    })
    try {
        const {data}= await Axios.get(`/postman/products/${ProductId}`)
         dispatch({
             type:PRODUCT_DEATIALS_SUCESS, payload:data
         })
    } catch (err) {
        dispatch({
            type:PRODUCT_DEATIALS_FAIL,
             payload:err.response && err.response.data.message ? err.response.data.message: err.message,
        })
        
    }

}

export const craetedproAction=()=>async(dispatch,getState)=>{
    dispatch({
        type:PRODUCT_Created_req
    })
    
    // const {UseSigin:{userInfo}}=getState()
    try {
        const {UseSigin:{userInfo}} =getState()
        const {data}  = await Axios.post('/postman/products/created',{},{
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }

        })
        dispatch({
            type:PRODUCT_Created_succ,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:PRODUCT_Created_fail,
            error:error.data||error.data.message
        })
        
    }
    

}

export const deletedatabase=(x)=>async(dispatch,getState)=>{
    dispatch({
        type:delete_req,
        payload:x
    })
  const {UseSigin:{userInfo}}=getState()
    try {
        await Axios.delete(`/postman/products/delete/${x}`,{
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
 })
            dispatch({
                type:delete_product_database,
               
            })


        
        
    } catch (error) {
        dispatch({
            type:delete_req_error,
            error:error.message
        })
        
    }
    
}




export const Updatepro=(proupdate)=>async(dispatch,getState)=>{

    dispatch({
        type:Pro_update_req

    })
    try {
        const {UseSigin:{userInfo}}=getState()
        const {data} = await Axios.put(`/postman/products/${proupdate._id}`,proupdate,{
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({
            type:Pro_update_succ,
            payload:data.updateprod

        })
        
    } catch (error) {
        dispatch({
            payload:error.data||error.data.message
        })
        
    }
    
}


export const commentsAction=({rating,comments,name,id})=>async(dispatch,getState)=>{
    console.log(rating,comments,name,id)
  dispatch({
    type:Comments_rq,
    
  })
    try {
        const {UseSigin:{userInfo}}=getState()
        
        // `/postman/products/delete/${x}
        const {data}=await Axios.post(`/postman/products/${id}/review`,{rating,comments,name},{
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({
            type:Comments_succ,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:Comments_fail,
            payload:error.response&&error.response.data.message?error.response.data.message:error.message
        })
        
    }

}


export const LikeAction=(like,productid,userid)=>async(dispatch,getState)=>{
    // console.log({userid})
    dispatch({
        type:LIKE_rq
    })
    try {
        const {UseSigin:{userInfo}}=getState()
     const {data}=await Axios.post(`/postman/products/${productid}/Like`,{like,userid},{
      headers:{
      Authorization:` Bearer ${userInfo.token}`
    }
})
       dispatch({
        type:LIKE_succ,
        payload:data
       })


    } catch (error) {
        dispatch({
            type:LIKE_fail,
            payload:error.response&& error.response.data.message?error.data.message:error.message
        })
        
    }

}