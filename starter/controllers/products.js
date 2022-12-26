const Product = require('../models/product')


const getAllProductsStatic = async (req,res)=>{
    // throw new Error('testing async error')
    const search = 'a'
    const products = await Product.find({ price: {$gt:30}
        // name: { $regex: search , $options :'i'}
        //i is for denoting case insensitive
    }).select('name price').sort('price')
    // .limit(2)
    // .skip (1)
    // .sort('-name price')
    res.status(200).json({products, nbHits: products.length})
}

const getAllProducts = async (req,res)=>{
    const {featured,company,name,sort,fields,numericFilters}= req.query
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


if(numericFilters){
    // console.log(numericFilters)
    const operatorMap = {
        '<': '$lt',
        '<=': '$lte',
        '=': '$eq',
        '>': '$gt',
        '>=': '$gte',
    }
    const regEx= /\b(<|>|>=|=|<=)\b/g
    let filters = numericFilters.replace(regEx,(match)=>
        `-${operatorMap[match]}-`
    )
    
    const options = ['price','rating']
    filters = filters.split(',').forEach((item)=>{
        const [field,operator,value]= item.split('-')

        if(options.includes(field)){
            queryObject[field]= {[operator]:Number(value)}
        }
    })

    console.log(filters);
    
}


console.log(queryObject);
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
        const page = Number(req.query.page)|| 1;
        const limit = Number(req.query.limit)||30
        const skip = (page-1)*limit

        result =result.skip(skip).limit(limit)
    const products = await result
    res.status(200).json({products, nbHits: products.length})
} 

module.exports = {
    getAllProductsStatic,
    getAllProducts
}