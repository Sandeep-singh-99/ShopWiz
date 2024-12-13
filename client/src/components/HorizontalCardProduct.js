import React, { useEffect, useRef, useState } from "react";
import { message } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function HorizontalCardProduct({ category, heading }) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/getProductByCategory/categorywise/${category}`
      );
      setCategories(response.data.data);
      setLoading(false);
      setError(false);
    } catch (error) {
      message.error("Failed to load products. Please try again.");
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="container mx-auto border-2 px-4 py-4 my-8 relative">
      {/* Section Heading */}
      <div className="flex items-center gap-3 pb-4">
        <div className="bg-[#db4444] w-4 h-10 rounded"></div>
        <h2 className="font-semibold text-[16px] text-[#db4444]">{heading}</h2>
      </div>

      {/* Product List */}
      <div className="flex items-center gap-6 overflow-hidden whitespace-nowrap scrollbar-hide transition-all">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="w-[280px] h-[420px] bg-red-800 rounded-lg shadow-lg animate-pulse flex flex-col p-4"
              >
                <div className="h-80 bg-gray-300 rounded-md mb-4"></div>
                <div className="h-10 bg-gray-300 rounded-md mb-2"></div>
                <div className="h-10 bg-gray-300 rounded-md"></div>
              </div>
            ))
          : categories.slice(0, 4).map((product) => (
              <Link
                key={product?._id}
                to={`product/${product?._id}`}
                className="w-[270px] h-[420px] rounded-lg shadow-lg flex flex-col p-4 transition-transform duration-300 hover:scale-105"
              >
                <div className="relative h-80">
                  <img
                    src={product?.productImage?.[0] || "/placeholder-image.png"}
                    alt={product?.name || "Product Image"}
                    className="w-full h-full object-contain rounded-md"
                  />
                </div>
                <div className="flex flex-col mt-4 space-y-0 overflow-hidden">
                  <h1 className="text-lg font-semibold text-gray-800 truncate">
                    {product?.productName ? (
                      product.productName
                    ) : (
                      <span className="block">Unnamed Product</span>
                    )}
                  </h1>
                  <p className="text-md text-gray-600">
                    {product?.salesPrice
                      ? `$${product.salesPrice.toFixed(2)}`
                      : "Price Unavailable"}
                  </p>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
