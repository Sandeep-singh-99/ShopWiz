const express = require('express');
const router = express.Router();

const getProductCategoryWise = require('../controller/getProductCategoryWise');

router.route('/categorywise').get(getProductCategoryWise);

module.exports = router;