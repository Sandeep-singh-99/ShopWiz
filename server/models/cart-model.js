const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
    userId: String,
    quantity: Number,
    productId: {
        ref: 'product',
        type: String,
    }
}, {
    timestamps: true
})

const Cart = new model("cart", cartSchema)

module.exports = Cart