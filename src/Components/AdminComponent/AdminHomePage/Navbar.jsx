import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 w-full">
      <header className="w-full px-6 py-4 flex justify-between items-center mb-8">
        <div className="text-2xl font-bold">
          <span className="text-red-500">Intern</span>Spark Admin
        </div>
        <div className="space-x-6 text-sm">
          <a href="#" className="hover:text-gray-300">User Management</a>
          <a href="#" className="hover:text-gray-300">Internship Listings</a>
          <a href="#" className="hover:text-gray-300">System Settings</a>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-white text-black px-4 py-1 rounded hover:bg-gray-300">Admin Profile</button>
          <button className="text-red-500 hover:underline">Logout</button>
        </div>
      </header>
    </nav>
  );
};

export default Navbar;
