const multer = require('multer');

const { storage } = require('../config/cloudinaryConfig');

const upload = multer({ storage: storage });

module.exports = upload;
