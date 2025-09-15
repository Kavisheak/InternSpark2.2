import React, { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// Helper function to save system settings
async function saveSystemSettings(payload) {
  try {
    const res = await fetch(
      "http://localhost/InternBackend/admin/api/set_system_setting.php",
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    return { success: false, message: e.message };
  }
}

export default function SystemSettings() {
  const [siteName, setSiteName] = useState("InternSpark");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [userRegistration, setUserRegistration] = useState(true);
  const [companyRegistration, setCompanyRegistration] = useState(true);

  // Fetch current system settings on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "http://localhost/InternBackend/admin/api/get_system_settings.php",
          { credentials: "include" }
        );
        const data = await res.json();
        if (data?.success && data.settings) {
          const s = data.settings;
          if (s.site_name) setSiteName(s.site_name);
          if (s.maintenance_mode !== null)
            setMaintenanceMode(
              s.maintenance_mode === "1" ||
                String(s.maintenance_mode).toLowerCase() === "true"
            );
          if (s.user_registration !== null)
            setUserRegistration(
              s.user_registration === "1" ||
                String(s.user_registration).toLowerCase() === "true"
            );
          if (s.company_registration !== null)
            setCompanyRegistration(
              s.company_registration === "1" ||
                String(s.company_registration).toLowerCase() === "true"
            );
        }
      } catch (e) {
        console.debug("Could not fetch system settings", e);
      }
    })();
  }, []);

  const handleSaveSettings = () => {
    const payload = {
      maintenance_mode: maintenanceMode ? "1" : "0",
      user_registration: userRegistration ? "1" : "0",
      company_registration: companyRegistration ? "1" : "0",
      site_name: siteName,
    };

    toast.promise(saveSystemSettings(payload), {
      loading: "Saving system settings...",
      success: (data) =>
        data?.success
          ? "System settings updated successfully."
          : data.message || "Failed to update settings.",
      error: (err) => `Error: ${err.message || "Failed to save settings."}`,
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Toast Notifications */}
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ top: "70px" }}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#333",
            padding: "12px 20px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            fontSize: "14px",
            fontWeight: "500",
          },
          success: { style: { borderLeft: "6px solid #ea580c" } },
          error: { style: { borderLeft: "6px solid #ef4444" } },
          loading: { style: { borderLeft: "6px solid #f59e0b" } },
        }}
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-orange-600">
          System Settings
        </h1>

        {/* Tabs */}
        <div className="flex mb-6 overflow-hidden border rounded-lg shadow-sm">
          <button className="flex items-center gap-2 px-6 py-3 text-xl font-semibold text-white bg-orange-500">
            <Globe className="w-5 h-5" /> System
          </button>
        </div>

        {/* Settings Card */}
        <div className="p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <h2 className="flex items-center gap-2 mb-2 text-xl font-semibold text-gray-800">
            <Globe className="w-5 h-5 text-orange-500" /> System Configuration
          </h2>
          <p className="mb-6 text-gray-600">
            General system settings and configurations
          </p>

          {/* Site Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Site Name
            </label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>

          {/* Switch Settings */}
          {[
            {
              label: "Maintenance Mode",
              description: "Put the site in maintenance mode",
              value: maintenanceMode,
              onChange: () => setMaintenanceMode((prev) => !prev),
            },
            {
              label: "Student Registration",
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
              className="flex items-center justify-between py-4 border-t"
            >
              <div>
                <p className="font-medium text-gray-800">{setting.label}</p>
                <p className="text-sm text-gray-500">{setting.description}</p>
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
            className="px-6 py-2 mt-6 font-semibold text-white transition-colors bg-orange-500 rounded-lg hover:bg-orange-600"
          >
            Save System Settings
          </button>
        </div>
      </div>
    </div>
  );
}
