import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../redux/slice/product-slice";
import { message } from "antd";

export default function ProductDetails() {
  const { id } = useParams();
  const { product, loading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id))
        .unwrap()
        .then(() => {
          message.success("Product fetched successfully.");
        })
        .catch(() => {
          message.error("Failed to fetch product.");
        });
    }
  }, [id, dispatch]);

  useEffect(() => {
    console.log("Fetched product:", product);
  }, [product]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Safeguard against missing product or productImage
  if (!product) return <p>No product details available.</p>;

  return (
    <div className="container mx-auto px-4 lg:px-20 py-8">
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* Main Image Section */}
        <div className="flex justify-center items-center border-2 border-gray-300 rounded-lg p-4 w-full lg:w-1/2">
          <img
            src={product.productImage && product.productImage[0]}
            alt={product.productName || "Product Image"}
            className="object-contain w-full h-80"
          />
        </div>

        {/* Thumbnail Section */}
        <div className="flex flex-wrap gap-4 w-full lg:w-1/2">
          {product.productImage && product.productImage.length > 0 ? (
            product.productImage.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={product.productName}
                className="w-24 h-24 object-cover rounded-lg border border-gray-300 hover:scale-105 transition-transform duration-200"
              />
            ))
          ) : (
            <p className="text-gray-500">
              No images available for this product.
            </p>
          )}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="mt-10 lg:mt-12">
        <h1 className="text-3xl font-bold text-gray-800">
          {product.productName}
        </h1>
        <p className="text-xl text-gray-500 mt-2">{product.productBrand}</p>
        <p className="text-lg text-gray-600 mt-4">
          <span className="font-semibold">Category:</span>{" "}
          {product.productCategory}
        </p>
        <p className="text-base text-gray-700 mt-4 leading-relaxed">
          {product.productDescription}
        </p>
        <p className="text-2xl font-bold text-green-600 mt-6">
          Price: ${product.productPrice}
        </p>

        {/* Add to Cart Button */}
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
