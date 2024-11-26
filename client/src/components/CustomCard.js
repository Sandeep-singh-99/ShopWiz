import React from "react";

const CustomCard = ({
  name,
  brand,
  category,
  price,
  salesPrice,
  description,
  images,
  onUpdate,
  onDelete,
}) => {
  // Function to truncate the description
  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* Product Images */}
      <div className="flex justify-center overflow-x-auto">
        {images && images.length > 0 ? (
          images.map((img, index) => (
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
          {name || "Unnamed Product"}
        </h2>
        <p className="text-sm text-gray-500">
          Brand: <span className="text-gray-700">{brand || "Unknown"}</span>
        </p>
        <p className="text-sm text-gray-500">
          Category: <span className="text-gray-700">{category || "N/A"}</span>
        </p>
        <p className="text-sm text-gray-500">
          Price: <span className="text-green-500">${formatPrice(price || "0.00")}</span>
        </p>
        <p className="text-sm text-gray-500">
          Sales Price:{" "}
          <span className="text-red-500">${formatPrice(salesPrice || "0.00")}</span>
        </p>
        <p className="text-sm text-gray-500">
          Description:{" "}
          <span className="text-gray-700">
            {truncateDescription(
              description || "No description available",
              100
            )}
          </span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2 mt-4">
        <button
          onClick={onUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Update
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CustomCard;
