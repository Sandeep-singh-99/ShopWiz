const Product = require("../models/product-model");

const fetchProductById = async (req, res)  => {
    try {
        const { id } = req.params;

        const fetchProduct = await Product.findById(id);

        if (!fetchProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: fetchProduct,
            message: "Product fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = fetchProductById;