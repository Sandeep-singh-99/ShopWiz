import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="border-b-2 border-black border-opacity-25">
      <div className="px-20 flex justify-between items-center pt-5 pb-3">
        <Link className=" text-4xl font-bold" to={"/"}>
          ShopWiz
        </Link>

        {/* <div>
          <input
            type="text"
            placeholder="Search for products"
            className="border p-2 rounded-md"
          />
        </div> */}

        <div className="flex items-center gap-10">
          {/* <Link to={"cart"}>
            <i class="ri-shopping-cart-2-line text-black text-3xl"></i>
          </Link> */}

          <Link to={"cart"} class="flex justify-center items-center">
            <div class="relative py-2">
              <div class="t-0 absolute left-3">
                <p class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                  3
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="file: mt-4 h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
          </Link>

          <Link
            to={"login"}
            className="border text-white font-semibold px-4 py-2 rounded-md bg-[#db4444] hover:bg-[#db3333]"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
