const Cart = require("../models/cart-model");

const addToCart = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req.user.id;

    if (!currentUser) {
      return res.status(400).json({
        message: "User not authenticated",
        success: false,
      });
    }

    // Check if the product is already in the cart for the current user
    const isProductAvailable = await Cart.findOne({
      productId,
      userId: currentUser,
    });

    if (isProductAvailable) {
      return res.status(400).json({
        message: "Product already added to cart",
        success: false,
      });
    }

    // If not in the cart, create a new cart entry
    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const newAddToCart = await Cart.create(payload);

    res.status(200).json({
      message: "Product added to cart",
      success: true,
      data: newAddToCart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const addToCartViewProduct = async (req, res) => {
  try {
    const currentUser = req.user?.id;

    let allProducts;

    allProducts = await Cart.find({ userId: currentUser })
      .populate("productId")
      .sort({ createdAt: -1 });

    // Check if the cart is empty
    if (!allProducts.length) {
      return res.status(200).json({
        message: "Your cart is empty.",
        success: true,
        data: [],
      });
    }

    res.status(200).json({
      message: "All products in cart",
      success: true,
      data: allProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const deleteCart = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const cartProductId = req.body._id;

    const deleteProduct = await Cart.deleteOne({
      _id: cartProductId,
      userId: currentUserId,
    });

    if (deleteProduct.deletedCount === 0) {
      return res.status(404).json({
        message: "Product not found in cart or not owned by the user",
        success: false,
      });
    }

    res.status(200).json({
      message: "Product deleted from cart",
      success: true,
      data: deleteProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const updateCartProduct = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const cartProductId = req.body._id;
    const quantity = req.body.quantity;

    if (!cartProductId || quantity === undefined) {
      return res
        .status(400)
        .json({ message: "Invalid input data", success: false });
    }

    // Check if the product exists before updating
    const productExists = await Cart.findOne({
      _id: cartProductId,
      userId: currentUserId,
    });
    if (!productExists) {
      return res
        .status(404)
        .json({ message: "Cart product not found", success: false });
    }

    // Update product
    const updateProduct = await Cart.updateOne(
      { _id: cartProductId, userId: currentUserId },
      { $set: { quantity: quantity } }
    );

    if (updateProduct.matchedCount === 0) {
      return res
        .status(404)
        .json({
          message: "Cart product not found or not updated",
          success: false,
        });
    }

    res
      .status(200)
      .json({ message: "Product updated", success: true, data: updateProduct });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const countAddToCartProduct = async (req, res) => {
  try {
    const userId = req.user?.id;
    console.log("Decoded user from request: ", req.user);

    const count = await Cart.countDocuments({ userId });

    res.status(200).json({
      message: "Total products in cart",
      success: true,
      data: count,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  addToCart,
  addToCartViewProduct,
  deleteCart,
  updateCartProduct,
  countAddToCartProduct,
};
