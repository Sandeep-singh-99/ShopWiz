const express = require('express');
const verifyToken = require('../middleware/jwt-verification');
const { addToCart, countAddToCartProduct, addToCartViewProduct, updateCartProduct, deleteCart } = require('../controller/cart-controller');
const router = express.Router();

router.route('/addtocart').post(verifyToken, addToCart)
router.route('/countAddToCartProduct').get(verifyToken, countAddToCartProduct)
router.route("/view-cart-product").get(verifyToken, addToCartViewProduct)
router.route("/update-cart-product").put(verifyToken, updateCartProduct)
router.route("/delete-cart-product").delete(verifyToken, deleteCart)


module.exports = router;