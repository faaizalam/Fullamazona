import mongoose from 'mongoose'


const UserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,default:false,required:true},
    isSeller:{type:Boolean,default:false,required:true},
    seller:{
        name:{type:String},
        logo:{type:String },
        description:{type:String},
        numReview:{type:Number,default:0},
        rating:{type:Number,default:0},
    }

},{
    timestamps:true
})

const User=mongoose.model('User',UserSchema)
export default User;