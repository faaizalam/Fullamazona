// import express from 'express'
// import expressAsyncHandler from 'express-async-handler';
// import data from '../data.js';
// import Products from '../Models/ProduuctModels.js';
// import { isAdmin, isAuth } from '../Utils.js';


// const Created= express.Router();
// Created.post('/',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
//     const tt= new Products({
//         name:'sample name' + Date.now(),
//         image:'/images/p1.jpg',
//         price:0,
//         category:'sample category',
//         brand:'sample brand',
//         countInStock:0,
//         rating:0,
//         numReviews:0,
//         description:'sample description',
        
//     })
//     const createdprod = await tt.save()
//     res.send({tt:createdprod})
    


// }))
// export default Created