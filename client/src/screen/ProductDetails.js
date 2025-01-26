import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../redux/slice/product-slice";
import { message } from "antd";

export default function ProductDetails() {
  const { id } = useParams();
  const { product, loading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  // State for the selected image
  const [selectedImage, setSelectedImage] = useState(null);

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
    if (product?.productImage?.length > 0) {
      setSelectedImage(product.productImage[0]); // Default to the first image
    }
  }, [product]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No product details available.</p>;

  return (
   <>
    <div className="bg-slate-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          {/* Image Section */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <img
              src={selectedImage}
              alt="Selected Product"
              className="w-full h-96 object-contain mix-blend-multiply rounded-lg shadow-md mb-4"
              id="mainImage"
            />
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {product.productImage && product.productImage.length > 0 ? (
                product.productImage.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={product.productName}
                    loading="lazy"
                    className={`size-16 sm:size-20 object-contain rounded-md cursor-pointer ${
                      selectedImage === img ? "opacity-100" : "opacity-60"
                    } hover:opacity-100 transition duration-300`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))
              ) : (
                <p className="text-gray-500">
                  No images available for this product.
                </p>
              )}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-bold mb-2">{product.productName}</h2>
            <p className="text-gray-600 mb-4">{product.productBrand}</p>
            <div className="mb-4">
              <span className="text-2xl font-bold mr-2">
                ${product.salesPrice}
              </span>
              <span className="text-gray-500 line-through">
                ${product.productPrice}
              </span>
            </div>
            <p className="text-gray-700 mb-6">{product.productDescription}</p>

            <div className="flex space-x-4 mb-6">
              <button className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                Add to Cart
              </button>
              <button className="bg-gray-200 flex gap-2 items-center text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="bg-white dark:bg-gray-900 h-screen py-8 lg:py-16 antialiased">
  <div class="max-w-2xl mx-auto px-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion (20)</h2>
    </div>
    <form class="mb-6">
        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label for="comment" class="sr-only">Your comment</label>
            <textarea id="comment" rows="6"
                class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..." required></textarea>
        </div>
        <button type="submit"
            class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            Post comment
        </button>
    </form>
    <article class="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
        <footer class="flex justify-between items-center mb-2">
            <div class="flex items-center">
                <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                        class="mr-2 w-6 h-6 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                        alt="Michael Gough"/>Michael Gough</p>
                <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                        title="February 8th, 2022">Feb. 8, 2022</time></p>
            </div>
            <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                </svg>
                <span class="sr-only">Comment settings</span>
            </button>
        
            <div id="dropdownComment1"
                class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconHorizontalButton">
                    <li>
                        <a href="#"
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                    </li>
                    <li>
                        <a href="#"
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                    </li>
                    <li>
                        <a href="#"
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                    </li>
                </ul>
            </div>
        </footer>
        <p class="text-gray-500 dark:text-gray-400">Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
            instruments for the UX designers. The knowledge of the design tools are as important as the
            creation of the design strategy.</p>
        <div class="flex items-center mt-4 space-x-4">
            <button type="button"
                class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                </svg>
                Reply
            </button>
        </div>
    </article> 
  </div>
</div>
   </>
  );
}
