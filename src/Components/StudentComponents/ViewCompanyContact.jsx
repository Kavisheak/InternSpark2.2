import React from "react";
import { Mail, Phone, User } from "lucide-react";

const ViewCompanyContact = () => {
  // Sample contacts data (later you can fetch from backend)
  const contacts = [
    {
      contact_name: "John Doe",
      contact_email: "john.doe@technova.com",
      contact_phone: "+94 77 123 4567",
      contact_type: "primary",
    },
    {
      contact_name: "Jane Smith",
      contact_email: "jane.smith@technova.com",
      contact_phone: "+94 76 987 6543",
      contact_type: "secondary",
    },
  ];

  return (
    <div className="min-h-screen px-4 py-12 bg-gray-50 sm:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl">
        {/* Header */}
        <div className="bg-[#002147] px-8 py-6">
          <h1 className="text-3xl font-bold text-white">Company Contacts</h1>
          <p className="mt-2 text-gray-300">
            Reach out to the right people in the organization
          </p>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="p-6 transition duration-300 border border-gray-200 shadow-sm rounded-xl hover:shadow-md"
            >
              {/* Contact Type Badge */}
              <span
                className={`inline-block px-3 py-1 text-sm rounded-full mb-4 ${
                  contact.contact_type === "primary"
                    ? "bg-orange-500 text-white"
                    : "bg-blue-100 text-[#002147]"
                }`}
              >
                {contact.contact_type.charAt(0).toUpperCase() +
                  contact.contact_type.slice(1)}{" "}
                Contact
              </span>

              {/* Contact Details */}
              <h2 className="text-xl font-semibold text-[#002147] flex items-center gap-2">
                <User className="w-5 h-5 text-orange-500" />
                {contact.contact_name}
              </h2>

              <div className="mt-3 space-y-2">
                <p className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-5 h-5 text-orange-500" />
                  <a
                    href={`mailto:${contact.contact_email}`}
                    className="hover:underline text-[#002147] font-medium"
                  >
                    {contact.contact_email}
                  </a>
                </p>

                <p className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-5 h-5 text-orange-500" />
                  <span className="text-[#002147] font-medium">
                    {contact.contact_phone}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewCompanyContact;
