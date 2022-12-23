const Product = require('../models/product')


const getAllProductsStatic = async (req,res)=>{
    // throw new Error('testing async error')
    const products = await Product.find({
        name: 'albany sectional'
    })
    res.status(200).json({products, nbHits: products.length})
}

const getAllProducts = async (req,res)=>{
    const {featured,company,name}= req.query
    const queryObject= {}
    if(company){
        queryObject.company = company 

    }
    if(name){
        queryObject.name = name 

    }
    if(featured){
    queryObject.featured = featured === 'true' ? true :false
}  
console.log(queryObject);
    const products = await Product.find(queryObject)
    res.status(200).json({products, nbHits: products.length})
} 

module.exports = {
    getAllProductsStatic,
    getAllProducts
}