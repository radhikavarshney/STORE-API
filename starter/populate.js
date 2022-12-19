require('dotenv').config()

const connectDB = require("./db/connect")
const Products= require('./models/product')

const jsonProduct = require('./products.json')


const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        console.log("success!!!!");
    }catch(error){
        console.log(error)
    }
}

start()