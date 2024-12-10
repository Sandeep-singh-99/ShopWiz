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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
      <h3 className="text-xl">Brand: {product.productBrand}</h3>
      <p className="text-gray-600">{product.productDescription}</p>
      <p className="text-lg">
        Price: <del>₹{product.productPrice}</del> <strong>₹{product.salesPrice}</strong>
      </p>
      <div className="flex flex-wrap gap-4 mt-4">
        {product.productImage && product.productImage.length > 0 ? (
          product.productImage.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={product.productName}
              className="w-48 h-48 object-cover rounded-lg"
            />
          ))
        ) : (
          <p>No images available for this product.</p>
        )}
      </div>
    </div>
  );
}
