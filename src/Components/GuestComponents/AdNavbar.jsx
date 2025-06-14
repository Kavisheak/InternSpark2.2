import React from 'react';

export const AdNavbar = () => {
  return (
    <div className='bg-gray-100 p-7'>
      <h1 className="font-bold text-center text-transparent text-7xl bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 bg-clip-text">
         Intern Spark
      </h1>
      <p className="pt-6 font-medium text-center text-black">
        Discover internship opportunities and post openings to connect students with real-world experience
      </p>
      <div className='flex justify-center gap-4 p-8 pt-20 text-center'>
        <button
          className="px-5 py-2 text-xl font-semibold text-white transition duration-200 rounded-md shadow bg-gradient-to-r from-blue-600 via-blue-500 to-blue-300 hover:opacity-80">
          Sign In
        </button>
        <button
          className="px-5 py-2 text-xl font-semibold text-white transition duration-200 rounded-md shadow bg-gradient-to-r from-blue-600 via-blue-500 to-blue-300 hover:opacity-80">
          Sign Up
        </button>
      </div>
    </div>
  );
};
