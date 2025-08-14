import React, { useState, useEffect } from "react";

const ContactInfo = () => {
  const [formData, setFormData] = useState({
    primaryName: "Alex Morgan",
    primaryEmail: "alex.morgan@techcorpsolutions.example",
    primaryPhone: "555-123-4567",
    secondaryName: "Jordan Taylor",
    secondaryEmail: "jordan.taylor@techcorpsolutions.example",
    secondaryPhone: "555-987-6543",
  });

  useEffect(() => {
    async function fetchContacts() {
      const res = await fetch(
        "http://localhost/InternBackend/company/api/get_company_contact.php",
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success && data.contacts) {
        const primary = data.contacts.find((c) => c.contact_type === "primary") || {};
        const secondary = data.contacts.find((c) => c.contact_type === "secondary") || {};
        setFormData({
          primaryName: primary.contact_name || "",
          primaryEmail: primary.contact_email || "",
          primaryPhone: primary.contact_phone || "",
          secondaryName: secondary.contact_name || "",
          secondaryEmail: secondary.contact_email || "",
          secondaryPhone: secondary.contact_phone || "",
        });
      }
    }
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    const contacts = [
      {
        name: formData.primaryName,
        email: formData.primaryEmail,
        phone: formData.primaryPhone,
        type: "primary",
      },
      {
        name: formData.secondaryName,
        email: formData.secondaryEmail,
        phone: formData.secondaryPhone,
        type: "secondary",
      },
    ].filter((c) => c.name || c.email || c.phone);

    try {
      const res = await fetch(
        "http://localhost/InternBackend/company/api/save_company_contact.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ contacts }),
        }
      );
      const data = await res.json();
      console.log("Contact save response:", data); // <-- Add this line
      if (data.success) {
        alert("Contact information saved successfully!");
      } else {
        alert("Failed to save contact info: " + data.message);
      }
    } catch (err) {
      alert("Error saving contact info.");
      console.error(err); // <-- Add this line
    }
  };

  return (
    <div className="p-6 mx-6 mt-6 bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Primary Contact */}
        <div className="p-6 bg-white border border-gray-200 shadow-md rounded-xl">
          <h2 className="mb-4 text-xl font-bold text-oxfordblue">
            Primary Contact
          </h2>

          {["primaryName", "primaryEmail", "primaryPhone"].map((field, i) => (
            <div className="mb-4" key={field}>
              <label className="block text-sm font-semibold text-gray-700">
                {["Contact Name", "Email", "Phone Number"][i]}
              </label>
              <input
                type={field.includes("Email") ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-sm text-gray-800 placeholder-gray-400 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-oxfordblue"
              />
            </div>
          ))}
        </div>

        {/* Secondary Contact */}
        <div className="p-6 bg-white border border-gray-200 shadow-md rounded-xl">
          <h2 className="mb-4 text-xl font-bold text-oxfordblue">
            Secondary Contact (Optional)
          </h2>

          {["secondaryName", "secondaryEmail", "secondaryPhone"].map(
            (field, i) => (
              <div className="mb-4" key={field}>
                <label className="block text-sm font-semibold text-gray-700">
                  {["Contact Name", "Email", "Phone Number"][i]}
                </label>
                <input
                  type={field.includes("Email") ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 text-sm text-gray-800 placeholder-gray-400 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-oxfordblue"
                />
              </div>
            )
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end col-span-1 mt-4 md:col-span-2">
          <button
            onClick={handleSave}
            className="px-6 py-2 text-sm font-semibold text-white bg-orange-500 rounded-md shadow hover:bg-orange-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
