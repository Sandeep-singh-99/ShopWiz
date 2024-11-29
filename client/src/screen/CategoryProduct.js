import React from "react";
import { useParams } from "react-router-dom";

export default function CategoryProduct() {
  const { categoryName } = useParams();

  // Simulate fetching products based on the category
  const products = [
    { id: 1, name: "Product 1", category: "Mouse" },
    { id: 2, name: "Product 2", category: "Mouse" },
    { id: 3, name: "Product 3", category: "Airpodes" },
    { id: 4, name: "Product 4", category: "Camera" },
  ];

  // Filter products based on the selected category
  const filteredProducts = products.filter(
    (product) => product.category === categoryName
  );

  return (
    <div>
      <h1 className="text-2xl font-bold">{categoryName} Products</h1>
      <div className="mt-5 grid grid-cols-2 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md"
            >
              {product.name}
            </div>
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
    </div>
  );
}
