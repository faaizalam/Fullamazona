import React, { useState } from 'react';
import Checkouts from '../components/Checkouts';
import { useDispatch, useSelector} from 'react-redux'
import { Saveshippng } from '../actions/CartAction';
import { useNavigate } from '../../node_modules/react-router-dom/index';


export default function ShippingAddress(props) {
   
    const navigate =useNavigate();
    // const Signin = useSelector(state=>state.UseSigin)
    const userSig= useSelector(state=>state.UseSigin)
    const {userInfo} =userSig;
    if (!userInfo) {
       navigate('/signin')       
    }

    const Shippingselect =useSelector(state=>state.cart)
    const {shipping}=Shippingselect;

    const [fullname,setname]=useState(shipping.fullname)
    const [address,setaddres]=useState(shipping.address)
    const [city,setcity]=useState(shipping.city)
    const [postalcode,setpostalcode]=useState(shipping.postalcode)
    const [country,setcountry]=useState(shipping.country)
     const dispatch = useDispatch()
     const submithandler=((e)=>{
         e.preventDefault();
         dispatch(Saveshippng({fullname,address,city,postalcode,country}))
         navigate('/payment')

     })

  return (
  <div>
      <Checkouts step1 step2></Checkouts>
      <form className='forms' onSubmit={submithandler}>
          <div>
              <h1>Shipping Address</h1>
              <div >
              <label htmlFor='fullNmme'>Full Name  </label>
              <input type='text' id='fullname' value={fullname} placeholder='full name' onChange={(e)=>setname(e.target.value)}></input>
    </div>
              <div >
              <label htmlFor='fullNmme'>city  </label>
              <input type='text' id='fullname' value={city} placeholder='city' onChange={(e)=>setcity(e.target.value)}></input>
    </div>
              <div >
              <label htmlFor='fullNmme'>country </label>
              <input type='text' id='fullname' value={country} placeholder='country' onChange={(e)=>setcountry(e.target.value)}></input>
    </div>
              <div >
              <label htmlFor='fullNmme'>address </label>
              <input type='text' id='fullname' value={address} placeholder='address' onChange={(e)=>setaddres(e.target.value)}></input>
    </div>
              <div >
              <label htmlFor='fullNmme'>postal code </label>
              <input type='text' id='fullname' value={postalcode} placeholder='postal code' onChange={(e)=>setpostalcode(e.target.value)}></input>
    </div>
        <label/>
        <button className='shippbutton' type='submit'> continue </button>

          </div>
      </form>
  </div>
  )
}
