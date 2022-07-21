// import React, { useEffect } from 'react'

import { useEffect, useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom'
import { homeproAction } from '../actions/ProductAction';
// import { ListaCatogery } from '../actions/ProductAction';

import { signout } from '../actions/USerActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { Searchbox } from './Searchbox';


export default function Head() {
    const [Sidebaropen,isSidebaropen]= useState(false);
    const cart =useSelector(state=>state.cart)
    const USersig= useSelector(state=>state.UseSigin)
    const {cartItems}= cart;
    const {userInfo}=USersig;
    const dispatch = useDispatch()
    
    // const {eror.products}=useSelector((state)=>state.Homes)
    const {loading,error,products}=useSelector((state)=>state.Homes)
    const signouthandler =(()=>{
        dispatch(signout());

    })
    useEffect(()=>{
        dispatch(homeproAction())
        // dispatch(Topseller())
    },[dispatch])
    // useEffect(()=>{
    //     dispatch(ListaCatogery())
    // },[dispatch])
  return (
    <div>
    
    <header>
        
        <div>
            <button className='open-bar' onClick={()=>isSidebaropen(true)}>
                <i className='fa fa-bars'></i>

            </button>
            <Link class="brand" to="/"> Amazona</Link>
        
        </div>
        <div>
            <Searchbox/>
            {/* <Route render={({history})=><Searchbox history={history}></Searchbox>}></Route> */}
        </div>
        <div>
            <Link to="/cart">Cart
            {cartItems.length > 0 &&(
                <span className='err'>{cartItems.length}</span>
            )}</Link>
            {
                userInfo && userInfo.seller&&(
                    <img class="mediums" src={userInfo.seller.logo} alt={userInfo.seller.name} />
                )
            }



              {
                userInfo && userInfo.isSeller &&(
                    <div className='dropdown'>
                        <div>
                        
                            {/* <img src={userInfo.seller.logo} alt={userInfo.seller.name}/> */}
                            </div>
                        <Link to='#admin'>Seller<i className='fa fa-caret-down'></i> </Link>
                        <ul className='dropdown-cont'>
                       
                            <li> <Link to='/ProductsList/seller'>ProductsList</Link> </li>
                            <li> <Link to='/OrderList/seller'>OrderList</Link> </li>
                        
                            

                        </ul>

                        </div>

                )
            }
            {
                userInfo? (
                <div className='dropdown'><Link to="/profile">{userInfo.name} <i className='fa fa-caret-down'></i>  </Link>
                <ul className='dropdown-cont'>
                    <li>
                    <Link to='/sigin' onClick={signouthandler}>Signout</Link>
                    </li>
                    <li>  
                    <Link to='/orderhistry'>Orderhistory</Link>
                    </li>
                    <li>  
                    <Link to='/profile'>Profile</Link>
                    </li>
                </ul>
                </div>):( <Link to="/sigin">Sigin-In</Link>)
            }
            {
                userInfo && userInfo.isAdmin &&(
                    <div className='dropdown'>
                        <Link to='#admin'>Admin<i className='fa fa-caret-down'></i> </Link>
                        <ul className='dropdown-cont'>
                            <li> <Link to='/Dashboard'>Dashboard</Link> </li>
                            <li> <Link to='/ProductsList'>ProductsList</Link> </li>
                            <li> <Link to='/OrderList'>OrderList</Link> </li>
                            <li> <Link to='/Userslist'>Userslist</Link> </li>
                          <li><Link to="/support"> support</Link></li> 
                            

                        </ul>

                        </div>

                )
            }
           
        </div>

    </header>
    <aside className={Sidebaropen?'open':''}>
        <ul>
            <li>
            <button className='close-bar'onClick={()=>isSidebaropen(false)}><i className='fa fa-close'></i></button>
            </li>
            <li className='catgory'>
                <strong>Category</strong>
          {
            
                loading?(<LoadingBox></LoadingBox>):error?(<MessageBox></MessageBox>):(
                   products.map((x=>(
                        <Link to={`/serach/name/${x.name}`}>{x.name}</Link> 
                   )))
    
                )
            

             }
     
               
                

            </li>
        </ul>

    </aside>
    </div>
  )
    
}

