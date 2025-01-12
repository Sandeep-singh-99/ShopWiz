import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { getToCart } from "../redux/slice/cart-slice";


export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const  { cartItems }  = useSelector((state) => state.cart);

  useEffect(() => {
    if (!isAuthenticated) {
      message.error("Please login to view your cart");
      navigate("/");
    } else {
      dispatch(getToCart());
    }
  }, [isAuthenticated, dispatch, navigate]);

  return (
    <div className="max-w-5xl mx-auto my-10 p-5">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
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
                    <h2 className="text-lg font-medium">
                      {item.productId.productName}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {item.productId.productBrand}
                    </p>
                    <p className="text-lg font-semibold mt-2">
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
                  <button className="text-red-500 mt-2">×</button>
                  <select className="border outline-none rounded-md p-1" value={item.quantity}>
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
        <div className="w-full lg:w-1/3 bg-gray-50 rounded-md p-6 border">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between py-2 text-gray-700">
            <span>Subtotal</span>
            <span>₹{cartItems.reduce((sum, item) => sum + item.productId.salesPrice * item.quantity, 0)}</span>
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
