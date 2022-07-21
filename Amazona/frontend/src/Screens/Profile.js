import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Updateprofile, userProfileAction } from '../actions/USerActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { User_Profile_Upadte_reset } from '../constants/USercon';

export default function Profile(){
   const [name ,setname] =useState('')
   const [email ,setemail] =useState('')
   const [password ,setpassword] =useState('')
   const [con_password ,setcon_password] =useState('')

   const [nameseller ,setnameseller] =useState('')
   const [logoseller ,setlogoseller] =useState('')
   const [descripseller,setdescripseller] =useState('')

    const UserSign= useSelector(state=>state.UseSigin)
     const {userInfo} =UserSign;
       const profile =useSelector(state=>state.Userprofile)
       const {loading,Profile,error}=profile
     const dispatch =useDispatch()
     const upadteinfo=useSelector(state=>state.UserprofileUpdateStor)
      const {error:errorpay}=upadteinfo
      const {sucess}=upadteinfo;
     useEffect(()=>{
         if (!Profile||sucess) {
            dispatch({
                type:User_Profile_Upadte_reset
            })
             dispatch(userProfileAction(userInfo._id))
             
         }else{

             setname(Profile.name)
             setemail(Profile.email)
             if(Profile.seller){
                 setlogoseller(Profile.seller.logo)
                 setnameseller(Profile.seller.name)
                 setdescripseller(Profile.seller.description)
             }
            }
     },[dispatch, userInfo._id, Profile, sucess])


     const submithandler =(e)=>{
        e.preventDefault();
        if (password !==con_password) {
            alert('password isnt equal to confirm password')
            
        }else{
            dispatch(Updateprofile({name,email,password,user:userInfo._id,nameseller,descripseller,logoseller}))
        }
     }


    return(
       <div className="profile">
           <div className="profile-con">
               <h1>{userInfo._id}</h1>
               {/* <h1>{profile._id}</h1> */}
                {sucess && <div className='green'>updated</div>}
               <form className='forms' onSubmit={submithandler}>
         { loading? (<LoadingBox></LoadingBox>):error?(<MessageBox>{error}</MessageBox>):errorpay?(<div color='red'>{errorpay}</div>):

                   <ul>
                       <li>
                        <label htmlFor="name" >Name</label>
                        <input type="text" id="name" placeholder="name" value={name} onChange={(e)=>setname(e.target.value)} />
                       </li>
                       <li>
                        <label htmlFor="name" >Email</label>
                        <input type="text" id="email" placeholder="name" value={email} onChange={(e)=>setemail(e.target.value)} />
                       </li>
                       <li>
                        <label htmlFor="name" >password</label>
                        <input type="password" id="password" placeholder="name" onChange={(e)=>setpassword(e.target.value)}/>
                       </li>
                       <li>
                        <label htmlFor="name" >confirm-password</label>
                        <input type="password" id="password" placeholder="name" onChange={(e)=>setcon_password(e.target.value)}/>
                       </li>
                   {
                       Profile.isSeller && (
                           <h2>
                               <div>
                                   <label htmlFor='name'>name</label>
                                   <input id='nameseller' type='text'  placeholder='Ente seller name' value={nameseller} onChange={(e)=>setnameseller(e.target.value)}></input>
                               </div>
                               <div>
                                   <label htmlFor='name'>Logo</label>
                                   <input id='nameseller' type='text' value={logoseller} placeholder='Ente seller name' onChange={(e)=>setlogoseller(e.target.value)}></input>
                               </div>
                               <div>
                                   <label htmlFor='name'>Description</label>
                                   <input id='nameseller' type='text' value={descripseller} placeholder='Ente seller name' onChange={(e)=>setdescripseller(e.target.value)}></input>
                               </div>
                           </h2>
                       )
                   }
                   <label/>
                   <button type='submit' className='primary'>profile</button>
                   </ul>
             


}
               </form>

           </div>
       </div>

    )

}