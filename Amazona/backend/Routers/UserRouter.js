import express from 'express';
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
// import data from '../data.js';
import User from '../Models/Usermodle.js';
import { generateToken, isAdmin, isAuth, iSeller } from '../Utils.js';
import data from '../data.js';

const UserRoutes=express.Router();

UserRoutes.get('/Topseller',expressAsyncHandler(async(req,res)=>{
   const Topsellers= await User.find({isSeller:true}).sort({'seller.rating':-1}).limit(3)
    res.send(Topsellers)

}))




 const page_limit=3;
UserRoutes.get('/userlists',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
    //  const page_limit=page_limit 
    const { page }=req.query
    const responsesss= await User.find({}).skip(page_limit * (page -1)).limit(page_limit)
    const totaluser= await User.count()
    const pages=Math.ceil(totaluser/page_limit)
    res.send({
        responsesss,
        page,
        totaluser,
        pages

    })
//   res.send(responsesss)
    // const userlist=
  

}))


UserRoutes.get('/seed',expressAsyncHandler(async(req,res)=>{
   const response = await User.insertMany(data.users)
    res.send(response)
}))

UserRoutes.post('/signin',expressAsyncHandler(async(req,res)=>{
      const user =  await User.findOne({email:req.body.email })
      if (user) {
          if(bcrypt.compareSync(req.body.password,user.password)){
              res.send({
                  _id:user._id,
                  name:user.name,
                  email:user.email,
                  isAdmin:user.isAdmin,
                  isSeller:user.isSeller,
                  seller:user.seller,
                  token:generateToken(user)
              })
              return;
          }          
      }
      res.status(401).send({message:'invalid user or password'})

}))

UserRoutes.post('/register',expressAsyncHandler(async(req,res)=>{
    const Newuser= new User({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,8)
       

    })
    const createduser = await Newuser.save()

        
        res.send({
            _id:createduser._id,
            name:createduser.name,
            email:createduser.eamil,
            isAdmin:createduser.isAdmin,
            isSeller:createduser.isSeller,
            seller:createduser.seller,
            token:generateToken(createduser)
        })
    
    


}))

 UserRoutes.get('/:id',expressAsyncHandler(async(req,res)=>{
     const response = await User.findById(req.params.id)
     if (response) {
         res.send(response)
         
         
     }else{
         res.status(404).send({message:'User not found'})
     }

 }))


  UserRoutes.put('/profileupdate',isAuth,expressAsyncHandler(async(req,res)=>{
         const user= await User.findById(req.body.user)
         if (user) {
             
             user.name=req.body.name || user.name
             user.email=req.body.email || user.email
             user.password=bcrypt.hashSync(req.body.password,8)
             if(user.isSeller){
                 user.seller.name=req.body.nameseller||user.seller.name
                 user.seller.logo=req.body.logoseller||user.seller.logo
                 user.seller.description=req.body.descripseller||user.seller.description
                }
                const userproupdated = await user.save()
       
             
             res.send({
                _id:userproupdated._id,
                name:userproupdated.name,
                email:userproupdated.email,
                isAdmin:userproupdated.isAdmin,
                isSeller:userproupdated.isSeller,
                seller:userproupdated.seller,
                token:generateToken(userproupdated)

             })
            

         }else{
             res.status(404).send({message:'invalid data'})
             res.status(11000).send(error.message)


         }




  }))


  
//   UserRoutes.get('/:id',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
//      const respuser=await User.findById(req.params.id)
//      if(respuser){
       
//          res.send(respuser)
         
//         }else{
//          res.status(401).send({message:'Not found'})

//      }


//   }))
  UserRoutes.delete('/:id',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
     const respdeleteuser=await User.findById(req.params.id)
     if(respdeleteuser){
         if(respdeleteuser.email==='Admin@gmail.com'){
             res.status(400).send({message:'cant be deleted Admin'})
             return;
         }
         const delettsuser= await respdeleteuser.remove();
         res.send({message:'user deleted',delettsuser})
         
        }else{
         res.status(401).send({message:'Not found'})

     }


  }))
  UserRoutes.put('/:id',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
     const respupdate=await User.findById(req.params.id)
     if(respupdate){
         if(respupdate.email==='Admin@gmail.com'){
             res.status(400).send({message:'cant be changed'})
             return;
         }
         respupdate.name=req.body.name||respupdate.name;
         respupdate.email=req.body.email||respupdate.email;
         respupdate.isAdmin=req.body.Admin
         respupdate.isSeller=req.body.seller
         const updateduser= await respupdate.save();
         res.send({message:'user updated',updateduser})
         
        }else{
         res.status(401).send({message:'Not found'})

     }


  }))




export default UserRoutes;