import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Link } from 'react-router-dom'
// import { URLSearchParams } from 'url'
import { useNavigate ,useLocation} from '../../node_modules/react-router-dom/index'
import { RegisterAction } from '../actions/USerActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function Register(props) {
    const navigate =useNavigate()
  const [name,setname,]=useState('')
  const [email,setemail]=useState('')
  const [pass,setpassword]=useState('')
  const [conpass,setconpassword]=useState('')
  const register= useSelector(state=>state.Register)
  const {userInfo,loading,error}=register
 

//   const redirect= props.location.search? props.location.search.split('=')[1]:'/'
const {search}=useLocation()
const regiterUrl=new URLSearchParams(search).get('redirect');
const redirect = regiterUrl?regiterUrl:'/'

  const disptach =useDispatch()
    const submithandle=((e)=>{
        e.preventDefault()
        
            if (pass.length < 5 || pass !== conpass) {
                alert("Sorry! The password is not equal to confirm password or too weak")
         
            }
          
            
        else{

            disptach(RegisterAction({name:name,email:email,password:pass}))
        }

    })
    useEffect(()=>{
       if (userInfo) {

        navigate(redirect)
           
       }
    },[props.history, userInfo, redirect, navigate])
    return (
        <div >
            <form className='forms' onSubmit={submithandle}>
                <div>
                    <h1>Register</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox error={error} />}
                <div>
                    <label htmlFor='name'> Name</label>
                    <input type='text' id='name' placeholder='name' required onChange={(e)=>setname(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='email'> Email address</label>
                    <input type='email' id='email' placeholder='Enter email' required onChange={(e)=>setemail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='password'> password</label>
                    <input type='password' id='password' placeholder='Enter password' required onChange={(e)=>setpassword(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='conpassword'>confirm-password</label>
                    <input type='password' id='con-password' placeholder='confirm password' required onChange={(e)=>setconpassword(e.target.value)} />
                </div>
                <div>
                    <label/>
                    <button className='siginbutoon' type='submit'>Sign up</button>
                </div>
                <div>
                    <label/>
                    <div>Already have an account {''}
                      <Link to='/sigin?redirect=shipping'>Signin</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
