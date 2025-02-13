import { Button, Form, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  fetchProduct,
  deleteProduct,
} from "../../redux/slice/product-slice";
import CustomCard from "../../components/CustomCard";

import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Product() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    salesPrice: "",
    productDescription: "",
    productBrand: "",
    productCategory: "",
    productImage: [], // Store the files
    imagePreview: [], // Store the image URLs for preview
  });

  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [updateProductId, setUpdateProductId] = useState(null);

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
    dispatch(fetchProduct());
  };

  const clearForm = () => {
    setFormData({
      productName: "",
      productPrice: "",
      salesPrice: "",
      productDescription: "",
      productBrand: "",
      productCategory: "",
      productImage: [],
      imagePreview: [],
    });
    setIsUpdateMode(false);
    setUpdateProductId(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, ...files],
      imagePreview: [...prev.imagePreview, ...previews],
    }));
  };

  // Handle Add Product
  const handleAddProduct = async () => {
    if (
      !formData.productName ||
      !formData.productPrice ||
      !formData.productDescription ||
      !formData.productBrand
    ) {
      message.error("Please fill in all required fields.");
      return;
    }

    try {
      const data = new FormData();
      data.append("productName", formData.productName);
      data.append("productPrice", formData.productPrice);
      data.append("salesPrice", formData.salesPrice);
      data.append("productDescription", formData.productDescription);
      data.append("productBrand", formData.productBrand);
      data.append("productCategory", formData.productCategory);

      formData.productImage.forEach((img) => {
        data.append("productImages", img); // Append images if present
      });

      await dispatch(addProduct(data));
      message.success("Product added successfully");
      handleCancel();
    } catch (error) {
      message.error(`Error: ${error.message || "Something went wrong"}`);
    }
  };

  const handleUpdateProduct = async () => {
    if (
      !formData.productName ||
      !formData.productPrice ||
      !formData.productDescription ||
      !formData.productBrand
    ) {
      message.error("Please fill in all required fields.");
      return;
    }

    try {
      // Prepare JSON payload
      const payload = {
        productName: formData.productName,
        productPrice: formData.productPrice,
        salesPrice: formData.salesPrice,
        productDescription: formData.productDescription,
        productBrand: formData.productBrand,
        productCategory: formData.productCategory,
        productImage: formData.imagePreview, // Use URLs or base64 strings for images
      };

      const response = await axios.put(
        `${API_BASE_URL}/api/product/updateProduct/${updateProductId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) throw new Error("Failed to update product");
      message.success("Product updated successfully");
      handleCancel();
    } catch (error) {
      message.error(`Error: ${error.message}`);
    }
  };

  //

  const handleUpdate = (product) => {
    setFormData({
      productName: product.productName,
      productPrice: product.productPrice,
      salesPrice: product.salesPrice,
      productDescription: product.productDescription,
      productBrand: product.productBrand,
      productCategory: product.productCategory,
      productImage: [],
      imagePreview: product.productImage || [],
    });
    setUpdateProductId(product._id);
    setIsUpdateMode(true);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      dispatch(deleteProduct(id));
      message.success("Product deleted successfully");
    } catch (err) {
      message.error(`Error deleting product: ${err.message}`);
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
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {products.length > 0 ? (
              products.map((item) => (
                <CustomCard
                  key={item._id}
                  name={item.productName}
                  price={item.productPrice}
                  salesPrice={item.salesPrice}
                  category={item.productCategory}
                  brand={item.productBrand}
                  description={item.productDescription}
                  images={item.productImage || []}
                  onDelete={() => handleDelete(item._id)}
                  onUpdate={() => handleUpdate(item)}
                />
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        )}
      </div>

      {/* Product Form */}
      <Modal
        title={isUpdateMode ? "Update Product" : "Add Product"}
        visible={isModalVisible}
        onOk={isUpdateMode ? handleUpdateProduct : handleAddProduct} // Call appropriate function
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical">
          <Form.Item label="Product Name" required>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="border-b-2 w-full outline-none"
              placeholder="Product Name"
            />
          </Form.Item>

          <Form.Item label="Product Price" required>
            <input
              type="number"
              name="productPrice"
              value={formData.productPrice}
              onChange={handleChange}
              className="border-b-2 w-full outline-none"
              placeholder="Product Price"
            />
          </Form.Item>

          <Form.Item label="Sales Price">
            <input
              type="number"
              name="salesPrice"
              value={formData.salesPrice}
              onChange={handleChange}
              className="border-b-2 w-full outline-none"
              placeholder="Sales Price"
            />
          </Form.Item>

          <Form.Item label="Product Description" required>
            <input
              type="text"
              name="productDescription"
              value={formData.productDescription}
              onChange={handleChange}
              className="border-b-2 w-full outline-none"
              placeholder="Product Description"
            />
          </Form.Item>

          <Form.Item label="Product Brand" required>
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

          <Button
            type="primary"
            onClick={isUpdateMode ? handleUpdateProduct : handleAddProduct}
          >
            {isUpdateMode ? "Update Product" : "Add Product"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
