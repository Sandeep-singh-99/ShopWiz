const express = require('express');
const { addComment, viewComment } = require('../controller/comment-controller');
const verifyToken = require('../middleware/jwt-verification');
const router = express.Router()

router.route("/add-Comment").post(verifyToken ,addComment)

router.route("/view-comment/:productId").get(viewComment)

module.exports = router