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

    salesPrice: {
        type: Number,
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
        default: [],
    },

    imageKitProductId: {
        type: [String],
        default: [],
    }
},{timestamps: true})

productSchema.pre('save', function (next) {
    this.salesPrice = parseFloat(this.salesPrice).toFixed(2)
    this.productPrice = parseFloat(this.productPrice).toFixed(2)
    next()
})

const Product = new model("Product", productSchema)

module.exports = Product