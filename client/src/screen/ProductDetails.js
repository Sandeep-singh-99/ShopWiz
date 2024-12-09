import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../redux/slice/product-slice";

export default function ProductDetails() {
  const { id } = useParams(); // Get product ID from URL
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductById(id)); // Fetch product details by ID
  }, [id, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return product ? (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <img
          src={product.productImage[0]}
          alt={product.productName}
          className="w-full md:w-1/2 h-auto object-contain"
        />
        <div className="p-4">
          <h1 className="text-2xl font-semibold">{product.productName}</h1>
          <p className="text-lg text-red-600">{product.salesPrice}</p>
          <p className="line-through text-gray-500">{product.productPrice}</p>
          <p className="mt-4">{product.description}</p>
          <button className="mt-4 bg-red-600 text-white py-2 px-4 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  ) : (
    <p>Product not found.</p>
  );
}
