import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../redux/slice/category-slice";

export default function CategoryProduct() {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const { categories, loading , error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategory(categoryName));
  }, [dispatch, categoryName]);


  // Filter products based on the selected category
   // Check if categories is an array
   const filteredProducts = Array.isArray(categories)
   ? categories.filter((product) => product.productCategory === categoryName)
   : [];

  return (
    <div>
      <h1 className="text-2xl font-bold">{categoryName} Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : filteredProducts.length > 0 ? (
        <div className="mt-5 grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
              {/* Product Images */}
              <div className="flex justify-center overflow-x-auto">
                {product.productImage && product.productImage.length > 0 ? (
                  product.productImage.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Product Image ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  ))
                ) : (
                  <img
                    src="https://via.placeholder.com/150"
                    alt="No Image"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}
              </div>

              {/* Product Details */}
              <div className="mt-2">
                <h2 className="text-lg font-bold text-gray-700">
                  {product.productName || "Unnamed Product"}
                </h2>
                <p className="text-sm text-gray-500">
                  Brand: <span className="text-gray-700">{product.productBrand || "Unknown"}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Category: <span className="text-gray-700">{product.productCategory || "N/A"}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Price: <span className="text-green-500">${product.productPrice || "0.00"}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Sales Price:{" "}
                  <span className="text-red-500">${product.salesPrice || "0.00"}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Description:{" "}
                  <span className="text-gray-700">
                    {product.productDescription || "No description available"}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found for this category.</p>
      )}
    </div>
  );
}
