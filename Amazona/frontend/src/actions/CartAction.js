import  Axios  from "axios";
import { CART_ADD_ITEMS, CART_Delete_ITEMS, CART_item_fail } from "../constants/Cartadditem";
import { Payment_save, Shipping_save } from "../constants/Shipping";

export const ADDTOCART=(productId,qty)=>async(dispatch,getState)=>{


    const {data}= await Axios.get(`/postman/products/${productId}`)
    const cartobj=getState();
    // console.log(cartobj.cart.cartItems[0].seller._id  ,data.seller._id)
    if(cartobj.cart.cartItems.length>0 && (data.seller._id !== cartobj.cart.cartItems[0].seller._id)){
        dispatch({
            type:CART_item_fail,payload:`cant add, buy from one seller at a time ${cartobj.cart.cartItems[0].seller.name}`
        })
      

    }else{

        dispatch({
            type:CART_ADD_ITEMS,
            payload:{
                name:data.name,
                image:data.image,
                price:data.price,
                countInStock:data.countInStock,
                product:data._id,
                seller:data.seller,
                qty
    
            }
        })
    }

    localStorage.setItem('cartitems',JSON.stringify(getState().cart.cartItems))

}

export const  removeFromcart =((productid)=>(dispatch,getState)=>{
  dispatch({type:CART_Delete_ITEMS,payload:productid});
 localStorage.setItem('cartitems',JSON.stringify(getState().cart.cartItems))
})

 export const Saveshippng=((data)=>(dispatch,getState)=>{
   dispatch({
        type:Shipping_save,
       payload:data
    });
 localStorage.setItem('Shippininfo',JSON.stringify(data))
//  const dip =localStorage.getItem('Shippininfo',JSON.stringify(getState().cart.shipping))
const dip =localStorage.getItem('Shippininfo')
 console.log(dip)
 


 })
 
 export const payments=(data)=>(dispatch)=>{

    dispatch({
        type:Payment_save,
        payload:data
    })
    localStorage.setItem('payment',JSON.stringify(data))

 }