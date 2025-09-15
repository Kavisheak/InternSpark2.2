// AdHero.jsx
import React, { useState, useEffect } from "react";
import { cardContents1, cardContents2 } from "../../Constants/Constants";
import AdTestimonials from "./AdTestimonials";
import { useNavigate } from "react-router-dom";

// Add your big images here
const sliderImages = [
  "https://i.pinimg.com/1200x/c1/df/87/c1df875d53d18c0e8cd9ac21a20c035c.jpg",
  "https://i.pinimg.com/736x/a3/0f/81/a30f816004b8a7ff2024901e0c969bbb.jpg",
  "https://i.pinimg.com/736x/fd/cf/de/fdcfde9d481c8b868299a3336cca0579.jpg",
  "https://i.pinimg.com/736x/84/ed/04/84ed04a4d0696c0a4a88abf920af7008.jpg",
];

export const AdHero = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white ">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pb-32 text-center text-white bg-gray-100 pt-14">
        <h1 className="mb-6 text-5xl font-extrabold leading-tight drop-shadow-md text-oxfordblue">
          Your Internship Journey,{" "}
          <span className="text-[#ff6b35]">Simplified</span>
        </h1>
        <p className="max-w-2xl mb-10 text-lg text-oxfordblue">
          Connecting students and companies to create opportunities and growth with ease.
        </p>
        <div className="flex flex-wrap justify-center gap-5">
          <button
            className="px-7 py-3 text-lg font-semibold text-white rounded-lg bg-[#ff6b35] shadow-lg hover:opacity-90 hover:scale-105 transition-transform"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
          <button
            className="px-7 py-3 text-lg font-semibold text-oxfordblue bg-white border border-[#ff6b35] rounded-lg shadow-md hover:bg-[#ff6b35] hover:text-white hover:scale-105 transition-all"
            onClick={() => navigate("/learnmore")}
          >
            Learn More
          </button>
        </div>

        {/* Big Image Slider */}
        <div className="flex items-center justify-center mt-10">
          <div className="relative w-[480px] h-[320px] rounded-xl overflow-hidden shadow-2xl border-4  bg-white">
            <img
              src={sliderImages[current]}
              alt={`Slider ${current + 1}`}
              className="object-cover w-full h-full transition-all duration-700"
            />
            {/* Dots */}
            <div className="absolute left-0 right-0 flex justify-center gap-3 bottom-5">
              {sliderImages.map((_, idx) => (
                <span
                  key={idx}
                  className={`inline-block w-4 h-4 rounded-full transition-all ${
                    idx === current ? "bg-[#ff6b35]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-14 text-oxfordblue">
          Why Choose <span className="text-[#ff6b35]">InternSpark</span>?
        </h2>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 place-items-center">
          {cardContents1.concat(cardContents2).map((card, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-8 text-center transition-transform bg-white border border-gray-200 shadow-md rounded-2xl w-80 hover:scale-105 hover:shadow-xl"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-4 text-white rounded-full shadow-lg bg-oxfordblue">
                {card.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-oxfordblue">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600">{card.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <AdTestimonials />
    </div>
  );
};

export default AdHero;
