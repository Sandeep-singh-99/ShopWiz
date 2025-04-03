const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
    userId: {
        ref: 'auth',
        type: String,
    },
    quantity: Number,
    productId: {
        ref: 'product',
        type: String,
    }
}, {
    timestamps: true
})

const Cart = new model("Cart", cartSchema)

module.exports = Cart