const exp = require('express')
const router = exp.Router()

const {getAllProductsStatic,
    getAllProducts}= require('../controllers/products')

    router.route('/').get(getAllProducts)
    router.route('/static').get(getAllProductsStatic)

    module.exports = router