import { Button, Form, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, fetchProduct } from "../../redux/slice/product-slice";
import CustomCard from "../../components/CustomCard";
import { deleteProduct } from "../../redux/slice/product-slice";
import { updateProduct } from "../../redux/slice/product-slice";

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
    dispatch(fetchProduct()); // Refetch the entire product list
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
        data.append("productImages", img); // Append images if present
      });
  
      console.log("Sending data:", data);
      for (let [key, value] of data.entries()) {
        console.log(`${key}:`, value);
      } // Log the data to check
  
      if (isUpdateMode) {
        dispatch(updateProduct({ id: updateProductId, data }))
          .then(() => {
            message.success("Product updated successfully");
            handleCancel();
          })
          .catch((err) => {
            message.error(`Error updating product: ${err.message}`);
          });
      } else {
        dispatch(addProduct(data))
          .then(() => {
            message.success("Product added successfully");
            handleCancel();
          })
          .catch((err) => {
            message.error(`Error adding product: ${err.message}`);
          });
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  
  

  const handleUpdate = (product) => {
    console.log("Product to update:", product._id);
    
    setFormData({
      productName: product.productName,
      productPrice: product.productPrice,
      productDescription: product.productDescription,
      productBrand: product.productBrand,
      productCategory: product.productCategory,
      productImage: [], // Reset files for editing
      imagePreview: product.productImage || [],
    });
    //dispatch(updateProduct(product._id));
    setUpdateProductId(product._id);
    setIsUpdateMode(true);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
      .then(() => {
        message.success("Product deleted successfully");
      })
      .catch((err) => {
        message.error(`Error deleting product: ${err.message}`);
      });
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
                  name={item.productName} // Make sure this is a string
                  price={item.productPrice} // Ensure it's a number or string
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
            {isUpdateMode ? "Update Product" : "Add Product"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
