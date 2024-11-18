const Product = require("../models/product-model");

const addProduct = async (req, res) => {
    try {
        // Ensure the uploaded images are correctly processed into an array
        const productImages = req.files ? req.files.map(file => file.path) : [];
        const cloudinaryIds = req.files ? req.files.map(file => file.filename) : [];

        const { productName, productBrand, productPrice, productDescription, productCategory } = req.body;

        const newProduct = await Product.create({
            productName, 
            productBrand, 
            productPrice, 
            productDescription, 
            productCategory, 
            productImage: productImages, // Store array of image paths
            cloudinaryId: cloudinaryIds // Store array of cloudinary ids
        });

        res.status(201).json({
            message: "Product added successfully",
            success: true,
            data: newProduct
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
}


const getProducts = async (req, res) => {
    try {
        const getProducts = await Product.find();

        res.status(200).json({
            message: "Products fetched successfully",
            success: true,
            data: getProducts
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const delProduct = await Product.findByIdAndDelete(id);

        res.status(200).json({
            message: "Product deleted successfully",
            success: true,
            data: delProduct
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Handle file uploads for updating images
        const productImages = req.files ? req.files.map(file => file.path) : [];
        const cloudinaryIds = req.files ? req.files.map(file => file.filename) : [];

        const { productName, productBrand, productPrice, productDescription, productCategory } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(id, {
            productName, 
            productBrand, 
            productPrice, 
            productDescription, 
            productCategory, 
            productImage: productImages, 
            cloudinaryId: cloudinaryIds
        }, { new: true });

        res.status(200).json({
            message: "Product updated successfully",
            success: true,
            data: updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
}


module.exports = {
    addProduct,
    getProducts,
    deleteProduct,
    updateProduct
}