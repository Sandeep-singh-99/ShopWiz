const cloudinary = require('cloudinary').v2;
const { cloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new cloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp'],
        public_id: (req, file) => file.originalname,
    },
})

module.exports = { cloudinary, storage }