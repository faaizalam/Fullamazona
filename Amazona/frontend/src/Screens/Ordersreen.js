import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import {PayPalButton} from 'react-paypal-button-v2'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { deliverAction, Detailsorder, updatepayment } from '../actions/OrderAction';
import { useDispatch, useSelector } from 'react-redux';
import  Axios  from 'axios';
import { useParams} from '../../node_modules/react-router-dom/index';
import { Orderdeliver_reset, OrderPay_Rest } from '../constants/Orderconstnt';


export default function Orderscreen(props) {
    const params=useParams()
    const {id:OrderId}=params;
    const USersig= useSelector(state=>state.UseSigin)
    const {userInfo}=USersig;

    const [sdkready,setsdkready]=useState(false)
    const Orderdeatils =useSelector(state=>state.OrderDeat)
    const Orderdeliver =useSelector(state=>state.Orderdeliver)
    const {error,loading,order}=Orderdeatils;
    const {error:delierror,loading:deliloading,sucess:delisucc}=Orderdeliver;
    const dispatch=useDispatch()
    const Orderpay =useSelector(state=>state.Payorder)
    const {error:errorpay,sucess:succespay,loading:loadingpay}=Orderpay
    const deliverhandler=(id)=>{
        dispatch(deliverAction(id))
       
    }
    useEffect(()=>{
           const Paypal = async()=>{
                const {data}= await Axios.get('/postman/config/paypal')
                const script  = document.createElement('script')
                script.type= 'text/javascript';
                script.src=`https://www.paypal.com/sdk/js?client-id=${data}`
                script.async=true;
                script.onload=()=>{
                    setsdkready(true)
                }
                document.body.appendChild(script)
            } 
        
        
        
          if (!order||succespay ||delisucc ||(order && order._id !==OrderId)) {

              dispatch(Detailsorder(OrderId))
              dispatch({
                  type:OrderPay_Rest
              })
              dispatch({
                type:Orderdeliver_reset
            })
              
          }else{
              if (!order.isPaid){
              if(!window.paypal) {
                  Paypal()
              }else{
                  setsdkready(true)
              }

              }
                  
              
          }
    },[dispatch, order, OrderId, sdkready, succespay, delisucc])

        const succsspaymnet =(paymentresult)=>{
            dispatch(updatepayment(order._id,paymentresult))
           //  todo
   
         }
   

    return loading? (<LoadingBox></LoadingBox>):error?<MessageBox>{error}</MessageBox>:(
      <div> 
    <div className='placeorder-cont'>
        <div className='list1'>
            

        </div>
            <ul className='first'>
                ORDER ID: {order._id}
               <h1>Shipping</h1>
               <strong>Name:</strong>{order.shipping.fullname}<br/>
               <div>city:</div>{order.shipping.city}<br/>
               <div>Address:</div>{order.shipping.address}<br/>
               <div>country:</div>{order.shipping.country}<br/>
            </ul>
            {order.isPaid?<div className='green'>Paid At {order.paidAt}</div>:<div className='errors'>not yet paid</div>}
            <div> 
                
            {order.isDliverd?<div className='green'>Delivered At {order.isDliverd}</div>:<div className='errors'>not yet delivered</div>}
            </div>
        <div className='list2'>
            <ul>
               <h1>Payment</h1>
               <strong>Method:</strong>{order.paymentmethod.payment}
               
            </ul>

        </div>


        <div className='list3'>
        {deliloading && <LoadingBox/> }
            { delierror && <MessageBox/>}
            <ul>
               <h1>Order Item</h1>
               {
                                    order.OrderItem.map((x)=>(
                                        <li key={x.product}>
                                            <div className='mainof'>
                                                <div className='imges'>
                                                <img className='imagessplace' src={x.image} alt={x.name}/>
                                                    
                                                </div>
                                                <div>
                                                    <Link to={`/product/${x.product}`}>{x.name}</Link>

                                                </div>
                                               
                                                <div>
                                                   {x.qty} x $ {x.price} ={x.qty*x.price}
                                                </div>
                                                

                                            </div>

                                        </li>

                                    ))
                                }
               
               
            </ul>

        </div>

    </div>
    <div className='shipping'>
       <ul>
           <li>
               <h1>Order summary</h1>
               <div>Shipping</div>
               <div>$:{order.Shippingprice}</div>
           </li>
           <li>
             
               <div>TAX</div>
               <div>{order.taxprice}</div>
           </li>
           <li>
              
               <div>Items</div>
               <div>{order.itemprice}</div>
           </li>
           <li>
              
               <div>Total Prcie</div>
               <div>{Math.round(order.totalprice)}</div>
           </li>
       </ul>
      {
          !order.isPaid && (
              <li>
                  
                  {
                      !sdkready?(<LoadingBox></LoadingBox>):
                      (
                      <>
                      {errorpay && (<MessageBox errorpay={errorpay} />)}
                      {loadingpay && <LoadingBox/>}
                      <PayPalButton amount={order.totalprice} onSuccess={succsspaymnet}></ PayPalButton>
                      </>
                      )
                       
                  }
              </li>
          )
      }
      {
          userInfo.isAdmin && !order.isDliverd &&
          <li>
              <button type='button' onClick={()=>deliverhandler(order._id)}>Delivered</button>
          </li>
      }
 </div>

    </div>

  )
  
}
