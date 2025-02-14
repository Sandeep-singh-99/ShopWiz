import React from "react";
import { Link } from "react-router-dom";
import useAddToCart from "../helpers/useAddToCart";

const ProductCard = ({ product }) => {
  const addToCart = useAddToCart();

  return (
    <Link
      to={`product/${product?._id}`}
      className="rounded-lg border border-gray-200 bg-white shadow-lg w-full sm:w-[320px] md:w-[300px] lg:w-[340px] dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="h-40 w-full overflow-hidden rounded-t-md bg-white">
        <img
          src={product?.productImage?.[0] || "/placeholder-image.png"}
          alt={product?.name || "Product Image"}
          loading="lazy"
          className="w-full h-full object-contain transition-all transform hover:scale-110"
        />
      </div>

      <div className="p-4">
        <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {product?.productBrand || "Unnamed Product"}
        </p>

        <div className="flex flex-col gap-2">
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            {product?.salesPrice
              ? `$${product.salesPrice.toFixed(2)}`
              : "Price Unavailable"}
          </p>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product?._id);
            }}
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700 transition"
          >
            <svg
              className="h-5 w-5 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
              />
            </svg>
            Add to cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
