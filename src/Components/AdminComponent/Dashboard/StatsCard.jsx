import React from 'react';

const StatsCard = ({ title, value, subtitle, icon, trend }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <div className="text-gray-400">{icon}</div>
      </div>
      <div className="space-y-1">
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">{subtitle}</div>
        {trend && (
          <div className="text-sm text-green-600">{trend}</div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;