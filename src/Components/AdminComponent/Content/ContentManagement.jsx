import React from 'react';
import { FaPlus, FaRegFileAlt, FaEye, FaCheckCircle, FaPencilAlt } from 'react-icons/fa';

export default function ContentManagement() {
  return (
    <div>
      {/* Header and Button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Content Management</h1>
          <p className="text-sm text-gray-500">
            Manage all platform content and publications
          </p>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-gray-800">
          <FaPlus size={12} />
          <span>Create Content</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Content */}
        <div className="border rounded-xl p-5 shadow-sm bg-white">
          <div className="text-gray-500 flex items-center space-x-2 mb-2">
            <FaRegFileAlt size={20} />
            <span>Total Content</span>
          </div>
          <div className="text-3xl font-bold">5</div>
          <p className="text-sm text-gray-400">All content items</p>
        </div>

        {/* Published */}
        <div className="border rounded-xl p-5 shadow-sm bg-white">
          <div className="text-gray-500 flex items-center space-x-2 mb-2">
            <FaCheckCircle size={20} className="text-green-500" />
            <span>Published</span>
          </div>
          <div className="text-3xl font-bold">3</div>
          <p className="text-sm text-green-600">
            +60.0% <span className="text-gray-400">60.0% of total</span>
          </p>
        </div>

        {/* Drafts */}
        <div className="border rounded-xl p-5 shadow-sm bg-white">
          <div className="text-gray-500 flex items-center space-x-2 mb-2">
            <FaPencilAlt size={20} className="text-orange-500" />
            <span>Drafts</span>
          </div>
          <div className="text-3xl font-bold">1</div>
          <p className="text-sm text-gray-400">Pending publication</p>
        </div>

        {/* Total Views */}
        <div className="border rounded-xl p-5 shadow-sm bg-white">
          <div className="text-gray-500 flex items-center space-x-2 mb-2">
            <FaEye size={20} className="text-purple-500" />
            <span>Total Views</span>
          </div>
          <div className="text-3xl font-bold">7,640</div>
          <p className="text-sm text-gray-400">Across all content</p>
        </div>
      </div>
    </div>
  );
}
