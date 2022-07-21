import multer from 'multer'
import express from 'express';
import { isAuth } from '../Utils.js';

const uploadRouter = express.Router()

const storage = multer.diskStorage({
  destination(req,file,cb){
      cb(null,'upload/')
  },
  filename(req, file, cb){
      cb(null,`${Date.now()}.jpg`)
  }


})

const upload=multer({ storage });

 uploadRouter.post('/',isAuth, upload.single('image'),(req,res)=>{
     res.send(req.file.path)

 })






export default uploadRouter