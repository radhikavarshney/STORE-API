const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'products name must be provided']
    },
    price:{
        type: Number,
        required: [true,'products price must be provided']
    },
    featured:{
        type:Boolean,
        default: false
    },
    rating:{
     type:Number,
     default:4.5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        // enum: ['ikea','liddy','caressa','macros']
        values: ['ikea','liddy','caressa','macros']
        ,message:'{VALUE} is not supported'
        
    }
})


module.exports= mongoose.model('Pro', productSchema)