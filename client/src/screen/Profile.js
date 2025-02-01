import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import img1 from "../assets/dl.beatsnoop 1.png";
import { useNavigate } from "react-router-dom";
import { logout, logoutAuth } from "../redux/slice/auth-slice";

export default function Profile() {
  const data = JSON.parse(localStorage.getItem("loginData"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAuth());
    localStorage.removeItem("token");
    localStorage.removeItem("loginData");
    navigate("/");
  };
  return (
    <div className="flex py-28">
      <div className="flex justify-evenly w-full">
        <div className="flex flex-col justify-center items-center gap-2 bg-blue-400 shadow-2xl rounded-lg p-5">
          <h1>Sandeep Singh</h1>
          <h1>sk3356337@gmail.com</h1>
          <p>9651869780</p>

          <button onClick={handleLogout} className="w-full bg-purple-500 text-white rounded-lg py-1">Logout</button>
        </div>

        <div className="flex flex-col gap-5 items-center">
          <div className="shadow-2xl rounded-lg p-2 bg-blue-700 w-56">
            <h1>Cart</h1>
            <div className="border-2"></div>
            <div className="flex justify-between">
              <h1>Total Cart</h1>
              <h1>Total</h1>
            </div>

            <button className="w-full bg-purple-500 text-white rounded-lg py-1">View Cart</button>
          </div>
          <div className="shadow-2xl rounded-lg p-2 bg-blue-700 w-56">
            <h1>Cart</h1>
            <div className="border-2"></div>
            <div className="flex justify-between">
              <h1>Total Cart</h1>
              <h1>Total</h1>
            </div>

            <button className="w-full bg-purple-500 text-white rounded-lg py-1">View Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
