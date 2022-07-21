import mongoose from 'mongoose'

const CommentsScehme=new mongoose.Schema({
  name:{type:String,required:true},
  comments:{type:String,required:true},
  rating:{type:Number,required:true},

},{timestamps:true})
const like=new mongoose.Schema({
 like:{type:Boolean ,default:false},
 userid:{type:String}


},{timestamps:true})

const ProductSchema = new mongoose.Schema({
   name:{type:String,required:true },
   category:{type:String,required:true },
   image:{type:String,required:true },
   seller:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
   images:[String],
   price:{type:Number,required:true },
   brand:{type:String,required:true },
   rating:{type:Number,required:true },
   description:{type:String,required:true },
   numReviews:{type:Number,required:true },
  countInStock:{type:Number,required:true }, 
  reviews:[CommentsScehme],
  Like:[like]
  
},{
    timestamps:true
})

const Products= mongoose.model('Products',ProductSchema)
export default Products;