import React from "react";
import img1 from "../assets/dl.beatsnoop 1.png";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="pt-16">
      <div className="flex justify-between">
        <div className="bg-[#c6e5e9]">
          <img className="w-5/6" src={img1} alt="img1" />
        </div>

        <div className="flex w-2/4 flex-col justify-center items-center">
          <div className="w-1/2">
            <h1 className="text-4xl font-semibold mb-3">Create an account</h1>
            <h2 className="text-lg">Enter your details below</h2>

            <form className="mt-7">
              <div className="mb-5 flex justify-center">
                <input type="file" id="fileInput" className="hidden" />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer w-24 h-24 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-100"
                  aria-label="Upload Image"
                >
                  <span className="text-gray-400 text-center">Upload Image</span>
                </label>
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  className="border-b-2 w-full outline-none"
                  placeholder="Full Name"
                />
              </div>

              <div className="mb-5">
                <input
                  type="email"
                  className="border-b-2 w-full outline-none"
                  placeholder="Email"
                />
              </div>

              <div className="mb-5">
                <input
                  type="number"
                  className="border-b-2 w-full outline-none"
                  placeholder="Phone Number"
                />
              </div>

              <div className="mb-5">
                <input
                  type="password"
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
                  Already have an account?
                  <Link
                    to={"/login"}
                    className="text-blue-600 ml-2 border-b-2 border-blue-400"
                  >
                    Log in
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
