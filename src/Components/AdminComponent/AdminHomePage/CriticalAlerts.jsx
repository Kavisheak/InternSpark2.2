import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const CriticalAlerts = () => {
  return (
    <div className="p-4 bg-orange-200 rounded-lg">
      <div className="flex items-center mb-3 font-semibold text-red-600">
        <FaExclamationTriangle className="mr-2" />
        Critical Alerts
      </div>
      <ul className="space-y-3 text-sm">
        <li className="flex items-center justify-between p-2 bg-white rounded">
          <span className="text-black">3 users have 10+ reports and require suspension</span>
          <button className="font-bold text-orange-600 hover:underline">Action</button>
        </li>
        <li className="flex items-center justify-between p-2 bg-white rounded">
          <span className="text-black">8 users are nearing suspension threshold (7–9 reports)</span>
          <button className="font-bold text-orange-600 hover:underline">Action</button>
        </li>
        <li className="flex items-center justify-between p-2 bg-white rounded">
          <span className="text-black">15 internship listings are about to expire</span>
          <button className="font-bold text-orange-600 hover:underline">Action</button>
        </li>
      </ul>
    </div>
  );
};

export default CriticalAlerts;