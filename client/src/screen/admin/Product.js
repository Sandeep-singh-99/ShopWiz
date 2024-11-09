import { Button, Form, Modal } from "antd";
import React, { useState } from "react";

export default function Product() {
  const [isModealVisible, setIsModealVisible] = useState(false);

  const showModal = () => {
    setIsModealVisible(true);
  }

  const handleCancel = () => {
    setIsModealVisible(false);
  }

  const handleOk = () => {
    setIsModealVisible(false);
  }

  return (
    <div className="px-5 py-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Product</h1>
        <Button type="primary" onClick={showModal}>Add Product</Button>
      </div>
      <div className="border-b-2 bg-gray-500 mt-2"></div>

      
      {/* Product Form */}
      <Modal title="Add Product" visible={isModealVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form>
          <Form.Item>
            <label>Product Name</label>
            <input
              type="text"
              className="border-2 border-gray-400 rounded-md p-1 mb-3 outline-none"
            />
          </Form.Item>
          <Form.Item>
            <label>Product Price</label>
            <input
              type="text"
              className="border-2 border-gray-400 rounded-md p-1 mb-3 outline-none"
            />
          </Form.Item>
          <Form.Item>
            <label>Product Description</label>
            <textarea className="border-2 border-gray-400 rounded-md p-1 mb-3 outline-none"></textarea>
          </Form.Item>
          <Form.Item>
            <label>Product Image</label>
            <input
              type="file"
              className="border-2 border-gray-400 rounded-md p-1 mb-3 outline-none"
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
