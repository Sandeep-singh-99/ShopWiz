import React, { useEffect, useState } from "react";

import img1 from "../assets/dl.beatsnoop 1.png";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/slice/auth-slice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { message } from "antd";

export default function Login() {
  const dispatch = useDispatch(); // Initialize the dispatch function
  const navigate = useNavigate(); // Initialize the navigate function

  // Initialize the form data state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }
  
    const data = {
      email: formData.email,
      password: formData.password,
    };
  
    console.log("Form Data before dispatch: ", data);
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })

      if (response.status === 200 && response.data.success) {
        const { data: userData } = response.data; 
        if (userData) {
          localStorage.setItem("token", userData.accesstoken); 
          localStorage.setItem("loginData", JSON.stringify(userData.user));

          dispatch(login(userData.user));
        }
        navigate("/");
        message.success("login successful");
      } else {
        message.error("login failed");
      }

      // dispatch(login(data)); 
      // navigate("/"); // Redirect to home page
  
      // alert("Logged in successfully");
    } catch (error) {
      alert("Error logging in");
      console.log("Error: ", error);
    }
  };
  

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  });

  return (
    <div className="sm:pt-16 pt-5">
      <div className="flex sm:justify-between justify-center items-center">
        <div className="bg-[#c6e5e9] sm:block hidden">
          <img className="w-5/6" src={img1} alt="img1" loading="lazy" />
        </div>

        <div className="flex sm:w-2/4 w-3/4 shadow-2xl rounded-md sm:shadow-none sm:rounded-none flex-col justify-center items-center">
          <div className="sm:w-1/2 w-10/12 py-10">
            <h1 className="sm:text-4xl text-3xl font-bold sm:font-semibold mb-3">
              Log in to ShopWiz
            </h1>
            <h2 className="sm:text-lg text-sm">Enter your details below</h2>

            <form className="mt-7" onSubmit={handleSubmit}>
              <div className="mb-5">
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border-b-2 w-full outline-none"
                  placeholder="Email"
                />
              </div>

              <div className="mb-5">
                <input
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={formData.password}
                  className="border-b-2 w-full outline-none"
                  placeholder="Password"
                />
              </div>

              <div className="mb-5">
                <button className="bg-[#e07575] w-full text-white px-7 py-2 rounded-md">
                  Log In
                </button>
              </div>

              <div className="flex justify-center">
                <h1 className="text-gray-600">
                  Don't have an account?
                  <Link
                    to={"/register"}
                    className="text-blue-600 ml-1 border-b-2 border-blue-400"
                  >
                    Sign Up
                  </Link>
                </h1>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
