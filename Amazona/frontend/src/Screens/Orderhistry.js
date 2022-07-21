import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrderList } from '../actions/OrderAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function Orderhistry(props) {

   

    const Listorder =useSelector(state=>state.OrderList)
    const {loading,error,Orderlist} =Listorder; 
    
    // console.log(Orderlist)
    const disptach =useDispatch()
    useEffect(()=>{
        disptach(OrderList())

    },[disptach])


  return  (
      <div className='mains'>
          <h1>Order History</h1>
          
         { loading?(<LoadingBox></LoadingBox>):error? (<MessageBox>{error}</MessageBox>):(
             <table className='Ordercont'>
              <thead >
                  <tr>
                      <th>ID</th>
                      <th>DATE</th>
                      <th>PAID</th>
                      <th>PaidAt</th>
                      <th>Delivered</th>
                      <th>Action</th>
                  </tr>
                </thead>
                  <tbody>
                      {/* {
                          Orderlist._id
                      } */}
                          {Orderlist.map((Order)=>(
                      <tr  key={Order._id}className='tableorder'>
                          <td>{Order._id}</td>
                          <td>{Order.createdAt.substring(0,10)}</td>
                          <td>{Math.round(Order.totalprice)}</td>
                          <td>{Order.isPaid?Order.paidAt:'no'}</td>
                          <td>{Order.isDliverd?Order.DliverdAt:'no'}</td>
                          <td><button type='button' className='button' onClick={()=>{props.history.push(`/orders/${Order._id}`)}}
                          >Details</button></td>
                      </tr>
                          ))}
                    
                  </tbody>
              </table>

        
          )}
      </div>


  )
  
}
