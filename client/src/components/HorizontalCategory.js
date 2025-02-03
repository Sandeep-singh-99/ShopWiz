import React from "react";
import { useNavigate } from "react-router-dom";

// Import Category Images
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

export default function HorizontalCategory() {
  const navigate = useNavigate();

  const category = [
    { id: 1, name: "Mouse", img: img1 },
    { id: 2, name: "Airpods", img: img2 },
    { id: 3, name: "Camera", img: img3 },
    { id: 4, name: "Earphones", img: img4 },
    { id: 5, name: "Mobiles", img: img5 },
    { id: 6, name: "Printers", img: img6 },
    { id: 7, name: "Processor", img: img7 },
    { id: 8, name: "Refrigerator", img: img8 },
    { id: 9, name: "Speakers", img: img9 },
    { id: 10, name: "TV", img: img10 },
    { id: 11, name: "Trimmers", img: img11 },
    { id: 12, name: "Watches", img: img12 },
  ];

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  return (
    <div className="container mx-auto flex justify-center items-center">
      {/* Horizontal Scroll Wrapper */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide py-4 pr-6">
        {category.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer flex flex-col items-center group flex-shrink-0"
            onClick={() => handleCategoryClick(item.name)}
          >
            {/* Category Image */}
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#e1e8f0] transition-transform duration-200 group-hover:scale-110">
              <img
                loading="lazy"
                className="h-12 object-contain mix-blend-multiply transition-transform duration-200 ease-in-out group-hover:scale-125"
                src={item.img}
                alt={item.name}
              />
            </div>

            {/* Category Name */}
            <span className="mt-2 text-sm font-medium text-gray-800 group-hover:text-[#db4444]">
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* Hide Scrollbar for Chrome, Safari, and Edge */}
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
}
