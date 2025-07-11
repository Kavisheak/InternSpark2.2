import React, { useState } from "react";
import { Globe, Shield, Info, Database } from "lucide-react";

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState("database");
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-8">System Settings</h1>

        {/* Tabs */}
        <div className="grid grid-cols-3 mb-6 border rounded overflow-hidden">
          {["system", "database", "security"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "system" && (
          <div className="space-y-6">
            <div className="border rounded shadow-sm bg-white p-6">
              <div className="flex items-center gap-2 text-blue-600 text-xl font-semibold mb-2">
                <Globe className="h-5 w-5" />
                System Configuration
              </div>
              <p className="text-sm text-gray-500 mb-6">General system settings and configurations</p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
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
                    <label className="text-sm font-medium text-gray-700">{setting.label}</label>
                    <p className="text-sm text-gray-500">{setting.description}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={setting.value}
                    onChange={setting.onChange}
                    className="w-5 h-5 accent-blue-600"
                  />
                </div>
              ))}

              <button
                onClick={handleSaveSettings}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
              >
                Save System Settings
              </button>
            </div>
          </div>
        )}

        {activeTab === "database" && (
          <div className="space-y-6">
            <div className="border rounded shadow-sm bg-white p-6">
              <div className="flex items-center gap-2 text-blue-600 text-xl font-semibold mb-2">
                <Database className="h-5 w-5" />
                Database Configuration
              </div>
              <p className="text-sm text-gray-500 mb-6">Database backup and maintenance settings</p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Backup Frequency</label>
                <input type="text" value="daily" readOnly className="w-full border rounded px-3 py-2 bg-gray-100" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Data Retention Period (days)</label>
                <input type="number" value="30" readOnly className="w-full border rounded px-3 py-2 bg-gray-100" />
              </div>

              <div className="flex items-center justify-between py-3 border-t">
                <div>
                  <label className="text-sm font-medium text-gray-700">Auto Cleanup</label>
                  <p className="text-sm text-gray-500">Automatically clean up old data</p>
                </div>
                <input type="checkbox" checked readOnly className="w-5 h-5 accent-blue-600" />
              </div>

              <div className="flex gap-4 mt-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
                  Save Database Settings
                </button>
                <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50">
                  Run Backup Now
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
            <div className="border rounded shadow-sm bg-white p-6">
              <div className="flex items-center gap-2 text-blue-600 text-xl font-semibold mb-2">
                <Shield className="h-5 w-5" />
                Security Configuration
              </div>
              <p className="text-sm text-gray-500 mb-6">System-wide security settings</p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-blue-800 text-sm">
                  Security settings require additional authentication to modify.
                </p>
              </div>

              <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
                Configure Security Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
