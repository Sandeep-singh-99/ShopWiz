import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../redux/slice/category-slice";
import { fetchProduct } from "../redux/slice/product-slice";

export default function CategoryProduct() {
  const { categoryName } = useParams(); // Capture the categoryName from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, loading, error } = useSelector((state) => state.category);
  const { products } = useSelector((state) => state.product); // Assuming products are in the 'product' slice

  const [sortOption, setSortOption] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Update the selected categories state based on URL
  useEffect(() => {
    if (categoryName) {
      const categoryArray = categoryName.split(","); // Split the categories by comma
      setSelectedCategories(categoryArray);
      dispatch(fetchCategory(categoryArray)); // Fetch products for the selected categories
    }
    // } else {
    //   // If no categories are selected, fetch all products
    //   dispatch(fetchProduct()); // Fetch all products
    // }
  }, [categoryName, dispatch]);

  const handleSort = (option) => {
    setSortOption(option);
  };

  const handleCategorySelection = (category) => {
    setSelectedCategories((prev) => {
      const updatedCategories = prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category];

      // If no categories are selected, navigate to a route with no category
      if (updatedCategories.length === 0) {
        navigate(`/category/`); // Navigate to show all products (empty category in the URL)
      } else {
        // Update the URL with selected categories
        navigate(`/category/${updatedCategories.join(",")}`);
      }

      return updatedCategories;
    });
  };

  // Filter products based on selected categories or show all if none are selected
  const filteredProducts = categoryName
    ? categories.filter(
        (product) =>
          selectedCategories.length === 0 ||
          selectedCategories.includes(product.productCategory)
      )
    : products; // If no categoryName, use all products from 'products' slice

  // Sort products based on selected option
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === "lowToHigh") {
      return a.salesPrice - b.salesPrice;
    } else if (sortOption === "highToLow") {
      return b.salesPrice - a.salesPrice;
    }
    return 0;
  });

  const category = [
    { id: 1, name: "Mouse" },
    { id: 2, name: "Airpodes" },
    { id: 3, name: "Camera" },
    { id: 4, name: "Earphones" },
    { id: 5, name: "Mobiles" },
    { id: 6, name: "Printers" },  
    { id: 7, name: "Processor" },
    { id: 8, name: "Refrigerator" },
    { id: 9, name: "Speakers" },
    { id: 10, name: "TV" },
    { id: 11, name: "Trimmers" },
    { id: 12, name: "Watches" },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* Left side (filters) */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          {/* Sort by */}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Sort by
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortOption === "lowToHigh"}
                  onChange={() => handleSort("lowToHigh")}
                />
                <label>Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortOption === "highToLow"}
                  onChange={() => handleSort("highToLow")}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Filter by categories */}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Category
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {category.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="category"
                    checked={selectedCategories.includes(item.name)}
                    onChange={() => handleCategorySelection(item.name)}
                  />
                  <label>{item.name}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Right side (products) */}
        <div className="px-4">
          <p className="font-medium text-slate-800 text-lg my-2">
            Search Results: {sortedProducts.length}
          </p>

          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : sortedProducts.length > 0 ? (
              <div className="mt-5 grid grid-cols-3 gap-4">
                {sortedProducts.map((product) => (
                  <Link to={`/product/${product.id}`} key={product.id} className="shadow-lg rounded-lg">
                    <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                      <img
                        src={product?.productImage[0]}
                        className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                        alt={product.productName}
                      />
                    </div>
                    <div className="p-4 grid gap-3">
                      <h2 className="font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                        {product.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product.productCategory}
                      </p>
                      <div className="flex gap-3">
                        <p className="text-red-600 font-medium">
                          {product.salesPrice}
                        </p>
                        <p className="text-slate-500 line-through">
                          {product.productPrice}
                        </p>
                      </div>
                      <button className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full">
                        Add to Cart
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p>No products found for the selected categories.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
