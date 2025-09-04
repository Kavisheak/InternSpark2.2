import React, { useState } from "react";
import { Globe } from "lucide-react";

export default function SystemSettings() {
  const [siteName, setSiteName] = useState("InternSpark");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [userRegistration, setUserRegistration] = useState(true);
  const [companyRegistration, setCompanyRegistration] = useState(true);

  const handleSaveSettings = () => {
    console.log("Settings saved:", {
      siteName,
      maintenanceMode,
      userRegistration,
      companyRegistration,
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-orange-600">System Settings</h1>

        {/* Tabs On System Tab */}
        <div className="grid grid-cols-1 mb-6 overflow-hidden border rounded">
          <button
            className="px-4 py-2 text-2xl font-medium text-white bg-orange-500"
          >
           System
          </button>
        </div>

        {/* System Tab Content */}
        <div className="min-h-screen space-y-6 bg-orange-100 ">
          <div className="p-8 border rounded shadow-sm bg-orange">
            <div className="flex items-center gap-2 mb-2 text-xl font-semibold text-orange-500">
              <Globe className="w-5 h-5" />
              System Configuration
            </div>
            <p className="mb-6 text-sm text-gray-800">General system settings and configurations</p>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">Site Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
              />
            </div>

            {[
              {
                label: "Maintenance Mode",
                description: "Put the site in maintenance mode",
                value: maintenanceMode,
                onChange: () => setMaintenanceMode((prev) => !prev),
              },
              {
                label: "User Registration",
                description: "Allow new student registrations",
                value: userRegistration,
                onChange: () => setUserRegistration((prev) => !prev),
              },
              {
                label: "Company Registration",
                description: "Allow new company registrations",
                value: companyRegistration,
                onChange: () => setCompanyRegistration((prev) => !prev),
              },
            ].map((setting, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-3 border-t"
              >
                <div>
                  <label className="text-sm font-medium text-gray-800">{setting.label}</label>
                  <p className="text-sm text-gray-600">{setting.description}</p>
                </div>
                <input
                  type="checkbox"
                  checked={setting.value}
                  onChange={setting.onChange}
                  className="w-5 h-5 accent-orange-500"
                />
              </div>
            ))}

            <button
              onClick={handleSaveSettings}
              className="px-6 py-2 mt-6 text-white bg-orange-500 rounded hover:bg-orange-500"
            >
              Save System Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}