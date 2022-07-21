import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import socketIOClient from "socket.io-client"

let alluser=[]
let allmsgs=[]
let allselectuser={}
const endpoint=window.location.host.indexOf('localhost')>= 0?'http://127.0.0.1:5000':window.location.host
export const Support = () => {
  
  const [users,setusers]=useState([])
  const [msgs,setmsgstate]=useState([])
  const [msgsbody,setmsgbody]=useState('')
  const [selectuser,setselecteduser]=useState({})
  const userSig= useSelector(state=>state.UseSigin)
  const {userInfo}=userSig
  const [socket,setsocket]=useState(null)
  // eslint-disable-next-line no-unused-expressions
  
     
    useEffect(()=>{
      
        if (!socket) {
            const sk=socketIOClient(endpoint)
            setsocket(sk)
            sk.emit('onLogin',{
                _id:userInfo._id,
                name:userInfo.name,
                isAdmin:userInfo.isAdmin
            })

            sk.on('updated',(data)=>{
              const existuser=alluser.find((x)=>x._id===data._id)
              if (existuser) {
                   alluser.map((x)=>x._id===existuser._id?data:existuser)

                  console.log(data)
              }else{
                alluser=[...alluser,data]
                
              }
             
            })
            sk.on('listuser',(allusers)=>{
              alluser=allusers
          setusers(alluser)


            })
            sk.on('selectedusers',(data)=>{
              allmsgs=data.messages
              setmsgstate(allmsgs)
           
              // setmsgstate([...msgs,{name:alldataofuser.messages.name,body:alldataofuser.messages.body}])
              
              
            })

      sk.on('msg',(data)=>{
        // const g=allselectuser._id
        // const h=data._id
        // console.log(g)
        // console.log(h)
        
        if (allselectuser._id===data._id) {
          allmsgs=[...allmsgs,data]
          setmsgstate(allmsgs)
          console.log(data)
      
         
     

      
 
        //  setmsgstate(best)
      }else{
        const existuser=alluser.find((x)=>x._id===data._id)
        if (existuser) {
          
          alluser=alluser.map((x)=>x._id===data._id?{...x,unread:true}:x)
          
          setusers(alluser)
        }
        
      }
      // setmsgstate(allmsgs)
        
        //  console.log(c);
      
      
    })
    

    
   


         
            
  }
  
  // console.log(allmsgs)
},[socket, userInfo, users, msgs, selectuser])


    
    const select=(choseuser)=>{
      allselectuser=choseuser
      setselecteduser(allselectuser)
      const existuser=alluser.find((x)=>x._id===choseuser._id)
      if (existuser) {
         alluser=alluser.map((x)=>x._id===existuser._id?{...x,unread:false}:x)
        
      }
      setusers(alluser)
      socket.emit('onUserSelected',choseuser)



    }
   
   const subhandler=(e)=>{
    e.preventDefault();
    if(!msgsbody.trim()){
    alert("error,please type")



    }else{
      allmsgs=[...allmsgs,{body:msgsbody,name:userInfo.name}]
      // localStorage.setItem('bism',JSON.stringify(allmsgs))
      // setmsgstate(localStorage.getItem('bism')?JSON.parse(localStorage.getItem('bism')):[])
      
      setmsgstate(allmsgs)
     
      // console.log(s);

      setmsgbody('')
      setTimeout(()=>{
        socket.emit('Onmessage',{
          body:msgsbody,
          name:userInfo.name,
          isAdmin:userInfo.isAdmin,
          _id:selectuser._id,
        })
        
      },1000)
      
      console.log(msgs)

    }
   


   }


  return (
    <div className='side'>
      <div className='users'>
        {
          users.filter((x)=>x._id!==userInfo._id).length===0&&(
            <div>
              NO USER ONLINE RIGHT NOW
              </div>
          )
        }
        <ul>
          {
            users.filter((x)=>x._id!==userInfo._id).map((x)=>(
              <li key={x.name} className={x._id===selectuser._id?'selected':''}>
                <button type='button' onClick={()=>select(x)}>
                  {x.name}

                </button>
                <span className={x.unread?'unread':x.online?'online':'offline'}>
                  status
                  </span>

                

              </li>
            ))
          }
        </ul>











      </div>

      <div className='msg'>
        {
          !selectuser._id?(
            <div> select a user to start chat</div>
          ):(
            <div>
              <div>
              <div className='row'>
                <strong> chat with {selectuser.name}</strong>
                </div>
                <ul>
                  {/* {msgs.length===0 && <li>no message</li> } */}
                  {
                    msgs.map((x)=>(
                      <li key={x._id}>
                        <strong>{`${x.name}`}</strong>{x.body}

                      </li>
                    ))
                  }
                </ul>
              </div>
              <form onSubmit={subhandler}>
                <input type='text' placeholder='type message' value={msgsbody} onChange={(e)=>setmsgbody(e.target.value)} ></input>
                
              </form>
              </div>
          )
        }

      </div>

    </div>
  )
}
