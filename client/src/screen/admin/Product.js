import { Button, Form, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../redux/slice/product-slice";

export default function Product() {
  const dispatch = useDispatch();

  // Use Redux state
  const products = useSelector((state) => state.product.product);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
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
                    <h1 className="text-xl font-semibold">
                      {item.productName}
                    </h1>
                    <p className="text-gray-500">{item.productDescription}</p>
                    <p className="text-gray-500">Brand: {item.productBrand}</p>
                    <p className="text-gray-500">
                      Category: {item.productCategory}
                    </p>
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold">
                      ${item.productPrice}
                    </h1>
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
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Product Name">
            <input
              type="text"
              className="border-2 border-gray-400 rounded-md p-1 mb-3 outline-none w-full"
            />
          </Form.Item>
          <Form.Item label="Product Price">
            <input
              type="text"
              className="border-2 border-gray-400 rounded-md p-1 mb-3 outline-none w-full"
            />
          </Form.Item>
          <Form.Item label="Product Description">
            <textarea className="border-2 border-gray-400 rounded-md p-1 mb-3 outline-none w-full"></textarea>
          </Form.Item>
          <Form.Item label="Product Image">
            <input
              type="file"
              className="border-2 border-gray-400 rounded-md p-1 mb-3 outline-none w-full"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Add Product</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
