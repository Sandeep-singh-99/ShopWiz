const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    productName: {
        type: String,
        required: true
    },

    productBrand: {
        type: String,
        required: true
    },

    productPrice: {
        type: Number,
        required: true
    },

    productDescription: {
        type: String,
        required: true
    },

    productCategory: {
        type: String,
        required: true
    },

    productImage: {
        type: [String],
        required: true
    },

    cloudinaryId: {
        type: [String],
    }
})

const Product = new model("product", productSchema)

module.exports = Product