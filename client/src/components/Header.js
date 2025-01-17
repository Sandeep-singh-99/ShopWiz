import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "../redux/slice/auth-slice";
import { countCartProduct, restartCartCount } from "../redux/slice/cart-slice";

export default function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  const { countData } = useSelector((state) => state.cart);

  // Parse login data from localStorage
  const data = JSON.parse(localStorage.getItem("loginData"));

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(checkAuth());
      dispatch(countCartProduct());
    } else {
      localStorage.removeItem("loginData");
      localStorage.removeItem("token");
      dispatch(restartCartCount())
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    console.log("User data from localStorage:", data);
    console.log("Count data:", countData);
  }, [data, countData]); // Logs whenever localStorage data or countData is updated


  if (isLoading) {
    return <div>Loading...</div>; // Optional loader
  }

  return (
    <div className="border-b-2 border-black border-opacity-25">
      <div className="px-20 flex justify-between items-center pt-5 pb-3">
        <Link className="text-4xl font-bold" to={"/"}>
          ShopWiz
        </Link>

        <div className="flex items-center gap-10">
          <Link to={"cart"} className="flex justify-center items-center">
            <div className="relative py-2">
              <div className="t-0 absolute left-3">
                <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                {typeof countData === 'number' ? countData : countData?.data || 0} 
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="mt-4 h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
          </Link>

          <div>
            {isAuthenticated ? (
              <Link to={"profile"}>
                {data ? (
                  data.imageUrl ? (
                    <img
                      src={data.imageUrl}
                      alt={data.username || "User"}
                      className="h-10 w-10 rounded-full object-contain"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600">
                        {data?.username?.charAt(0) || "?"}
                      </span>
                    </div>
                  )
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
                )}
              </Link>
            ) : (
              <Link
                to={"login"}
                className="border text-white font-semibold px-4 py-2 rounded-md bg-[#db4444] hover:bg-[#db3333]"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
