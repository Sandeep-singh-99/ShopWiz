const express = require('express');
const router = express.Router();

const cartController = require('../controller/cart-controller');

router.route('/addCart').post(cartController.addCart);
router.route('/cart/:userId').get(cartController.getCart);
router.route('/cart/:id').delete(cartController.deleteCart);
router.route('/cart').put(cartController.updateCart);

module.exports = router;