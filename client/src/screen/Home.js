import React from "react";
import CarouselView from "../components/CarouselView";
import HorizontalCategory from "../components/HorizontalCategory";


export default function Home() {
  return (
    <div className="px-20 py-5">
      <div className="flex flex-col gap-5">
        <HorizontalCategory/>
        <CarouselView/>
      </div>
    </div>
  );
}
