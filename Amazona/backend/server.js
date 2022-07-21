import express from 'express'
import http from "http"
import mongoose  from 'mongoose'
import dotenv from 'dotenv'
import UserRoutes from './Routers/UserRouter.js'
import ProRouter from './Routers/ProductRouter.js'
import Orderrouter from './Routers/OrderRouter.js'
import uploadRouter from './Routers/UploadsRouter.js'
import path from 'path'

import {Server} from "socket.io"
// import { Socket } from 'net'
// import Created from './Routers/Created.js'
const app =express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

dotenv.config()
const connect =mongoose.connect(process.env.MONGODB_URL||'mongodb://localhost/Amazonareact').then(()=>{
    console.log('connected');
}).catch((err)=>{
    console.log(err)
    
})


// app.get('/postman/products/:id',(req,res)=>{
    //     const product= data.products.find((x)=>x._id===req.params.id)
    //     if (product) {
        //         res.send(product)

        //     }else{
            //         res.status(404).send({message:'product not found'})
            //     }
// })
// app.get('/postman/products',(req,res)=>{
    //     res.send(data.products)
    // })
    app.use('/postman/users',UserRoutes)
    app.use('/postman/products',ProRouter)
    // app.use('/postman/created',Created)
    app.use('/postman/orders',Orderrouter)
    app.use('/postman/uploads',uploadRouter)
    app.get('/postman/config/paypal',(req,res)=>{
        
        res.send(process.env.PAYPAL_CLEINT_ID||'sb')
    
    })
    const __dirname=path.resolve()
    app.use('/uploads',express.static(path.join(__dirname,'/uploads')))
app.use(express.static(path.join(__dirname,'/frontend/build')))
app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'/frontend/build/index.html')))
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})

const port =process.env.PORT || 5000
// app.listen(port,()=>{
    //     console.log(`http://localhost:${port}`);
    
    // })
    // const http = require('http');
    const httpserver = http.Server(app);
    const io = new Server(httpserver,{cors:{origin:'*'}});
    // const server = http.createServer(app);
   const users=[]
   io.on('connection',(socket)=>{
    console.log("working",socket.id)
    socket.on('disconnect',()=>{
        const user=users.find((x)=>x.socketid===socket.id)
       if(user){
        user.online=false
       }
       const admin=users.find((x)=>x.isAdmin && x.online)
       if (admin) {
        
           io.to(admin.socketId).emit('updated',user)
       }
    })

socket.on('onLogin',(user)=>{
    const updateduser={
        ...user,
        messages:[],
        socketId:socket.id,
        online:true
    }
    const existuser=users.find((x)=>x._id===updateduser._id)
       if (existuser) {
        existuser.socketId=socket.id,
        existuser.online=true
        
       }else{
        users.push(updateduser)
       }
    
    //    console.log(users)
       const admin=users.find((x)=>x.isAdmin && x.online)
       if (admin) {
        io.to(admin.socketId).emit('updated',updateduser)
           
       }
       if (updateduser.isAdmin) {
           io.to(updateduser.socketId).emit('listuser',users)
        
       }
       console.log(users)
    })
   socket.on('onUserSelected',(selectdata)=>{
     
    const admin=users.find((x)=>x.isAdmin && x.online)
    if (admin) {
        const existuser=users.find((x)=>x._id===selectdata._id)
        io.to(admin.socketId).emit('selectedusers',existuser)
        
    }


   })


   socket.on('Onmessage',(message)=>{
       console.log(message)
    //    console.log(users)
       if (message.isAdmin) {
    
        const usermsg=users.find((x)=>x._id===message._id && x.online)
        // console.log(message._id)
        if (usermsg) {
            io.to(usermsg.socketId).emit('msg',message)
            usermsg.messages.push(message)
        }
        }else{
             const admin = users.find((x)=>x.isAdmin && x.online)
             if (admin) {
                io.to(admin.socketId).emit('msg',message)
                console.log(message)
                const userss=users.find((x)=>x._id===message._id && x.online)
                userss.messages.push(message)
                
            }else{
                io.to(socket.id).emit('msg',{
                    name: 'Admin',
                    body:'sorry i am not online right now'
                })
             }
    
        }
        console.log(users)
    }


   )
   




})

















    
    httpserver.listen(port,() => {
        
        console.log(`http://localhost:${port}`);
    
    });