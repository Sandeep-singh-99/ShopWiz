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
    <div className="container mx-auto">
      {/* Flex layout to keep all categories in one line */}
      <div className="flex gap-2 md:gap-4 justify-between overflow-x-auto whitespace-nowrap scrollbar-hide w-full sm:justify-center py-4">
        {category.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer flex flex-col justify-center items-center group flex-shrink-0 transition-all duration-300 ease-in-out"
            onClick={() => handleCategoryClick(item.name)}
          >
            {/* Category Image */}
            <div className="w-16 h-16 sm:w-20 sm:h-20  rounded-full overflow-hidden p-2 bg-gradient-to-b from-gray-100 to-white shadow-md flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:shadow-lg">
              <img
                loading="lazy"
                className="h-full object-scale-down mix-blend-multiply transition-transform duration-300 ease-in-out group-hover:scale-125"
                src={item.img}
                alt={item.name}
              />
            </div>

            {/* Category Name */}
            <span className="mt-1 text-xs md:text-sm font-medium text-gray-800 transition-colors duration-200 group-hover:text-[#db4444]">
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




