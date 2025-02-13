import React from "react";
import { useNavigate } from "react-router-dom";

// Import Category Images
import img1 from "../assests/category/mouse.webp";
import img2 from "../assests/category/airpodes.webp";
import img3 from "../assests/category/camera.jpg";
import img4 from "../assests/category/earpodes.webp";
import img5 from "../assests/category/mobile.webp";
import img6 from "../assests/category/printer.webp";
import img7 from "../assests/category/Processor.png";
import img8 from "../assests/category/refrigerator.webp";
import img9 from "../assests/category/speaker.webp";
import img10 from "../assests/category/tv.webp";
import img11 from "../assests/category/trimmers.webp";
import img12 from "../assests/category/watch.webp";

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
    <div className="mx-auto container">
      {/* Flex layout to keep all categories in one line */}
      <div className="flex gap-2 md:gap-6 overflow-x-auto sm:justify-center md:justify-center sm:overflow-hidden whitespace-nowrap scroll-hide w-full  py-4">
        {category.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer flex flex-col justify-center items-center group flex-shrink-0 transition-all duration-300 ease-in-out"
            onClick={() => handleCategoryClick(item.name)}
          >
            {/* Category Image */}
            <div className="w-16 h-16 sm:w-13 sm:h-13 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 rounded-full overflow-hidden p-2 bg-gradient-to-b from-gray-100 to-white shadow-md flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:shadow-lg">
              <img
                loading="lazy"
                className="h-full object-scale-down mix-blend-multiply transition-transform duration-300 ease-in-out group-hover:scale-125"
                src={item.img}
                alt={item.name}
              />
            </div>

            {/* Category Name */}
            <span className="mt-1 text-xs md:text-sm font-medium text-white transition-colors duration-200 group-hover:text-[#db4444]">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}




