import React, { useState } from "react";
import { Globe } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// helper to update multiple system settings
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

  React.useEffect(() => {
    // fetch current system settings
    (async () => {
      try {
        const res = await fetch(
          "http://localhost/InternBackend/admin/api/get_system_settings.php",
          { credentials: "include" }
        );
        const data = await res.json();
        if (data && data.success && data.settings) {
          const s = data.settings;
          if (s.site_name !== null && s.site_name !== "")
            setSiteName(s.site_name);
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
        data && data.success
          ? " System settings updated successfully."
          : ` ${data.message || "Failed to update settings."}`,
      error: (err) => ` Error: ${err.message || "Failed to save settings."}`,
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Toasts just below the navbar */}
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
          success: {
            style: {
              borderLeft: "6px solid #ea580c",
            },
          },
          error: {
            style: {
              borderLeft: "6px solid #ef4444",
            },
          },
          loading: {
            style: {
              borderLeft: "6px solid #f59e0b",
            },
          },
        }}
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-orange-600">
          System Settings
        </h1>

        {/* Tabs On System Tab */}
        <div className="grid grid-cols-1 mb-6 overflow-hidden border rounded">
          <button className="px-4 py-2 text-2xl font-medium text-white bg-orange-500">
            System
          </button>
        </div>

        {/* System Tab Content */}
        <div className="min-h-screen space-y-6 bg-orange-100">
          <div className="p-8 border rounded shadow-sm bg-orange">
            <div className="flex items-center gap-2 mb-2 text-xl font-semibold text-orange-500">
              <Globe className="w-5 h-5" />
              System Configuration
            </div>
            <p className="mb-6 text-sm text-gray-800">
              General system settings and configurations
            </p>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Site Name
              </label>
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
                className="flex items-center justify-between py-3 border-t"
              >
                <div>
                  <label className="text-sm font-medium text-gray-800">
                    {setting.label}
                  </label>
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
              className="px-6 py-2 mt-6 text-white bg-orange-500 rounded hover:bg-orange-600"
            >
              Save System Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
