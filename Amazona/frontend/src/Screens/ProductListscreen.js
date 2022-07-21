import React, { useEffect } from 'react'
import {Link, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from '../../node_modules/react-router-dom/index';
import { craetedproAction, deletedatabase, listproducts } from '../actions/ProductAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

import { PRODUCT_Created_reset, PRODUCT_delete_reset } from '../constants/productconstant';


export const ProductListscreen = () => {
    
    const {search,pathname}=useLocation()
    const sp = new URLSearchParams(search)
    // const page =Number(sp.get('page')) ||1
    const USersig= useSelector(state=>state.UseSigin)
    const {userInfo}=USersig;
    const sellerMode=pathname.indexOf('/seller') >=0
    const seller =sellerMode?userInfo._id:userInfo.isSeller?userInfo._id:''
    const page=Number(sp.get('page')) ||1

   
    
 const ProdcutList =useSelector(state=>state.produclist)
 const {loading,error,product,pages}=ProdcutList;
 const navigate =useNavigate()
 const {created,loading:loads,error:err,sucess}=useSelector(state=>state.createdpro)
 const {loading:loddd, sucess:succdelete,error:errs}=useSelector(state=>state.delete)
 const dispatch =useDispatch()

 useEffect(()=>{
     if (sucess) {
         dispatch({
             type:PRODUCT_Created_reset
         })
         navigate(`/products/${created._id}/edit`)
         }
        if (succdelete) {
            dispatch({type:PRODUCT_delete_reset})
            
        }
    dispatch(listproducts(page,seller))
    console.log(page)
 },[created, dispatch, navigate, page, seller, succdelete, sucess]);

//  useEffect(()=>{
//      if (succdelete) {
//         dispatch({
//             type:PRODUCT_delete_reset
//         })
//         dispatch(listproducts())
         
//      }
//  },[dispatch, succdelete])

 
 const deletehandler=(x)=>{
     if (window.confirm('are you sure')) {
         
         dispatch(deletedatabase(x))
     }
     
    

 }

 const createHand=()=>{
     dispatch(craetedproAction())

 }
 

  return (
    <div>
    <h1>Products</h1>
    <button type='button' onClick={createHand}>create</button>
    {
        loads &&<LoadingBox/>
    }
    {
        errs &&<MessageBox/>
    }
    {
        err && <MessageBox err={err}/>
    }
    {
        loading?(<LoadingBox/>):error?(<MessageBox error={error} />):(
            <div>
            <table>
                {loddd&&<LoadingBox/>}
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>Brand</th>
                    <th>Actins</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((x)=>(
                        <tr key={x._id}>
                            <td>{x._id}</td>
                            <td>{x.name}</td>
                            <td>{x.price}</td>
                            <td>{x.category}</td>
                            <td>{x.barnd}</td>
                            <td><button type='button' onClick={()=>navigate(`/products/${x._id}/edit`)}>Edit</button>
                            <button type='button' onClick={()=>deletehandler(x._id)}>Delete</button>
                            </td>
                            
                        </tr>
                    ))}
                    <tr>

                    </tr>
                </tbody>
            </table>
            <div>
               
                {  [...Array(pages).keys()].map((x)=>(
                    <Link className={x+1===Number(page)?'btnbold':'btn'} key={x+1} to={`/ProductsList/pages?page=${x+1}`}>{x+1}

                    </Link>

                 ))}

                </div>
            </div>
            

        )
    }

    </div>
  )
}
