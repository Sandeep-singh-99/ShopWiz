import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import img1 from "../assets/dl.beatsnoop 1.png";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slice/auth-slice";

export default function Profile() {
  const data = JSON.parse(localStorage.getItem("loginData"));
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    console.log("Logged out");
    
    navigate("/")
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/")
    }
  })
  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-5">User Profile</h1>
      <div className="flex flex-col items-center gap-5">
        {/* Display user profile image */}
        <div className="h-32 w-32 rounded-full overflow-hidden">
          {data?.imageUrl ? (
            <img
              src={data.imageUrl}
              alt={data?.username || "Profile"}
              className="h-full w-full object-contain"
            />
          ) : (
            <img
              src={img1}
              alt="Default"
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div>
          <button onClick={handleLogout} className="bg-yellow-600 px-2 rounded-md text-white py-1 text-sm">Logout</button>
        </div>
        {/* Display user details */}
        <div className="text-center">
          <h2 className="text-xl font-semibold">{data?.username || "N/A"}</h2>
          <p className="text-gray-500">{data?.email || "Email not available"}</p>
          <p className="text-gray-500">{data?.phone || "Phone not available"}</p>
        </div>
      </div>
    </div>
  );
}
