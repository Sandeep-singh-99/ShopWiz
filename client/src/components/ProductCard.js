import React from "react";
import { Link } from "react-router-dom";
import useAddToCart from "../helpers/useAddToCart";

const ProductCard = ({ product }) => {
  const addToCart = useAddToCart();

  return (
    <Link
      to={`product/${product?._id}`}
      className="w-[270px] h-[380px] rounded-lg shadow-md border flex justify-stretch flex-col mx-auto p-4 transition-transform duration-300 hover:scale-105"
    >
      <div className="relative w-full h-52">
        <img
          src={product?.productImage?.[0] || "/placeholder-image.png"}
          alt={product?.name || "Product Image"}
          loading="lazy"
          className="w-full h-52 mix-blend-multiply object-contain rounded-md"
        />
      </div>
      <div className="flex flex-col mt-4 space-y-2 overflow-hidden">
        <h1 className="text-lg font-semibold text-gray-800 truncate">
          {product?.productName || "Unnamed Product"}
        </h1>
        <p className="text-md text-gray-600">
          {product?.salesPrice
            ? `$${product.salesPrice.toFixed(2)}`
            : "Price Unavailable"}
        </p>
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product?._id);
          }}
          className="bg-[#db4444] hover:bg-[#db4411] text-white py-1 mt-2 rounded-lg"
        >
          Add to cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
