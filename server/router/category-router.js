const express = require('express');
const router = express.Router();

const getProductCategoryWise = require('../controller/getProductCategoryWise');

router.route('/categorywise/:category').get(getProductCategoryWise);

module.exports = router;