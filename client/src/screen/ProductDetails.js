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
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          {/* Product Image */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <img
              src={product.productImage && product.productImage[0]}
              alt={product.productName || "Product Image"}
              className="w-full h-96 object-contain mix-blend-multiply rounded-lg shadow-md mb-4"
            />

            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {product.productImage && product.productImage.length > 0 ? (
                product.productImage.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={product.productName}
                    className="size-16 sm:size-20 object-contain rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  />
                ))
              ) : (
                <p className="text-gray-500">
                  No images available for this product.
                </p>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div class="w-full md:w-1/2 px-4">
            <h1 className="text-2xl font-bold pb-5">{product.productName}</h1>
            <h2 className="tex-lg font-medium pb-5">{product.productBrand}</h2>
            <div className="flex gap-4 pb-5">
            <p>${product.salesPrice}</p>
            <p className="text-gray-500 line-through">${product.productPrice}</p>
            </div>

            <button className="bg-orange-600 p-2 mb-5 rounded-lg text-white">Add to cart</button>
            <p className="">{product.productDescription}</p>
          </div>

          {/* Product Details Section */}
        </div>
      </div>
    </div>
  );
}
