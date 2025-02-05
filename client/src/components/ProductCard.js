import React from "react";
import { Link } from "react-router-dom";
import useAddToCart from "../helpers/useAddToCart";

const ProductCard = ({ product }) => {
  const addToCart = useAddToCart();

  return (
    <Link
      to={`product/${product?._id}`}
      className="w-full max-w-[270px] md:w-[270px] h-auto bg-white rounded-lg shadow-md border flex flex-col mx-auto p-4 transition-transform duration-300 hover:scale-105 md:hover:scale-105"
    >
      <div className="relative w-full h-52 flex items-center justify-center">
        <img
          src={product?.productImage?.[0] || "/placeholder-image.png"}
          alt={product?.name || "Product Image"}
          loading="lazy"
          className="w-full h-full object-contain rounded-md"
        />
      </div>
      <div className="flex flex-col mt-4 space-y-2">
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
          className="bg-[#db4444] hover:bg-[#db4411] text-white py-2 px-4 rounded-lg transition-all"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
