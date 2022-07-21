import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Products from '../Models/ProduuctModels.js';
import { isAdmin, isAuth, isSellerOrAdmin } from '../Utils.js';


const ProRouter= express.Router();

ProRouter.get('/catogeries',expressAsyncHandler(async(req,res)=>{
    const cat=await Products.find().distinct('category')
    res.send(cat)

}))
ProRouter.get('/',expressAsyncHandler(async(req,res)=>{
    // const { name }=req.query||''
    const name=req.query.name
    const category=req.query.category||''
    const max=req.query.max?Number(req.query.max):0
    const min=req.query.min?Number(req.query.min):0
    const rating=req.query.rating?Number(req.query.rating):0
   const names= name?{name:{$regex:name,$options:'i'}}:{}
   const ratings=rating?{rating:{$gte:rating}}:{}
   const cat= category?{category}:{}
   const lowhigh=req.query.lowhigh||''
   const lowhighfinal=lowhigh==='lowest'?{price:1}:lowhigh==='highest'?{price:-1}:lowhigh==='toprated'?{rating:-1}:{_id:-1}

   const maxfil=min && max?{price:{$gte:min,$lte:max}}:{}
   
//    const  categorys=category?{category}:{}
    const creresponse = await Products.find({
        ...names,
        ...cat,
        ...maxfil,
        ...ratings,
  
    }).populate('seller').sort(lowhighfinal)
    res.send(creresponse)
    
}))





const pageSize_p=15;

ProRouter.get('/admin',isAuth,isSellerOrAdmin,expressAsyncHandler(async(req,res)=>{
    const seller=req.query.seller||''
    const { query } =req;
    const page = query.page || 1
    const pagesizee=pageSize_p
    
    const product = await Products.find(seller?{seller}:{})
    .skip(pagesizee * (page -1))
    .limit(pagesizee)
    
    const countproduct=await Products.find(seller?{seller}:{}).countDocuments()
    res.send({
        
        product,
        countproduct,
        page,
        pages:Math.ceil(countproduct/pagesizee)
    })
   
    
}))


ProRouter.get('/seed',expressAsyncHandler(async(req,res)=>{
    const creresponse = await Products.insertMany(data.products)
    res.send(creresponse)
    
}))
ProRouter.get('/:id',expressAsyncHandler(async(req,res)=>{
    const creresponse = await Products.findById(req.params.id).populate('seller')
   if (creresponse) {
       res.status(200).send(creresponse)
       
   }else{
       res.status(404).send({message:'product not found'})
   }
    
}))

ProRouter.delete('/delete/:id',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
    const resss=await Products.findByIdAndDelete(req.params.id)
    if (resss) {
        // const deletes=await Products.remove();
        res.send(resss)
    }else{
        res.status(404).send({message:'not found'})
    }

}))

ProRouter.post('/created',isAuth,isSellerOrAdmin,expressAsyncHandler(async(req,res)=>{
    const tt= new Products({
        name:'sample name' + Date.now(),
        seller:req.user._id,
        image:'/images/p1.jpg',
        price:0,
        category:'sample category',
        brand:'sample brand',
        countInStock:0,
        rating:5,
        numReviews:0,
        description:'sample description',
        
    })
    const createdprod = await tt.save()
    res.send(createdprod)
    


}))


ProRouter.put('/:id',isAuth,isSellerOrAdmin,expressAsyncHandler(async(req,res)=>{
    const updateprod= await Products.findById(req.params.id)
    if(updateprod){
        updateprod.name=req.body.name||updateprod.name,  
        updateprod.image=req.body.image||updateprod.image,
        updateprod.images=req.body.images,
        updateprod.price=req.body.price,
        updateprod.category=req.body.category||updateprod.category,
        updateprod.brand=req.body.brand||updateprod.brand,
        updateprod.countInStock=req.body.countInStock||updateprod.countInStock
        updateprod.rating=req.body.rating||updateprod.rating,
        updateprod.numReviews=req.body.numReviews||updateprod.numReviews,
        updateprod.description=req.body.description||updateprod.description
        const updated= await updateprod.save()
        res.send({updateprod:updated})
        
    }else{
        res.status(404).send({message:'product not found'})
    }

}))


ProRouter.post('/:id/review',isAuth,expressAsyncHandler(async(req,res)=>{
    const commntres=await Products.findById(req.params.id)
    if (commntres) {
        const review={
      name:req.body.name,
      rating:req.body.rating,
      comments:req.body.comments,
    
        
        
        }
        commntres.reviews.push(review)
        commntres.numReviews=commntres.reviews.length
        commntres.rating=commntres.reviews.reduce((a,c)=>a+c.rating,0)/commntres.reviews.length
        const updatedpro=await commntres.save()
        res.status(201).send({message:"updated",review:updatedpro.reviews[updatedpro.reviews.length-1]})
        
    }else{
        res.status(404).send({message:'product not found'})
    }

}))



ProRouter.post('/:id/Like',isAuth,expressAsyncHandler(async(req,res)=>{
    const commntres=await Products.findById(req.params.id)
      console.log(req.body.like)
      console.log(req.body.userid)
      
    if (commntres) {
    //    const c= commntres.Like.find((x)=>x.userid===req.body.userid)
    //    console.log(c)
        if (commntres.Like.find((x)=>x.userid===req.body.userid)) {
            commntres.Like=[...commntres.Like.filter((x)=>x.userid!==req.body.userid)]
        
     console.log(commntres.Like);
            commntres.save()
             res.status(201).send({message:"been unliked"})
             return
            
        }else{

            const Like={
            like:req.body.like,
            userid:req.body.userid
            
        }
        commntres.Like.push(Like)
      const savelike= commntres.save()
      res.status(200).send(savelike)
 
}
}else{
        res.status(404).send({message:'product not found'})
    }

}))




export default ProRouter;

