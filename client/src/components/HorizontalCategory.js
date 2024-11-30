import React from "react";

import img1 from "../assets/category/mouse.webp";
import img2 from "../assets/category/airpodes.webp";
import img3 from "../assets/category/camera.jpg";
import img4 from "../assets/category/earpodes.webp";
import img5 from "../assets/category/mobile.webp";
import img6 from "../assets/category/printer.webp";
import img7 from "../assets/category/Processor.png";
import img8 from "../assets/category/refrigerator.webp";
import img9 from "../assets/category/speaker.webp";
import img10 from "../assets/category/tv.webp";
import img11 from "../assets/category/trimmers.webp";
import img12 from "../assets/category/watch.webp";
import { useNavigate } from "react-router-dom";

export default function HorizontalCategory() {
  const category = [
    {
      id: 1,
      name: "Mouse",
      img: img1,
    },
    {
      id: 2,
      name: "Airpodes",
      img: img2,
    },
    {
      id: 3,
      name: "Camera",
      img: img3,
    },
    {
      id: 4,
      name: "Earphones",
      img: img4,
    },
    {
      id: 5,
      name: "Mobiles",
      img: img5,
    },
    {
      id: 6,
      name: "Printers",
      img: img6,
    },
    {
      id: 7,
      name: "Processor",
      img: img7,
    },
    {
      id: 8,
      name: "Refrigerator",
      img: img8,
    },
    {
      id: 9,
      name: "Speakers",
      img: img9,
    },
    {
      id: 10,
      name: "TV",
      img: img10,
    },
    {
      id: 11,
      name: "Trimmers",
      img: img11,
    },
    {
      id: 12,
      name: "Watches",
      img: img12,
    },
  ];

  const navigate = useNavigate()

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`)
  }

  return (
    <div className="flex flex-row gap-5 overflow-x-auto">
      {category.map((item) => (
        <div key={item.id} className="cursor-pointer" onClick={() => handleCategoryClick(item.name)}>
          <div className="flex justify-center items-center w-20 h-20 rounded-full bg-[#e1e8f0]">
            <img
              className="h-12 transition-all duration-100 ease-in-out object-contain mix-blend-multiply hover:scale-125"
              src={item.img}
              alt={item.name}
            />
          </div>
          <div className="flex justify-center">
            <span>{item.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
