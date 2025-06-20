import React from 'react';
import { Users, Settings, Activity } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">InternSpark Admin</h1>
          </div>
          
          <nav className="flex items-center space-x-6">
            <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <Users size={18} />
              <span>Users</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <Activity size={18} />
              <span>Activities</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <span>📄</span>
              <span>Content</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <Settings size={18} />
              <span>Settings</span>
            </a>
          </nav>
        </div>
        
       <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-900">Admin Profile</button>
           <button className="text-gray-600 hover:text-gray-900">Logout</button>
  </div>
  </div>
    </header>
  );
};

export default Header;