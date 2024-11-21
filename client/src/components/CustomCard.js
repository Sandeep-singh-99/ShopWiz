import React from "react";

export default function CustomCard({
  name,
  price,
  category,
  brand,
  description,
  images,
  onDelete,
  onUpdate,
}) {
  return (
    <div className="flex flex-col border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      {/* Product Images */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {images.length > 0 ? (
          images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${name}-${index}`}
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
          {name || "Unnamed Product"}
        </h2>
        <p className="text-sm text-gray-500">
          Brand: <span className="text-gray-700">{brand || "Unknown"}</span>
        </p>
        <p className="text-sm text-gray-500">
          Category: <span className="text-gray-700">{category || "N/A"}</span>
        </p>
        <p className="text-sm text-gray-500">
          Price: <span className="text-green-500">${price || "0.00"}</span>
        </p>
        <p className="text-sm text-gray-500">
          Description:{" "}
          <span className="text-gray-700">
            {description || "No description available"}
          </span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2 mt-4">
        <button
          onClick={onUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
