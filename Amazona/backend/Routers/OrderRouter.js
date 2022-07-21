import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Order from '../Models/Ordermodels.js';
import Products from '../Models/ProduuctModels.js';
import User from '../Models/Usermodle.js';
import { isAdmin, isAuth, isSellerOrAdmin, mailgun, payorderTem } from '../Utils.js';

const Orderrouter = express.Router()

Orderrouter.get('/listorderadmin',isAuth,isSellerOrAdmin,expressAsyncHandler(async (req,res)=>{
    const { seller }=req.query;
    const response = await Order.find(seller?{seller}:{}).populate('user')
    res.send(response)


}))

Orderrouter.get('/chart',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
    const Orderchart=await Order.aggregate([

        {
            $group:{
                _id:null,
                NumOforder:{$sum:1},
                TotalSales:{$sum: '$totalprice'}, 
            }
        }
       



    ])

    
    
    const userChart=await User.aggregate([
    
        { 
            $group:{
                _id:null,
                TotalUser:{$sum:1},

            }

        }

  

    ])
    const  Dailyorders = await Order.aggregate([
    
        { 
            $group:{
                _id:{$dateToString:{format:'%Y-%m-%d',date:'$createdAt'}},
                // orders:{$sum:1},
                sales:{$sum: '$totalprice'}

            }
            

        },
        {
            $sort:{_id:1}
        }

  

    ])

    const Categorychart=await Products.aggregate([


  {
    $group:{
        _id:'$category',
        count:{ $sum:1 },
        sales:{$sum:'$totalprice'}
    }
  }

    ])
    res.send({userChart,Categorychart,Dailyorders,Orderchart})
})
)




Orderrouter.get('/list',isAuth,expressAsyncHandler(async (req,res)=>{
    const response = await Order.find({user:req.user._id})
    res.send(response)


}))
   
Orderrouter.post('/',isAuth,expressAsyncHandler(async(req,res)=>{

 

     if (req.body.OrderItem.lenght===0) {
         res.status(400).send({message:'cart is Empty'})
         
     }else{
      
        const order = new Order({
            seller:req.body.OrderItem[0].seller,
            OrderItem:req.body.OrderItem,
            shipping:req.body.shipping,
            paymentmethod:req.body.paymentmethod,
            itemprice:req.body.itemprice,
            Shippingprice:req.body.Shippingprice,
            taxprice:req.body.taxprice,
            totalprice:req.body.totalprice,
            user:req.user._id
        

        })
        const createdorder= await order.save()
        res.status(201).send({message:'new created', order:createdorder})

     }

    }))

    Orderrouter.get('/:id',isAuth,expressAsyncHandler(async(req,res)=>{

        const responseorder = await Order.findById(req.params.id)
        if (responseorder) {
            res.status(201).send(responseorder)
            
        }else{
            res.status(404).send({message:'not found'})
        }


    }))


   Orderrouter.put('/:id/pay',isAuth,expressAsyncHandler(async(req,res)=>{
         const update= await Order.findById(req.params.id).populate('user','email name')
         if(update){
             update.isPaid=true;
             update.paidAt=Date.now()
             update.paymentresult={id:req.body.id,status:req.body.status,update_time:req.body.update_time,email_address:req.body.email}
             
             const saveupdate= await update.save()
             try {
                
                 mailgun().messages().send({
                  from:'faaiz alam <amazona@mg.yourdomain.com>',
                  to: `${update.user.name} , ${update.user.email}`,
                  subject:`New order ${update._id}`,
                  html:payorderTem(update)
                 },(err,body)=>{
                  if(err){
                      console.log(err)
                  }else{
                      console.log(body)
                      console.log(payorderTem(update))
                  }
                 })
             } catch (error) {
                console.log(error)
                
             }




            res.status(200).send({message:'update',update:saveupdate})
         }
         
         else{
             res.status(401).send({message:'not found'})
         }


   }))

Orderrouter.delete('/:id',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{

    const respfind= await Order.findByIdAndDelete(req.params.id)
     res.send(respfind)

}))


Orderrouter.put('/:id/delivered',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
    const delicheck=await Order.findById(req.params.id)
    if (delicheck) {
        delicheck.isDliverd=true
        delicheck.DliverdAt=Date.now()
        const resultdeli = await delicheck.save()
        res.send(resultdeli)
        
    }else{
        res.status(401).send({message:'not found order'})
    }


}))




export default Orderrouter;