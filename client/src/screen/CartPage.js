import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  countCartProduct,
  deleteCartProduct,
  getToCart,
  updateToCartProduct,
} from "../redux/slice/cart-slice";

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const { cartItems } = useSelector((state) => state.cart);

  const handleDelete = async (id) => {
   
    try {
      const resultAction = await dispatch(deleteCartProduct(id));

      if (deleteCartProduct.fulfilled.match(resultAction)) {
        message.success("Item removed from cart");
        await dispatch(countCartProduct());
      } else {
        throw new Error(resultAction.requestStatus || "Failed to delete item");
      }
    } catch (error) {
      message.error(error.message || "Something went wrong");
    }
  };

  const handleQuantityChange = async (id, quantity) => {
    try {
      const resultAction = await dispatch(
        updateToCartProduct({ _id: id, quantity })
      );
      if (updateToCartProduct.fulfilled.match(resultAction)) {
        message.success("Cart updated successfully");
        dispatch(getToCart())
      } else {
        throw new Error(resultAction.requestStatus || "Failed to update cart");
      }
    } catch (error) {
      message.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getToCart());
      dispatch(countCartProduct());
    } else {
      message.error("Please login to continue");
      navigate("/");
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-10 p-5">
      <h1 className="text-3xl text-white font-bold mb-6">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item._id} className="flex gap-6 border-b py-6">
                <img
                  src={item.productId.productImage[0]}
                  alt={item.productId.productName}
                  className="w-40 bg-[#f7f7f7] h-40 object-contain rounded-md border"
                />
                <div className="flex-auto flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg text-white font-medium">
                      {item.productId.productName}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {item.productId.productBrand}
                    </p>
                    <p className="text-lg text-white font-semibold mt-2">
                      ₹{item.productId.salesPrice}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-green-500 text-sm mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>In stock</span>
                  </div>
                </div>
                <div className="flex flex-col justify-between gap-10">
                  <button onClick={() => handleDelete(item._id)}>
                    <i class="ri-delete-bin-6-line text-white"></i>
                  </button>
                  <select
                    className="border outline-none rounded-md p-1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item._id, parseInt(e.target.value))
                    }
                  >
                    {[...Array(10).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
        <div className="w-full lg:w-1/3 bg-gray-50 rounded-md p-6 border sticky overflow-y-auto h-[50vh]">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between py-2 text-gray-700">
            <span>Subtotal</span>
            <span>
              ₹
              {cartItems.reduce(
                (sum, item) => sum + item.productId.salesPrice * item.quantity,
                0
              )}
            </span>
          </div>
          {/* Add shipping and tax calculation if needed */}
          <div className="flex justify-between py-4 text-lg font-semibold">
            <span>Order total</span>
            <span>₹{/* Order total calculation here */}</span>
          </div>
          <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
