// AdNavbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export const AdNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-8 py-4 shadow-md bg-oxfordblue">
      {/* Logo */}
      <h1
        className="text-2xl font-extrabold tracking-wide text-white cursor-pointer"
        onClick={() => navigate("/")}
      >
        Intern<span className="text-[#ff6b35]">Spark</span>
      </h1>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => navigate("/login")}
          className="px-5 py-2 text-sm font-semibold text-white transition-transform bg-orange-500 rounded-lg shadow-md hover:opacity-90 hover:scale-105"
        >
          Sign In
        </button>
        <button
          onClick={() => navigate("/register")}
          className="px-5 py-2 text-sm font-semibold text-white rounded-lg border border-[#ff6b35] bg-transparent hover:bg-[#ff6b35] hover:text-white hover:scale-105 hover:shadow-md transition-all"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default AdNavbar;
