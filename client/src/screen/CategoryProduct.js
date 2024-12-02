import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../redux/slice/category-slice";

export default function CategoryProduct() {
  const { categoryName } = useParams();
  const dispatch = useDispatch();

  const { categories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategory(categoryName));
  }, [dispatch, categoryName]);

  // Filter products based on the selected category
  // Check if categories is an array
  const filteredProducts = Array.isArray(categories)
    ? categories.filter((product) => product.productCategory === categoryName)
    : [];

  const category = [
    {
      id: 1,
      name: "Mouse",
    },
    {
      id: 2,
      name: "Airpodes",
    },
    {
      id: 3,
      name: "Camera",
    },
    {
      id: 4,
      name: "Earphones",
    },
    {
      id: 5,
      name: "Mobiles",
    },
    {
      id: 6,
      name: "Printers",
    },
    {
      id: 7,
      name: "Processor",
    },
    {
      id: 8,
      name: "Refrigerator",
    },
    {
      id: 9,
      name: "Speakers",
    },
    {
      id: 10,
      name: "TV",
    },
    {
      id: 11,
      name: "Trimmers",
    },
    {
      id: 12,
      name: "Watches",
    },
  ];
  return (
    <div className="container mx-auto p-4">
      {/***desktop version */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/***left side */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          {/**sort by */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Sort by
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" />
                <label>Price - Low to High</label>
              </div>

              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/**filter by */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Category
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              {category.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <input type="radio" name="category" />
                  <label>{item.name}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/***right side ( product ) */}
        <div className="px-4">
          <p className="font-medium text-slate-800 text-lg my-2">
            Search Results : {categories.length}
          </p>

          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : filteredProducts.length > 0 ? (
              <div className="mt-5 grid grid-cols-3 gap-4 ">
                {filteredProducts.map((product) => (
                  <div className="shadow-lg rounded-lg">
                     <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                             <img src={product?.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                         </div>
                         <div className='p-4 grid gap-3'>
                             <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product.productName}</h2>
                             <p className='capitalize text-slate-500'>{product.productCategory}</p>
                             <div className='flex gap-3'>
                                 <p className='text-red-600 font-medium'>{product.salesPrice}</p>
                                 <p className='text-slate-500 line-through'>{product.productPrice}</p>
                             </div>
                             <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full'>Add to Cart</button>
                         </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No products found for this category.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
