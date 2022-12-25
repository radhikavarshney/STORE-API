const Product = require('../models/product')


const getAllProductsStatic = async (req,res)=>{
    // throw new Error('testing async error')
    const search = 'a'
    const products = await Product.find({
        // name: { $regex: search , $options :'i'}
        //i is for denoting case insensitive
    }).select('name price').limit(21)
    // .sort('-name price')
    res.status(200).json({products, nbHits: products.length})
}

const getAllProducts = async (req,res)=>{
    const {featured,company,name,sort,fields}= req.query
    const queryObject= {}
    if(company){
        queryObject.company = company 

    }
    if(name){
        queryObject.name = { $regex: name , $options :'i'}

    }
    if(featured){
    queryObject.featured = featured === 'true' ? true :false
}  
// console.log(queryObject);
    let result =Product.find(queryObject)
    if(sort){
        const sortList = sort.split(',').join(' ')
        result =result.sort(sortList)
    }
    else{
        result =result.sort('createdAt')
    }

    if(fields){
            const fieldsList = fields.split(',').join(' ')
            result =result.select(fieldsList)
        }
    const products = await result
    res.status(200).json({products, nbHits: products.length})
} 

module.exports = {
    getAllProductsStatic,
    getAllProducts
}