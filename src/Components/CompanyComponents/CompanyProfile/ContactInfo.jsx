import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const sriLankaPhoneRegex = /^(?:\+94|0)(?:7[0-9]{8})$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactInfo = () => {
  const [formData, setFormData] = useState({
    primaryName: "",
    primaryEmail: "",
    primaryPhone: "",
    secondaryName: "",
    secondaryEmail: "",
    secondaryPhone: "",
  });

  const [loading, setLoading] = useState(false);
  const [isContactExists, setIsContactExists] = useState(false); // Track if contact data exists

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await fetch(
          "http://localhost/InternBackend/company/api/get_company_contact.php",
          { credentials: "include" }
        );
        const data = await res.json();
        if (data.success && data.contacts) {
          const primary =
            data.contacts.find((c) => c.contact_type === "primary") || {};
          const secondary =
            data.contacts.find((c) => c.contact_type === "secondary") || {};
          const newFormData = {
            primaryName: primary.contact_name || "",
            primaryEmail: primary.contact_email || "",
            primaryPhone: primary.contact_phone || "",
            secondaryName: secondary.contact_name || "",
            secondaryEmail: secondary.contact_email || "",
            secondaryPhone: secondary.contact_phone || "",
          };
          setFormData(newFormData);

          if (
            primary.contact_name ||
            primary.contact_email ||
            primary.contact_phone ||
            secondary.contact_name ||
            secondary.contact_email ||
            secondary.contact_phone
          ) {
            setIsContactExists(true);
          }
        }
      } catch (err) {
        toast.error("Failed to load contact details.", { id: "load-fail" });
        console.error(err);
      }
    }
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    // Validate Primary Contact
    if (!formData.primaryName && !formData.primaryEmail && !formData.primaryPhone) {
      toast.error("Primary contact details are required.", { id: "primary-required" });
      return false;
    }
    if (formData.primaryEmail && !emailRegex.test(formData.primaryEmail)) {
      toast.error("Please enter a valid primary contact email address.", { id: "email-invalid" });
      return false;
    }
    if (formData.primaryPhone && !sriLankaPhoneRegex.test(formData.primaryPhone)) {
      toast.error("Primary phone must be a valid number (e.g., +94771234567 or 0771234567).", { id: "phone-invalid" });
      return false;
    }

    // Validate Secondary Contact (only if provided)
    if (formData.secondaryEmail && !emailRegex.test(formData.secondaryEmail)) {
      toast.error("Please enter a valid secondary contact email address.", { id: "secondary-email-invalid" });
      return false;
    }
    if (formData.secondaryPhone && !sriLankaPhoneRegex.test(formData.secondaryPhone)) {
      toast.error("Secondary phone must be a valid number.", { id: "secondary-phone-invalid" });
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

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

    setLoading(true);
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
      if (data.success) {
        toast.success(
          isContactExists
            ? "Contact details updated successfully!"
            : "Contact details saved successfully!",
          { id: "save-success" }
        );
        setIsContactExists(true);
      } else {
        toast.error("Failed to save contact info: " + data.message, {
          id: "save-error",
        });
      }
    } catch (err) {
      toast.error("Error saving contact info.", { id: "server-error" });
      console.error(err);
    }
    setLoading(false);
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
                placeholder={
                  field.includes("Phone") ? "e.g., +94771234567" : ""
                }
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
                  placeholder={
                    field.includes("Phone") ? "e.g., 0771234567" : ""
                  }
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
            disabled={loading}
            className="px-6 py-2 text-sm font-semibold text-white bg-orange-500 rounded-md shadow hover:bg-orange-600 disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : isContactExists
              ? "Update Contact Details"
              : "Save Contact Details"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
