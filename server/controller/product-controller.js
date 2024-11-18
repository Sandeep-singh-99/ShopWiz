const Product = require("../models/product-model");

const addProduct = async (req, res) => {
    try {
        const productImage = req.file ? req.file.path : null;
        const cloudinaryId = req.file ? req.file.filename : null;
        const { productName, productBrand, productPrice, productDescription, productCategory } = req.body;

        const newProduct = await Product.create({ productName, productBrand, productPrice, productDescription, productCategory, productImage, cloudinaryId });

        res.status(201).json({
            message: "Product added successfully",
            success: true,
            data: newProduct
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
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

        const productImage = req.file ? req.file.path : null;
        const cloudinaryId = req.file ? req.file.filename : null;

        const { productName, productBrand, productPrice, productDescription, productCategory } = req.body;

        const updateProduct = await Product.findByIdAndUpdate(id, { productName, productBrand, productPrice, productDescription, productCategory, productImage, cloudinaryId }, { new: true });

        res.status(200).json({
            message: "Product updated successfully",
            success: true,
            data: updateProduct
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

module.exports = {
    addProduct,
    getProducts,
    deleteProduct,
    updateProduct
}