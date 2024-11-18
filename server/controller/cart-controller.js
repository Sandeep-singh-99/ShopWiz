const Cart = require("../models/cart-model"); // Adjust the path as necessary
const Product = require("../models/product-model");

const addCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        let cart = await Cart.findOne({ userId });

        if (cart) {
            // Check if product exists in cart
            let itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);

            if (itemIndex > -1) {
                // Product exists, update quantity
                cart.cartItems[itemIndex].quantity += quantity;
            } else {
                // Add new product
                cart.cartItems.push({ product: productId, quantity });
            }
        } else {
            // No cart for user, create one
            cart = new Cart({
                userId,
                cartItems: [{ product: productId, quantity }]
            });
        }

        await cart.save();

        res.status(201).json({
            message: "Cart updated successfully",
            success: true,
            data: cart
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId }).populate('cartItems.product', 'productName productPrice');

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
                success: false
            });
        }

        res.status(200).json({
            message: "Cart fetched successfully",
            success: true,
            data: cart
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

const deleteCart = async (req, res) => {
    try {
        const { id } = req.params;

        const cart = await Cart.findByIdAndDelete(id);

        res.status(200).json({
            message: "Cart deleted successfully",
            success: true,
            data: cart
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

const updateCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
                success: false
            });
        }

        const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            if (quantity === 0) {
                // Remove item if quantity is 0
                cart.cartItems.splice(itemIndex, 1);
            } else {
                // Update quantity
                cart.cartItems[itemIndex].quantity = quantity;
            }
        } else {
            return res.status(404).json({
                message: "Product not in cart",
                success: false
            });
        }

        await cart.save();

        res.status(200).json({
            message: "Cart updated successfully",
            success: true,
            data: cart
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

module.exports = {
    addCart,
    getCart,
    deleteCart,
    updateCart
};
