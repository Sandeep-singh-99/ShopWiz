import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAuth } from "../redux/slice/auth-slice";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { countData } = useSelector((state) => state.cart);

  // Retrieve user data from localStorage
  let userData = null;
  try {
    const storedData = localStorage.getItem("loginData");
    userData = storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error("Error parsing loginData:", error);
    localStorage.removeItem("loginData"); // Prevent future errors
  }

  const handleLogout = () => {
    dispatch(logoutAuth());
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center py-16 px-5 sm:px-10">
      {/* Profile Card */}
      <div className="flex flex-col border-2 items-center gap-4 bg-white shadow-xl rounded-lg p-6 w-full max-w-sm">
        {userData?.imageUrl ? (
          <img
            src={userData.imageUrl}
            alt={userData.username || "User"}
            className="h-24 w-24 rounded-full border-4 border-gray-300 object-scale-down shadow-md"
          />
        ) : (
          <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600 border border-gray-300 shadow-md">
            {userData?.username?.charAt(0) || "?"}
          </div>
        )}
        <h1 className="text-xl font-semibold text-gray-800">
          {userData?.username || "Guest User"}
        </h1>
        <p className="text-gray-600">
          {userData?.email || "No email provided"}
        </p>
        <p className="text-gray-500">{userData?.phone || "No phone number"}</p>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg py-2 transition-all"
        >
          Logout
        </button>
      </div>

      {/* Cart Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 w-full max-w-2xl">
        <div className="shadow-xl rounded-lg p-5 bg-blue-600 text-white flex flex-col gap-3">
          <h1 className="text-lg font-semibold">Cart</h1>
          <div className="border-b border-white"></div>
          <div className="flex justify-between">
            <h1>Total Items:</h1>
            <h1>{typeof countData === "number"
                    ? countData
                    : countData?.data || 0}</h1>
          </div>
          <Link to={"/cart"} className="w-full text-center bg-white text-blue-600 font-semibold rounded-lg py-2 hover:bg-gray-200 transition-all">
            View Cart
          </Link>
        </div>

        <div className="shadow-xl rounded-lg p-5 bg-purple-600 text-white flex flex-col gap-3">
          <h1 className="text-lg font-semibold">Orders</h1>
          <div className="border-b border-white"></div>
          <div className="flex justify-between">
            <h1>Total Orders:</h1>
            <h1>0</h1>
          </div>
          <button className="w-full bg-white text-purple-600 font-semibold rounded-lg py-2 hover:bg-gray-200 transition-all">
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
}
