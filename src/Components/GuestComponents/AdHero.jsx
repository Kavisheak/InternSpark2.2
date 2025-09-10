// AdHero.jsx
import React from "react";
import { cardContents1, cardContents2 } from "../../Constants/Constants";
import AdTestimonials from "./AdTestimonials";
import { useNavigate } from "react-router-dom";

export const AdHero = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-24 text-center text-white bg-gray-100 pb-28">
        <h1 className="mb-6 text-5xl font-extrabold leading-tight drop-shadow-md text-oxfordblue">
          Your Internship Journey,{" "}
          <span className="text-[#ff6b35]">Simplified</span>
        </h1>
        <p className="max-w-2xl mb-10 text-lg text-oxfordblue">
          Discover opportunities, connect with companies, and build your career
          with ease.
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
            onClick={() => navigate("/about")}
          >
            Learn More
          </button>
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