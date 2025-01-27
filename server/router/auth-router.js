const express = require('express');
const router = express.Router();

const authController = require('../controller/auth-controller');

const authMiddleware = require('../middleware/jwt-verification');
const upload = require('../middleware/uploadMiddleware');


router.route('/register').post(upload.single('file') ,authController.register)
router.route('/login').post(authController.Login)
router.route('/logout').get(authMiddleware, authController.Logout)
router.route('/admin-login').post(authController.adminLogin)

router.route('/check-auth').get(authMiddleware, authController.checkAuth)

module.exports = router;


