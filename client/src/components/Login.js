import React, { useEffect, useState } from "react";

import img1 from "../assets/dl.beatsnoop 1.png";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/slice/auth-slice";
import { useDispatch } from "react-redux";

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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);
    try {
      dispatch(login(data));
      navigate("/") // Redirect to home page

      alert("Logged in successfully");
    } catch (error) {
      alert("Error logging in");
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  })

  return (
    <div className="pt-16">
      <div className="flex justify-between">
        <div className="bg-[#c6e5e9]">
          <img className="w-5/6" src={img1} alt="img1" />
        </div>

        <div className="flex w-2/4 flex-col justify-center items-center">
          <div className="w-1/2">
            <h1 className="text-4xl font-semibold mb-3">Log in to ShopWiz</h1>
            <h2 className="text-lg">Enter your details below</h2>

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
