import React from "react";
import CarouselView from "../components/CarouselView";
import HorizontalCategory from "../components/HorizontalCategory";
import HorizontalCardProduct from "../components/HorizontalCardProduct";

export default function Home() {
  

  return (
    <div className="px-4 md:px-20 py-5">
      <div className="flex flex-col gap-5">
        <HorizontalCategory />
        <CarouselView />

        <HorizontalCardProduct category={"Mouse"} heading={"Top Mouse"}/>

        <HorizontalCardProduct category={"Airpodes"} heading={"Top Earbudes"}/>

        <HorizontalCardProduct category={"Camera"} heading={"Top Camera"}/>

        <HorizontalCardProduct category={"Earphones"} heading={"Top Earphones"}/>

        <HorizontalCardProduct category={"Mobiles"} heading={"Top Mobiles"}/>

        <HorizontalCardProduct category={"Printers"} heading={"Top Printers"}/>

        <HorizontalCardProduct category={"Processor"} heading={"Top Processor"}/>

        <HorizontalCardProduct category={"Refrigerator"} heading={"Top Refrigerator"}/>

        <HorizontalCardProduct category={"Speakers"} heading={"Top Speakers"}/>

        <HorizontalCardProduct category={"TV"} heading={"Top TV"}/>

        <HorizontalCardProduct category={"Trimmers"} heading={"Top Trimmers"}/>

        <HorizontalCardProduct category={"Watches"} heading={"Top Watches"}/>
      </div>
    </div>
  );
}
