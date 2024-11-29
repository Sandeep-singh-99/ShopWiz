import React from "react";
import VerticalProductMenu from "../components/VerticalProductMenu";
import CarouselView from "../components/CarouselView";


export default function Home() {
  return (
    <div className="px-28 py-10">
      <div className="flex flex-row gap-10">
        <VerticalProductMenu/>
        <CarouselView/>
      </div>
    </div>
  );
}
