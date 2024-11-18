const express = require('express')
const router = express.Router()

const productController = require('../controller/product-controller')

const upload = require('../middleware/uploadMiddleware')

router.route('/addProduct').post(upload.array('productImages') ,productController.addProduct)

router.route('/getProduct').post(productController.getProducts)

router.route('/deleteProduct/:id').delete(productController.deleteProduct)

router.route('/updateProduct/:id').put(productController.updateProduct)

module.exports = router
