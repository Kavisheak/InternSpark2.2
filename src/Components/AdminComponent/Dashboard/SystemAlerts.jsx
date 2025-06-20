import React from 'react';

const SystemAlerts = () => {
  const alerts = [
    {
      type: "warning",
      message: "3 companies pending verification",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-800",
      badgeColor: "bg-yellow-100 text-yellow-800"
    },
    {
      type: "info",
      message: "Server maintenance scheduled for tonight",
      bgColor: "bg-blue-50",
      textColor: "text-blue-800",
      badgeColor: "bg-blue-100 text-blue-800"
    },
    {
      type: "error",
      message: "Unusual activity detected from IP 192.168.1.100",
      bgColor: "bg-red-50",
      textColor: "text-red-800",
      badgeColor: "bg-red-100 text-red-800"
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
      </div>
      <p className="text-sm text-gray-500 mb-6">Important notifications</p>
      
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div key={index} className={`p-3 rounded-lg ${alert.bgColor} flex items-center space-x-3`}>
            <span className={`px-2 py-1 rounded text-xs font-medium ${alert.badgeColor}`}>
              {alert.type}
            </span>
            <span className={`text-sm ${alert.textColor}`}>{alert.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemAlerts;