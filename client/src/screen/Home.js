import React, { useEffect } from "react";
import CarouselView from "../components/CarouselView";
import HorizontalCategory from "../components/HorizontalCategory";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../redux/slice/auth-slice";
import { countCartProduct, restartCartCount } from "../redux/slice/cart-slice";
import { message } from "antd";

export default function Home() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  useEffect(() => {
    const clearUserData = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("loginData");
    };
  
    const authenticateAndFetchData = async () => {
      try {
        const isAuthenticatedUser = await dispatch(checkAuth()).unwrap();
        if (isAuthenticatedUser) {
          await dispatch(countCartProduct());
        } else {
          clearUserData();
          await dispatch(restartCartCount());
        }
      } catch (error) {
         message.error("Authentication failed. Please log in again.");
        // clearUserData();
        await dispatch(restartCartCount());
      }
    };
  
    authenticateAndFetchData();
  }, [dispatch]);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //    dispatch(checkAuth())
  //       .unwrap()
  //       .then((res) => {
  //         dispatch(countCartProduct());
  //       })
  //       .catch((error) => {
  //         message.error("Authentication failed. Please log in again.");
  //         localStorage.removeItem("token");
  //         localStorage.removeItem("loginData");
  //         dispatch(restartCartCount());
  //       });
  //   }
  // })
  return (
    <div className="px-4 md:px-20 py-5">
      <div className="flex flex-col gap-5">
        <HorizontalCategory />
        <CarouselView />

        <HorizontalCardProduct category={"Mouse"} heading={"Top Mouse"} />

        <HorizontalCardProduct category={"Airpodes"} heading={"Top Earbudes"} />

        <HorizontalCardProduct category={"Camera"} heading={"Top Camera"} />

        <HorizontalCardProduct
          category={"Earphones"}
          heading={"Top Earphones"}
        />

        <HorizontalCardProduct category={"Mobiles"} heading={"Top Mobiles"} />

        <HorizontalCardProduct category={"Printers"} heading={"Top Printers"} />

        <HorizontalCardProduct
          category={"Processor"}
          heading={"Top Processor"}
        />

        <HorizontalCardProduct
          category={"Refrigerator"}
          heading={"Top Refrigerator"}
        />

        <HorizontalCardProduct category={"Speakers"} heading={"Top Speakers"} />

        <HorizontalCardProduct category={"TV"} heading={"Top TV"} />

        <HorizontalCardProduct category={"Trimmers"} heading={"Top Trimmers"} />

        <HorizontalCardProduct category={"Watches"} heading={"Top Watches"} />
      </div>
    </div>
  );
}
