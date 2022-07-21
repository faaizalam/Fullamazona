import jwt from 'jsonwebtoken'
 import mg from 'mailgun-js'

export const generateToken=((user)=>{

   return jwt.sign({
        _id:user._id,
        name:user.name,
        email:user.email,
        isSeller:user.isSeller,
        isAdmin:user.isAdmin,
        seller:user.seller,
    },process.env.JWT_SECRET || 'somethingsecret',{ expiresIn:'30d'})

})

 export const isAuth =(req,res,next)=>{
     const authorization=req.headers.authorization
     if (authorization) {
          const token =authorization.slice(7,authorization.length) 
         // Bearer xxxxxx  slice  method removse 7 word of start or gap Bearer is 6 and 1 is gap
         jwt.verify(token,process.env.JWT_SECRET || 'somethingsecret',(err,decode)=>{
             if (err) {
                 res.status(404).send({message:'invalid token'})
                 
                 
                 
             }else{
                 req.user=decode; 
                 next()
          // req.user is equal to decode which has all inform about user by verifying jwt and by using is
          // by using isAuth on orderrouter req.user_id or anything you want be filled
             }

         })
         
     }else{
         res.status(401).send({message:"no token"})
     }

 }

 export const isAdmin =(req,res,next)=>{
     if (req.user && req.user.isAdmin) {
         next();
         
     }else{
        res.status(401).send({message:"no Admin"})

     }

 }
 

 export const iSeller=((req,res,next)=>{
     if(req.user && req.user.seller){
         next()

     }else{
         res.status(401).send({message:'user or seller is not valid'})
     }


 })

 export const isSellerOrAdmin=((req,res,next)=>{
     if (req.user&& (req.user.isSeller || req.user.isAdmin)) {

       next()
         
     }else{
       res.status(401).send({message:'invalid admin or seller'})
     }
 })

 export const mailgun=()=>mg({
    apiKey:process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
 })
//  console.log(process.env.JWT_SECRET)

export const payorderTem=((x)=>{
    return `<h1>Thanks for shopping with us</h1>
    <p>
    Hi ${x.user.name}</p>
    <p>order has been placed</p>
    <p>${x._id} (${x.createdAt.toString().substring(0, 10)})</p>
    <p>Price  ${x.itemprice} </p>
    <p>totalprice  ${x.totalprice} </p>
    
    
    ${
        x.OrderItem.map((x)=>`
        <div>
         ${x.name}
         </div>
        
        `
     
)}
    
    `
})