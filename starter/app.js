require('dotenv').config()
require('express-async-errors')

const exp = require('express')
const app = exp()

const connectDB = require('./db/connect')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

const productsRouter = require('./routes/products')


//invoking express
app.use(exp.json())

//routes

app.get(('/'), (req,res)=>{
    res.send('<h1>hella yeah its working bitch </h1><a href="/api/v1/products">Products Route</a>')
})
app.use('/api/v1/products',productsRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000
const start= async()=>{

    await connectDB(process.env.MONGO_URI)
    try {
        app.listen(port, console.log(`user hit the server ${port} `))
    } catch (error) {
        console.log(error);
    }
}

start()



