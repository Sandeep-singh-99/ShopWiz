import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../redux/slice/product-slice";
import { message } from "antd";
import { AddComment, clearComment, GetComments } from "../redux/slice/comment-slice";
import useAddToCart from "../helpers/useAddToCart";

export default function ProductDetails() {
  const { id } = useParams();
  const { product, loading, error } = useSelector((state) => state.product);
  const comments = useSelector((state) => state.comment.comments?.data || []);

  const dispatch = useDispatch();
  const [addComment, setAddComment] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  const Submithandle = async (e) => {
    e.preventDefault();

    if (!id) {
      message.error("Product ID is missing.");
      return;
    }

    const data = {
      comment: addComment,
    };

    dispatch(AddComment({ id, data }))
      .then(() => {
        message.success("Comment added successfully.");
        setAddComment("");
        dispatch(GetComments(id));
      })
      .catch(() => {
        message.error("Failed to add comment.");
      });
  };

  useEffect(() => {
    if (id) {
      dispatch(clearComment());
      dispatch(fetchProductById(id))
        .unwrap()
        .catch(() => {
          message.error("Failed to fetch product.");
        });
      dispatch(GetComments(id))
        .then((res) => console.log("Fetched Comments:", res.payload))
        .catch((err) => console.error("Error fetching comments:", err));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (product?.productImage?.length > 0) {
      setSelectedImage(product.productImage[0]);
    }
  }, [product]);

  const addToCart = useAddToCart();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No product details available.</p>;

  return (
    <>
      <div className="bg-slate-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-8">
              <img
                src={selectedImage}
                alt="Selected Product"
                className="w-full h-96 object-contain mix-blend-multiply rounded-lg shadow-md mb-4 border-2 border-gray-300"
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
                      className={`size-16 sm:size-20 object-contain border-2 border-gray-300  rounded-md cursor-pointer ${
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
                <button onClick={(e) => {
                        e.preventDefault();
                        addToCart(product._id);
                      }} className="flex gap-2 items-center text-white bg-[#db4444] hover:bg-[#db4411] font-semibold px-6 py-2 rounded-md focus:outline-none focus:ring-2  focus:ring-offset-2">
                  Add to Cart
                </button>
                <button className="bg-gray-600 flex gap-2 items-center  text-white font-semibold px-6 py-2 rounded-md focus:outline-none focus:ring-2  focus:ring-offset-2">
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <div className="bg-white dark:bg-gray-900 h-screen py-8 lg:py-16 antialiased">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Discussion ({comments.length})
            </h2>
          </div>
          <form className="mb-6" onSubmit={Submithandle}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows="6"
                value={addComment}
                onChange={(e) => setAddComment(e.target.value)}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Post comment
            </button>
          </form>

          {/* Comments list */}
          {comments.length > 0 ? (
            comments.map((comment) => (
              <article
                key={comment._id}
                className="p-6 text-base bg-white rounded-lg dark:bg-gray-900 mb-4"
              >
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <img
                      className="mr-2 w-8 h-8 rounded-full"
                      src={comment.userId.imageUrl}
                      alt={comment.userId.username}
                    />
                    <p className="text-sm text-gray-900 dark:text-white font-semibold">
                      {comment.userId.username}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <time>{comment.date}</time>
                  </p>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">
                  {comment.comment}
                </p>
              </article>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No comments yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
