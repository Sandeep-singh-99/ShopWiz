import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="shadow-xl">
      <div className="px-28 flex justify-between items-center pt-5 pb-3">
        <Link className=" text-4xl font-bold" to={"/"}>
          ShopWiz
        </Link>

        <div>
          <input
            type="text"
            placeholder="Search for products"
            className="border p-2 rounded-md"
          />
        </div>

        <div className="flex items-center gap-10">
          <i class="ri-shopping-cart-2-line text-black text-3xl"></i>
          <Link to={"login"} className="border text-white font-semibold px-4 py-2 rounded-md bg-[#db4444]">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
