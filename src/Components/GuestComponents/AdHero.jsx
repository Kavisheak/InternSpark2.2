import React from 'react';
import { cardContents1, cardContents2 } from '../Constants/Constants';



export const AdHero = () => {
  return (
    <div
      className="
        min-h-screen
        w-full
        overflow-hidden
        pt-16
        bg-black
        [background-image:radial-gradient(circle_at_top_right,_#0d47a1_20%,_transparent_70%)]
        bg-no-repeat
        bg-cover
      "
    >
      {/* Title */}
      <h1 className="mb-12 text-4xl font-bold text-center text-white">
        Your Internship Process Made Easy
      </h1>

      {/* Section for cardContents1 */}
      <div className="flex justify-center px-6 mb-12">
        <div className="grid grid-cols-1 gap-y-8 gap-x-16 sm:grid-cols-2 md:grid-cols-3">
          {cardContents1.map((card, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-8 transition-transform transform border shadow-md bg-white/10 backdrop-blur-lg border-white/20 w-80 rounded-2xl hover:scale-105 hover:shadow-xl"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center p-4 mr-4 text-white border border-blue-300 rounded-full">
                  {card.icon}
                </div>
                <h2 className="text-xl font-semibold text-white">{card.title}</h2>
              </div>
              <p className="text-sm text-center text-gray-300">{card.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section for cardContents2 */}
      <div className="flex justify-center px-6 pb-16">
        <div className="grid grid-cols-1 gap-y-8 gap-x-16 sm:grid-cols-2 md:grid-cols-3">
          {cardContents2.map((card, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-8 transition-transform transform border shadow-md bg-white/10 backdrop-blur-lg border-white/20 w-80 rounded-2xl hover:scale-105 hover:shadow-xl"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center p-4 mr-4 text-white border border-blue-300 rounded-full">
                  {card.icon}
                </div>
                <h2 className="text-xl font-semibold text-white">{card.title}</h2>
              </div>
              <p className="text-sm text-center text-gray-300">{card.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
