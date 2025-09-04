import React, { useState } from "react";
import { Globe } from "lucide-react";
import toast from 'react-hot-toast';

// helper to update multiple system settings
async function saveSystemSettings(payload) {
  try {
    const res = await fetch('http://localhost/InternBackend/admin/api/set_system_setting.php', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
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
        const res = await fetch('http://localhost/InternBackend/admin/api/get_system_settings.php', { credentials: 'include' });
        const data = await res.json();
        if (data && data.success && data.settings) {
          const s = data.settings;
          if (s.site_name !== null && s.site_name !== '') setSiteName(s.site_name);
          if (s.maintenance_mode !== null) setMaintenanceMode(s.maintenance_mode === '1' || String(s.maintenance_mode).toLowerCase() === 'true');
          if (s.user_registration !== null) setUserRegistration(s.user_registration === '1' || String(s.user_registration).toLowerCase() === 'true');
          if (s.company_registration !== null) setCompanyRegistration(s.company_registration === '1' || String(s.company_registration).toLowerCase() === 'true');
        }
      } catch (e) {
        console.debug('Could not fetch system settings', e);
      }
    })();
  }, []);

  const handleSaveSettings = () => {
    // Save multiple settings at once
    const payload = {
      maintenance_mode: maintenanceMode ? '1' : '0',
      user_registration: userRegistration ? '1' : '0',
      company_registration: companyRegistration ? '1' : '0',
      site_name: siteName
    };
    toast.promise(
      saveSystemSettings(payload),
      {
        loading: 'Saving settings...',
        success: (data) => (data && data.success) ? 'Settings saved' : (data.message || 'Failed'),
        error: (err) => err.message || 'Failed to save'
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-600 mb-8">System Settings</h1>

        {/* Tabs On System Tab */}
        <div className="grid grid-cols-1 mb-6 border rounded overflow-hidden">
          <button
            className="py-2 px-4 text-2xl font-medium bg-orange-500 text-white"
          >
           System
          </button>
        </div>

        {/* System Tab Content */}
        <div className="space-y-6 min-h-screen bg-orange-100 ">
          <div className="border rounded shadow-sm bg-orange p-8">
            <div className="flex items-center gap-2 text-orange-500 text-xl font-semibold mb-2">
              <Globe className="h-5 w-5" />
              System Configuration
            </div>
            <p className="text-sm text-gray-800 mb-6">General system settings and configurations</p>

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
              className="mt-6 bg-orange-500 hover:bg-orange-500 text-white px-6 py-2 rounded"
            >
              Save System Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}