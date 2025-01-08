import React, { useState } from "react";
import img1 from "../assets/dl.beatsnoop 1.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../redux/slice/auth-slice";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [uploadedImage, setUploadedImage] = useState(null);
  const [formData, setFormData] = useState({
    imageUrl: null, // Store the image URL as a string
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];   

    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        imageUrl: URL.createObjectURL(file), // Store the image URL for preview
      }));
      setUploadedImage(file);
      e.target.value = null; // Store the actual file for sending
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   // console.log("Form Data Before Submission: ", formData);

    const data = new FormData();
    data.append("file", uploadedImage); // Append the actual file object
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("password", formData.password);

    // ... rest of your code (potentially dispatch register action)

    try {
      dispatch(register(data))
      // const response = await axios.post(
      //   "http://localhost:5000/api/auth/register",
      //   data,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      navigate("/login");
      alert("Registration successful");
      // Handle successful registration
    } catch (error) {
      alert("Registration failed");
      // Handle registration errors
    }
  };

  // ... rest of your component rendering logic
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

            <form onSubmit={handleSubmit} className="mt-7">
              <div className="mb-5 flex justify-center">
                <input
                  type="file"
                  id="fileInput"
                  name="imageUrl"
                  
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer w-24 h-24 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-100"
                  aria-label="Upload Image"
                >
                  {uploadedImage ? (
                    <img
                      src={formData.imageUrl}
                      alt="Uploaded"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-gray-400 text-center">
                      Upload Image
                    </span>
                  )}
                </label>
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  name="username"
                  className="border-b-2 w-full outline-none"
                  placeholder="Full Name"
                />
              </div>

              <div className="mb-5">
                <input
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={formData.email}
                  className="border-b-2 w-full outline-none"
                  placeholder="Email"
                />
              </div>

              <div className="mb-5">
                <input
                  name="phone"
                  type="tel"
                  onChange={handleChange}
                  value={formData.phone}
                  className="border-b-2 w-full outline-none"
                  placeholder="Phone Number"
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
                  Sign Up
                </button>
              </div>

              <div className="flex justify-center">
                <h1 className="text-gray-600">
                  Already have an account?
                  <Link
                    to={"/login"}
                    className="text-blue-600 ml-2 border-b-2 border-blue-400"
                  >
                    Sign In
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
