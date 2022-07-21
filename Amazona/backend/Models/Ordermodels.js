
import mongoose from 'mongoose'

const OrderShema = new mongoose.Schema({
    OrderItem:[{
        name:{type:String,required:true},
        qty:{type:Number,required:true},
        image:{type:String,required:true},
        price:{type:Number,required:true},
        product:{type: mongoose.Schema.Types.ObjectId, ref:'Products', required:true},
    }],
    shipping:{
        fullname:{type:String,required:true},
        address:{type:String,required:true},
        postalcode:{type:String,required:true},
        city:{type:String,required:true},
        country:{type:String,required:true},

    },
    paymentmethod:{
        payment:{type:String,required:true}
    },
    paymentresult:{
        id:{type:String},
        status:{type:String}
        ,update_time:{type:String}
        ,email_address:{type:String}

    },
   
    itemprice:{type:String,required:true},
    Shippingprice:{type:Number,required:true},
    taxprice:{type:Number,required:true},
    totalprice:{type:Number,required:true},
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
    seller:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    isPaid:{type:Boolean,default:false},
    paidAt:{type:Date},
    isDliverd:{type:Boolean,default:false},
    DliverdAt:{type:Date},

},{timestamps:true,})

const Order = mongoose.model('Odrer',OrderShema)

export default Order;