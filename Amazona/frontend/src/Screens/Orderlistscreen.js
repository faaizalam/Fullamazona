import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from '../../node_modules/react-router-dom/index'

import { ListOrder, Orderdelete } from '../actions/OrderAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { PRODUCT_delete_reset } from '../constants/productconstant'

// import { PRODUCT_delete_reset } from '../constants/productconstant'

export const Orderlistscreen = () => {
    // const Listorder =useSelector(state=>state.OrderList)
    // const listo=useSelector(state=>state.OrderlistAdmins)
    // const {loading,error,OrderlistAdmin}=listo
    const {pathname}=useLocation()
    const sellermode=pathname.indexOf('/seller') >=0;
    const USersig= useSelector(state=>state.UseSigin)
    const { userInfo }=USersig;
    const seller =sellermode?userInfo._id:''
    
    const {loading,error,Orderss} =useSelector((state)=>state.OrderlistAdmins)
    const {loading:deleteloading,error:deleterror,sucess} =useSelector((state)=>state.Orderdelete)
     
    // OrderlistAdmin
    console.log(Orderss)

    
    const navigate =useNavigate();
    const disptach=useDispatch()
   
    const deleteHandler=(id)=>{
        disptach(Orderdelete(id))
        // console.log(id)

    }
    // useEffect(()=>{
    //     disptach(ListOrder())
  console.log(sellermode)
    // },[disptach])
    useEffect(()=>{
        if (sucess) {
            disptach({
                type: PRODUCT_delete_reset
            })
            disptach(ListOrder(seller))
            
        }
        if (!Orderss) {
            
            disptach(ListOrder(seller))
        }
       },[Orderss, disptach, seller, sellermode, sucess, userInfo])
    

  return (
    <div className='cont'>
        
        <div>
{/*        
        deleteloading?(<LoadingBox/>):deleterror?(<MessageBox/>): */}
       
       { loading?(<LoadingBox></LoadingBox>):error? (<MessageBox>{error}</MessageBox>):(
        

            <table>
                <thead>
                   <tr>
                       <th>ID</th>
                       {/* <th>USER</th> */}
                       <th>DATE</th>
                       <th>TOTAL</th>
                       <th>PAID</th>
                       <th>Name</th>
                       <th>Delivered</th>
                       <th>Actions</th>
                   </tr>
                </thead>
                <tbody>
                {Orderss.map((Order)=>(
                      <tr className='tableorder'>
                          <td>{Order._id}</td>
                          <td>{Order.createdAt.substring(0,10)}</td>
                          <td>{Math.round(Order.totalprice)}</td>
                          <td>{Order.isPaid?Order.paidAt.slice(0,10):'no'}</td>
                          <td>{Order.user.name}</td>
                          <td>{Order.isDliverd?Order.DliverdAt:'nos'}</td>
                          <td>
                              <button type='button' onClick={()=>navigate(`/orders/${Order._id}`)}>Action</button>
                             
                              <button type='button' onClick={()=>deleteHandler(Order._id)}>delete</button>
                          </td>
                          {/* <td><button type='button' className='button' onClick={()=>{props.history.push(`/orders/${Order._id}`)}}
                          >Details</button></td> */}
                          
                          
                      </tr>
                          ))}
                    
                  
                </tbody>
                
        {deleteloading &&(<LoadingBox/>)}
        {deleterror && (<MessageBox/>)}
                
            </table>
       )}
       
         

        </div>

    </div>
)
}
