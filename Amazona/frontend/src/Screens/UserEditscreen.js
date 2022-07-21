import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useParams } from 'react-router-dom'
import { useNavigate } from '../../node_modules/react-router-dom/index'
import { Userinfo, userlistUpdate } from '../actions/USerActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { User_info_Change_reset} from '../constants/USercon'


export const UserEditscreen = () => {

    const [name,setname]=useState('')
    const [email,setemail]=useState('')
    const [seller,setisseller]=useState(false)
    const [Admin,setisAdmin]=useState(false)
    const {id:userid}=useParams()
    const dispatch=useDispatch()
    const {loading,useredit,error}=useSelector((state)=>state.UserInfos)
    const {loading:updateloading,error:updateerror,sucess}=useSelector((state)=>state.UserInfosupdate)
    
    const navigate=useNavigate()
    const useredithandler=(e)=>{
        e.preventDefault()
        dispatch(userlistUpdate({_id:userid,email,name,Admin,seller}))
        console.log(Admin)
        console.log(seller)
        
    }
    useEffect(()=>{
        if (sucess) {
            navigate('/Userslist')
            dispatch({
                type:User_info_Change_reset
            })
            
        }
   
       
       if (!useredit || (useredit._id !==userid) || !useredit.name) {
            dispatch(Userinfo(userid))
            }else{
            setname(useredit.name)
            setemail(useredit.email)
            setisAdmin(useredit.isAdmin)
            setisseller(useredit.isSeller)
            
        }
       
       }, [dispatch, navigate, sucess, useredit, userid])
    
  return (

    <div>

        <div>
            {
              updateloading? <LoadingBox/>:updateerror?<MessageBox error={updateerror}/>: loading?<LoadingBox/>:error?<MessageBox error={error}/>:
            
            <form className='forms' onSubmit={useredithandler}>
                <div>  
                {sucess && <div className='green'>updated</div>}
                    <div>edit user {Admin?'true':'f'} {seller?'true':'f'} {useredit.name}</div>
               
                <label htmlFor='name'>name { useredit._id}</label>
           <input type='name' placeholder='name' value={name} required  onChange={(e)=> setname(e.target.value)}></input>
                <label htmlFor='email'> Email address</label>
           <input type='name' placeholder='email' value={email} required onChange={(e)=>setemail(e.target.value)}></input>
           </div>
           <div>  
           <div>    
           <label htmlFor='admin'> is Admin</label>
           <input type='checkbox' id='admin' name="name"  checked={Admin} onChange={(e)=>setisAdmin(e.target.checked)}/>
          
              

           </div>

           <div>    
           <label htmlFor='admin'> is seller </label>
           <input type='checkbox' id='seller' name="name"  checked={seller} onChange={(e)=>setisseller(e.target.checked)}/>

           </div>
           </div>



           <button>Update</button>

            </form>
}
        </div>
            

    </div>
  )
}
