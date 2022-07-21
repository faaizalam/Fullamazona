// import { userInfo } from 'os'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import socketIOClient from "socket.io-client"


import ContactSupportIcon from '@material-ui/icons/ContactSupport';

export const Chatbox = () => {
    const endpoint = window.location.host.indexOf('localhost')>=0?'http://127.0.0.1:5000':window.location.host
    const [socket,setsokect]=useState(null)
    const [isopen,setisopen]=useState(false)

    const [msg,setmsgs]=useState([{name:'admin',body:"hello there ask your Q"}])
    const [msgbody,setmsgsbidy]=useState('')
    const userSig= useSelector(state=>state.UseSigin)
    const {userInfo}=userSig

    useEffect(()=>{
        if (socket) {
          socket.emit('onLogin',{
            name:userInfo.name,
            _id:userInfo._id,
            isAdmin:userInfo.isAdmin
            
          })
          // const sk=socketIOClient(endpoint)
          //  setsokect(sk)
             socket.on('msg',(data)=>{
                 setmsgs([...msg,{body:data.body,name:data.name}])
                 
                })
                
            }
    },[ msg, socket, userInfo])
    
    const suuporthand=()=>{
    setisopen(true)
    const sk=socketIOClient(endpoint)
    setsokect(sk)
}


   const subhand =((e)=>{
       e.preventDefault()
    
    
    if (!msgbody.trim()) {
        alert("kindly write")
        
    }else{
        
        setmsgs([...msg,{body:msgbody,name:userInfo.name}])
        setmsgsbidy('')
    setTimeout(()=>{
   socket.emit('Onmessage',{
    body:msgbody,
    name:userInfo.name,
    isAdmin:userInfo.isAdmin,
    _id:userInfo._id

     


   })



    },1000)






   }



   })
      
const closehand=()=>{
    setisopen(false)
}


  return (
    

    <div className='chatbox'>
       {
        !isopen?(
            <button type='button' onClick={suuporthand}>
                <i class="fa-comments-question-check"></i>
               {/* <i class="fa-brands fa-weibo"></i> */}
            
               <i class="fas fa-headset"></i>
               <ContactSupportIcon/>

            </button>
        ):(
            <div className='inchat'>
                <h4>suport</h4>
                <button type='button' onClick={closehand}>
                <i className='fa fa-close'></i>
            </button>
            <ul>
                {
                    msg.map((x,index)=>(
                        <li key={index}>
                            <strong>{`${x.name}`}</strong>{x.body}

                        </li>
                    ))
                }
            </ul>
            <form onSubmit={subhand}>
                <input type='text' placeholder='ask your thought' value={msgbody} onChange={(e)=>setmsgsbidy(e.target.value)}  ></input>
              <button type='submit'>send</button>
            </form>
        </div>
        )
       }
    </div>
    



  )
}
