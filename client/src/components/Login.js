// import React, { useEffect, useState } from "react";
// import img1 from "../assests/dl.beatsnoop 1.png";
// import { Link, useNavigate } from "react-router-dom";
// import { login } from "../redux/slice/auth-slice";
// import { useDispatch } from "react-redux";
// import axios from "axios";
// import { message } from "antd";

// const API_BASE_URL = process.env.REACT_APP_API_URL;

// export default function Login() {
//   const dispatch = useDispatch(); // Initialize the dispatch function
//   const navigate = useNavigate(); // Initialize the navigate function

//   // Initialize the form data state
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   // Handle form input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.email || !formData.password) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     const data = {
//       email: formData.email,
//       password: formData.password,
//     };

//     console.log("Form Data before dispatch: ", data);

//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/api/auth/login`,
//         data,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );

//       if (response.status === 200 && response.data.success) {
//         const { data: userData } = response.data;
//         if (userData) {
//           localStorage.setItem("token", userData.accesstoken);
//           localStorage.setItem("loginData", JSON.stringify(userData.user));

//           dispatch(login(userData.user));
//         }
//         navigate("/");
//         message.success("Login successful");
//       } else {
//         message.error("Login failed");
//       }
//     } catch (error) {
//       alert("Error logging in");
//       console.log("Error: ", error);
//     }
//   };

//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       navigate("/");
//     }
//   });

//   return (
//     <div className="sm:pt-16  h-screen pt-5">
//       <div className="flex sm:justify-between justify-center">
//         <div className="bg-[#c6e5e9] sm:block hidden">
//           <img className="w-5/6" src={img1} alt="img1" loading="lazy" />
//         </div>

//         <div className="flex sm:w-2/4 w-full shadow-2xl rounded-md sm:shadow-none sm:rounded-none flex-col justify-center items-center py-8">
//           <div className="sm:w-3/4 w-10/12 py-10 bg-white rounded-md shadow-md px-10">
//             <h1 className="sm:text-4xl text-3xl font-bold sm:font-semibold mb-3">
//               Log in to ShopWiz
//             </h1>
//             <h2 className="sm:text-lg text-sm">Enter your details below</h2>

//             <form className="mt-7" onSubmit={handleSubmit}>
//               <div className="mb-5">
//                 <input
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="border-b-2 w-full outline-none py-2 px-4"
//                   placeholder="Email"
//                 />
//               </div>

//               <div className="mb-5">
//                 <input
//                   name="password"
//                   type="password"
//                   onChange={handleChange}
//                   value={formData.password}
//                   className="border-b-2 w-full outline-none py-2 px-4"
//                   placeholder="Password"
//                 />
//               </div>

//               <div className="mb-5">
//                 <button className="bg-[#e07575] w-full text-white px-7 py-2 rounded-md">
//                   Log In
//                 </button>
//               </div>

//               <div className="flex justify-center">
//                 <h1 className="text-gray-600">
//                   Don't have an account?
//                   <Link
//                     to={"/register"}
//                     className="text-blue-600 ml-1 border-b-2 border-blue-400"
//                   >
//                     Sign Up
//                   </Link>
//                 </h1>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/slice/auth-slice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { message } from "antd";

const API_BASE_URL = process.env.REACT_APP_API_URL;

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      message.warning("Please fill in all fields.");
      return;
    }
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        formData,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      if (response.status === 200 && response.data.success) {
        const { data: userData } = response.data;
        localStorage.setItem("token", userData.accesstoken);
        localStorage.setItem("loginData", JSON.stringify(userData.user));
        dispatch(login(userData.user));
        navigate("/");
        message.success("Login successful");
      } else {
        message.error("Login failed");
      }
    } catch (error) {
      message.error("Error logging in");
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-700 mb-4 text-center">Log in to ShopWiz</h1>
        <p className="text-gray-500 mb-6 text-center">Enter your details below</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Password"
          />
          <button
            type="submit"
            className="w-full bg-[#e07575] text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-center">
          Don't have an account?
          <Link to="/register" className="text-blue-600 ml-1 border-b-2 border-blue-400">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
