const Product = require("../models/product-model");

const getProductCategoryWise = async (req, res) => {
    try {
        const { category } = req.params;
       // console.log("category", category);
        

        if (!category) {
            return res.status(400).json({
                success: false,
                message: "Category is required"
            });
        }

        const categories = category.split(",");

        const products = await Product.find({ productCategory: {$in: categories} })

        if (products.length === 0) {
            return res.status(404).json({
              success: false,
              message: "No products found in this category",
              data: []
            });
          }
          

        res.status(200).json({
            success: true,
            data: products,
            message: "Products found successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = getProductCategoryWise;