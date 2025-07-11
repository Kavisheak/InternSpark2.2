import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const CriticalAlerts = () => {
  return (
    <div className="bg-red-200 p-4 rounded-lg">
      <div className="flex items-center text-red-500 font-semibold mb-3">
        <FaExclamationTriangle className="mr-2" />
        Critical Alerts
      </div>
      <ul className="space-y-3 text-sm">
        <li className="flex justify-between items-center bg-red-400 p-2 rounded">
          <span>3 users have 10+ reports and require suspension</span>
          <button className="text-blue-400 hover:underline">Action</button>
        </li>
        <li className="flex justify-between items-center bg-red-400 p-2 rounded">
          <span>8 users are nearing suspension threshold (7–9 reports)</span>
          <button className="text-blue-400 hover:underline">Action</button>
        </li>
        <li className="flex justify-between items-center bg-red-400 p-2 rounded">
          <span>15 internship listings are about to expire</span>
          <button className="text-blue-400 hover:underline">Action</button>
        </li>
      </ul>
    </div>
  );
};

export default CriticalAlerts;
