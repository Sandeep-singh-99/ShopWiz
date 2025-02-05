import React, { useEffect } from "react";
import CarouselView from "../components/CarouselView";
import HorizontalCategory from "../components/HorizontalCategory";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../redux/slice/auth-slice";
import { countCartProduct, restartCartCount } from "../redux/slice/cart-slice";

// Configuration for HorizontalCardProduct components
const productCategories = [
  { category: "Mouse", heading: "Top Mouse" },
  { category: "Airpodes", heading: "Top Earbudes" },
  { category: "Camera", heading: "Top Camera" },
  { category: "Earphones", heading: "Top Earphones" },
  { category: "Mobiles", heading: "Top Mobiles" },
  { category: "Printers", heading: "Top Printers" },
  { category: "Processor", heading: "Top Processor" },
  { category: "Refrigerator", heading: "Top Refrigerator" },
  { category: "Speakers", heading: "Top Speakers" },
  { category: "TV", heading: "Top TV" },
  { category: "Trimmers", heading: "Top Trimmers" },
  { category: "Watches", heading: "Top Watches" },
];

export default function Home() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(countCartProduct());
    } else {
      dispatch(restartCartCount());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <div className="px-2 sm:px-20 py-5">
      <div className="flex flex-col gap-5">
        <HorizontalCategory />
        <CarouselView />
        {productCategories.map(({ category, heading }) => (
          <HorizontalCardProduct
            key={category}
            category={category}
            heading={heading}
          />
        ))}
      </div>
    </div>
  );
}
