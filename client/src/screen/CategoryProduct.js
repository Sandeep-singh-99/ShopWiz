import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../redux/slice/category-slice";
import { fetchProduct } from "../redux/slice/product-slice";
import useAddToCart from "../helpers/useAddToCart";

export default function CategoryProduct() {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, loading, error } = useSelector((state) => state.category);
  const { products } = useSelector((state) => state.product);

  const [sortOption, setSortOption] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false); 

  useEffect(() => {
    if (categoryName) {
      const categoryArray = categoryName.split(",");
      setSelectedCategories(categoryArray);
      dispatch(fetchCategory(categoryArray));
    }
  }, [categoryName, dispatch]);

  const handleSort = (option) => {
    setSortOption(option);
  };

  const handleCategorySelection = (category) => {
    setSelectedCategories((prev) => {
      const updatedCategories = prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category];

      navigate(`/category/${updatedCategories.join(",") || ""}`);
      return updatedCategories;
    });
  };

  const filteredProducts = categoryName
    ? categories.filter(
        (product) =>
          selectedCategories.length === 0 ||
          selectedCategories.includes(product.productCategory)
      )
    : products;

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === "lowToHigh") {
      return a.salesPrice - b.salesPrice;
    } else if (sortOption === "highToLow") {
      return b.salesPrice - a.salesPrice;
    }
    return 0;
  });

  const category = [
    "Mouse",
    "Airpods",
    "Camera",
    "Earphones",
    "Mobiles",
    "Printers",
    "Processor",
    "Refrigerator",
    "Speakers",
    "TV",
    "Trimmers",
    "Watches",
  ];

  const addToCart = useAddToCart();

  return (
    <div className="container sm:px-20 mx-auto py-8">
      {/* Mobile filter toggle */}
      <button
        className="lg:hidden block bg-gray-200 text-gray-700 px-4 py-2 rounded-md mb-4"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[250px,1fr] gap-4">
        {/* Sidebar (Filters) */}
        <div
          className={`${
            showFilters ? "block" : "hidden"
          } lg:block bg-white p-4 rounded-md shadow-md`}
        >
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
            Sort by
          </h3>
          <form className="text-sm flex flex-col gap-2 py-2">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="sortBy"
                checked={sortOption === "lowToHigh"}
                onChange={() => handleSort("lowToHigh")}
              />
              <label>Price - Low to High</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="sortBy"
                checked={sortOption === "highToLow"}
                onChange={() => handleSort("highToLow")}
              />
              <label>Price - High to Low</label>
            </div>
          </form>

          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mt-4">
            Category
          </h3>
          <form className="text-sm flex flex-col gap-2 py-2">
            {category.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="category"
                  checked={selectedCategories.includes(item)}
                  onChange={() => handleCategorySelection(item)}
                />
                <label>{item}</label>
              </div>
            ))}
          </form>
        </div>

        {/* Product Listing */}
        <div>
          <p className="text-lg font-semibold text-gray-700 mb-4">
            Search Results: {sortedProducts.length}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  className="shadow-lg rounded-lg overflow-hidden bg-white"
                >
                  <div className="bg-gray-200 h-48 flex justify-center items-center">
                    <img
                      src={product?.productImage[0]}
                      className="object-contain mix-blend-multiply w-full h-full"
                      alt={product.productName}
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="font-semibold text-base md:text-lg text-black line-clamp-1">
                      {product.productName}
                    </h2>
                    <p className="text-gray-500">{product.productCategory}</p>
                    <div className="flex gap-2">
                      <p className="text-red-600 font-medium">
                        ${product.salesPrice}
                      </p>
                      <p className="text-gray-500 line-through">
                        ${product.productPrice}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product._id);
                      }}
                      className="mt-2 text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              ))
            ) : (
              <p>No products found for the selected categories.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
