import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../redux/slice/auth-slice";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, isError } = useSelector((state) => state.auth)

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/admin");
    }
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { userId, password };
  
    dispatch(adminLogin(data))
      .unwrap()
      .then(() => {
        message.success("Login successful");
        navigate("/admin");
      })
      .catch((err) => {
        localStorage.removeItem("adminToken"); // Remove token if login fails
        message.error("Login failed");
      });
  };

  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 flex justify-center items-center h-screen">
      <div className="shadow-lg bg-white rounded-lg px-10 py-5 w-2/5">
        <h1 className="text-4xl font-bold">Admin Login</h1>
        <div className="bg-gradient-to-r from-blue-700 to-purple-600 w-2/6 h-1 "></div>
        <form className="mt-5 flex flex-col" onSubmit={handleSubmit}>
          <label className="font-semibold">User Id:</label>
          <input
            required
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="border-2 border-gray-400 rounded-md p-1 mb-3 outline-none"
          />
          <label className="font-semibold">Password:</label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-400 rounded-md p-1 mb-3 outline-none"
          />

          <button className="bg-[#ee7276] hover:bg-[#e8888b] text-white py-2 rounded-md">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
