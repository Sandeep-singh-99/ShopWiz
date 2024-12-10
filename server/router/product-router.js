const express = require('express')
const router = express.Router()

const productController = require('../controller/product-controller')

const upload = require('../middleware/uploadMiddleware')
const fetchProductById = require('../controller/fetchProductById')

router.route('/addProduct').post(upload.array('productImages') ,productController.addProduct)

router.route('/getProduct').post(productController.getProducts)

router.route('/deleteProduct/:id').delete(productController.deleteProduct)

router.route('/updateProduct/:id').put(upload.any("productImages") ,productController.updateProduct)

router.route('/getProductById/:id').get(fetchProductById)

module.exports = router
