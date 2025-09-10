import React from "react";
import { cardContents1, cardContents2 } from "../../Constants/Constants";

const AdLearnMore = () => {
  return (
    <div className="bg-gray-50">
      {/* Learn More Header */}
      <section className="px-6 py-20 text-center">
        <h2 className="mb-6 text-4xl font-bold text-[#0b2545]">
          Why <span className="text-[#ff6b35]">InternSpark</span> Works for Everyone
        </h2>
        <p className="max-w-2xl mx-auto mb-12 text-lg text-gray-600">
          Whether you're a student looking for the perfect internship or a company
          searching for top talent, InternSpark makes the connection simple, fast,
          and effective.
        </p>
      </section>

      {/* Feature Cards */}
      <section className="px-6 py-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 place-items-center">
          {cardContents1.concat(cardContents2).map((card, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-8 text-center transition-transform transform bg-white border border-gray-200 shadow-md rounded-2xl w-80 hover:scale-105 hover:shadow-lg"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-4 text-white rounded-full bg-[#0b2545]">
                {card.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[#0b2545]">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600">{card.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-20 bg-white">
        <h2 className="mb-12 text-3xl font-bold text-center text-[#0b2545]">
          How It Works
        </h2>
        <div className="grid max-w-5xl gap-10 mx-auto text-center md:grid-cols-3">
          <div className="p-6 transition border shadow rounded-2xl hover:shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-[#ff6b35]">1. Sign Up</h3>
            <p className="text-gray-600">
              Students create a profile, and companies register to post opportunities.
            </p>
          </div>
          <div className="p-6 transition border shadow rounded-2xl hover:shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-[#ff6b35]">2. Connect</h3>
            <p className="text-gray-600">
              Students discover internships, and companies find the right candidates.
            </p>
          </div>
          <div className="p-6 transition border shadow rounded-2xl hover:shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-[#ff6b35]">3. Grow</h3>
            <p className="text-gray-600">
              Students gain experience, and companies nurture talent for the future.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-20 text-center bg-oxfordblue">
        <h2 className="mb-6 text-3xl font-bold text-white">
          Ready to start your journey?
        </h2>
        <p className="mb-10 text-lg text-gray-200">
          Join InternSpark today and unlock endless opportunities.
        </p>
        <div className="flex justify-center gap-6">
          <button className="px-6 py-3 text-lg font-semibold text-white rounded-md bg-[#ff6b35] hover:opacity-90">
            Get Started
          </button>
          <button className="px-6 py-3 text-lg font-semibold text-[#0b2545] bg-white border border-[#ff6b35] rounded-md hover:bg-[#ff6b35] hover:text-white">
            Learn More
          </button>
        </div>
      </section>
    </div>
  );
};

export default AdLearnMore;
