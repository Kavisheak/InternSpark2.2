import React, { useState, useEffect } from "react";
import { Globe, Mail } from "lucide-react";
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
  const [maintenanceDateTime, setMaintenanceDateTime] = useState("");
  const [maintenanceStart, setMaintenanceStart] = useState("");
  const [maintenanceEnd, setMaintenanceEnd] = useState("");

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
          if (s.maintenance_start) setMaintenanceStart(s.maintenance_start);
          if (s.maintenance_end) setMaintenanceEnd(s.maintenance_end);
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
      maintenance_start: maintenanceStart, // <-- add this
      maintenance_end: maintenanceEnd, // <-- and this
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

  // Send maintenance email to all users except admin
  const handleSendMaintenanceEmail = async () => {
    if (!maintenanceStart || !maintenanceEnd) {
      toast.error("Please select both start and end date/time.");
      return;
    }

    const startStr = new Date(maintenanceStart).toLocaleString();
    const endStr = new Date(maintenanceEnd).toLocaleString();
    const confirmed = window.confirm(
      `Are you sure you want to send a maintenance notification email to all users?\n\nScheduled maintenance:\nFrom: ${startStr}\nTo:   ${endStr}`
    );
    if (!confirmed) return;

    const now = new Date();
    const start = new Date(maintenanceStart);
    const end = new Date(maintenanceEnd);

    if (start <= now) {
      toast.error("Maintenance start time must be after the current time.");
      return;
    }
    if (end <= now) {
      toast.error("Maintenance end time must be after the current time.");
      return;
    }
    if (end <= start) {
      toast.error("Maintenance end time must be after the start time.");
      return;
    }

    const res = await fetch(
      "http://localhost/InternBackend/admin/api/send_maintenance_email.php",
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          maintenance_start: maintenanceStart,
          maintenance_end: maintenanceEnd,
        }),
      }
    );
    const data = await res.json();
    if (data.success) {
      toast.success("Maintenance email sent to all users.");
      setMaintenanceStart("");
      setMaintenanceEnd("");
    } else {
      toast.error(data.message || "Failed to send maintenance email.");
    }
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

          {/* Maintenance Mode Switch */}
          <div className="flex items-center justify-between py-4 border-t">
            <div>
              <p className="font-medium text-gray-800">Maintenance Mode</p>
              <p className="text-sm text-gray-500">
                Put the site in maintenance mode
              </p>
            </div>
            <input
              type="checkbox"
              checked={maintenanceMode}
              onChange={() => setMaintenanceMode((prev) => !prev)}
              className="w-5 h-5 accent-orange-500"
            />
          </div>

          {/* Maintenance Email Scheduler (Time Range) */}
          <div className="flex flex-col gap-2 py-4 border-t">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Maintenance Start (Date & Time)
                </label>
                <input
                  type="datetime-local"
                  value={maintenanceStart}
                  onChange={(e) => setMaintenanceStart(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Maintenance End (Date & Time)
                </label>
                <input
                  type="datetime-local"
                  value={maintenanceEnd}
                  onChange={(e) => setMaintenanceEnd(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
            </div>
            <button
              onClick={handleSendMaintenanceEmail}
              className="flex items-center self-end gap-2 px-4 py-2 mt-2 font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600"
            >
              <Mail className="w-4 h-4" />
              Send Maintenance Email
            </button>
          </div>

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
