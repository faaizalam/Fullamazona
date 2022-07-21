import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Checkouts from '../components/Checkouts';
import { Link } from 'react-router-dom'
import { createdorder } from '../actions/OrderAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Order_Rest } from '../constants/Orderconstnt';
import { useNavigate } from '../../node_modules/react-router-dom/index';

export default function Placeorder(props) {
    const navigate =useNavigate();
    const carts =useSelector(state=>state.cart)
    const {shipping,paymentmethod,cartItems}=carts
    if(!paymentmethod){
        props.history.push('/payment')
    }
    const ordercreted =useSelector(state=>state.ordercreate)
    const {order,loading,error,sucess}=ordercreted;
    //  const toroundfigure =((num)=>{
    //     Number(num.toFixed(2))
    //  }) 
    
    const toroundfigure=(num)=>Number(num.toFixed(2));  //5.1234 "5.12" Number("5.12")= 5.12 its return func in modren way
     carts.itemprice= toroundfigure( cartItems.reduce((a,c)=>a+c.price*c.qty,0))
    carts.Shippingprice = carts.itemprice> 100? toroundfigure(0):toroundfigure(10);
     carts.taxprice = toroundfigure(0.15*carts.itemprice);
     carts.totalprice = carts.itemprice + carts.Shippingprice +carts.taxprice;
   const disptach = useDispatch()
   const placeorderhandler=()=>{
        disptach(createdorder({...carts, OrderItem:carts.cartItems}))
    }
    
    useEffect(()=>{
        if (sucess) {
            navigate(`/orders/${order._id}`)
            disptach({
                type:Order_Rest
            })
           
        }
    },[sucess, props.history, order, disptach, navigate])
    return (
      <div> 
    <Checkouts step1 step2 step3 step4></Checkouts>
    <div className='placeorder-cont'>
        <div className='list1'>

        </div>
            <ul className='first'>
               <h1>Shipping</h1>
               <strong>Name:</strong>{shipping.fullname}<br/>
               <div>Address:</div>{shipping.city}
               <div>Address:</div>{shipping.address}
               <div>Address:</div>{shipping.country}
            </ul>
        <div className='list2'>
            <ul>
               <h1>Payment</h1>
               <strong>Method:</strong>{paymentmethod.payment}
               
            </ul>

        </div>


        <div className='list3'>
            <ul>
               <h1>Order Item</h1>
               {
                                    cartItems.map((x)=>(
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
               <div>$:{carts.Shippingprice}</div>
           </li>
           <li>
             
               <div>TAX</div>
               <div>{carts.taxprice}</div>
           </li>
           <li>
              
               <div>Items</div>
               <div>{carts.itemprice}</div>
           </li>
           <li>
              
               <div>Total Prcie</div>
               <div>{carts.totalprice}</div>
           </li>
       {loading &&(<LoadingBox></LoadingBox>)}
       {error&&(<MessageBox error={error}/>)}
       </ul>
       <button type='submit' className='placeorder' onClick={placeorderhandler} >palce order</button>
    </div>


    </div>

  )
  
}
