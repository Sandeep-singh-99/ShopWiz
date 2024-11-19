import { Button, Form, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, fetchProduct } from "../../redux/slice/product-slice";

export default function Product() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    productBrand: "",
    productCategory: "",
    productImage: [], // Store the files
    imagePreview: [], // Store the image URLs for preview
  });

  const products = useSelector((state) => state.product.product);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    clearForm();
  };

  const clearForm = () => {
    setFormData({
      productName: "",
      productPrice: "",
      productDescription: "",
      productBrand: "",
      productCategory: "",
      productImage: [],
      imagePreview: [],
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Append new files to the existing productImage and preview arrays
    const previews = files.map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, ...files],
      imagePreview: [...prev.imagePreview, ...previews],
    }));
  };

  const formHandling = (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("productName", formData.productName);
      data.append("productPrice", formData.productPrice);
      data.append("productDescription", formData.productDescription);
      data.append("productBrand", formData.productBrand);
      data.append("productCategory", formData.productCategory);

      formData.productImage.forEach((img) => {
        data.append("productImage", img);
      });

      dispatch(addProduct(data));
      message.success("Product added successfully");
      handleCancel(); // Close modal after successful submission
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <div className="px-5 py-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Product</h1>
        <Button type="primary" onClick={showModal}>
          Add Product
        </Button>
      </div>
      <div className="border-b-2 bg-gray-500 mt-2"></div>

      {/* Product List */}
      <div>
        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && (
          <div>
            {products.length > 0 ? (
              products.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between border-2 border-gray-400 p-2 mt-2"
                >
                  <div>
                    <h1 className="text-xl font-semibold">{item.productName}</h1>
                    <p className="text-gray-500">{item.productDescription}</p>
                    <p className="text-gray-500">Brand: {item.productBrand}</p>
                    <p className="text-gray-500">Category: {item.productCategory}</p>
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold">${item.productPrice}</h1>
                    <div className="flex space-x-2">
                      {item.productImage.map((imgUrl, index) => (
                        <img
                          key={index}
                          src={imgUrl}
                          alt={`${item.productName}-${index}`}
                          className="w-20 h-20 object-cover"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        )}
      </div>

      {/* Product Form */}
      <Modal
        title="Add Product"
        visible={isModalVisible}
        onOk={formHandling}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical">
          <Form.Item label="Product Name">
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="border-b-2 w-full outline-none"
              placeholder="Product Name"
            />
          </Form.Item>

          <Form.Item label="Product Price">
            <input
              type="number"
              name="productPrice"
              value={formData.productPrice}
              onChange={handleChange}
              className="border-b-2 w-full outline-none"
              placeholder="Product Price"
            />
          </Form.Item>

          <Form.Item label="Product Description">
            <input
              type="text"
              name="productDescription"
              value={formData.productDescription}
              onChange={handleChange}
              className="border-b-2 w-full outline-none"
              placeholder="Product Description"
            />
          </Form.Item>

          <Form.Item label="Product Brand">
            <input
              type="text"
              name="productBrand"
              value={formData.productBrand}
              onChange={handleChange}
              className="border-b-2 w-full outline-none"
              placeholder="Product Brand"
            />
          </Form.Item>

          <Form.Item label="Product Category">
            <input
              type="text"
              name="productCategory"
              value={formData.productCategory}
              onChange={handleChange}
              className="border-b-2 w-full outline-none"
              placeholder="Product Category"
            />
          </Form.Item>

          <Form.Item label="Product Images">
            <input
              type="file"
              name="productImage"
              onChange={handleImageChange}
              className="border-b-2 w-full outline-none"
              multiple
            />
            <div className="flex flex-wrap mt-2">
              {formData.imagePreview.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`preview-${index}`}
                  className="w-20 h-20 object-cover mr-2 mb-2"
                />
              ))}
            </div>
          </Form.Item>

          <Button type="primary" onClick={formHandling}>
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
