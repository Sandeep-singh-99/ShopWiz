import React, { useEffect, useState } from "react";
import { Tabs} from "antd";
import { useNavigate } from "react-router-dom";
import TabPane from "antd/es/tabs/TabPane";
import Product from "./Product";
import User from "./User";
import Order from "./Order";

export default function AdminHome() {
  const [mode, setMode] = useState("left");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  })
  
  return (
    <>
      <div className="bg-[#ee7276] py-4">
        <div className="flex justify-center items-center">
          <h1 className="text-3xl font-semibold">
            Admin:- <span>Sandeep Singh</span>
          </h1>
        </div>
      </div>

      <div className="border-t-2 border-gray-600 pt-2">
        <Tabs
          defaultActiveKey="0"
          tabPosition={mode}>
            <TabPane tab="Product" key="0">
                <Product/>
            </TabPane>

            <TabPane tab="User" key="1">
                <User/>
            </TabPane>

            <TabPane tab="Order" key="2">
                <Order/>
            </TabPane>
          </Tabs>
      </div>

      
    </>
  );
}
