import React from "react";
import { FaTwitter, FaLinkedin, FaFacebook, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="px-6 py-10 text-white bg-black">
      <div className="flex flex-col justify-between max-w-6xl gap-10 mx-auto md:flex-row">
        {/* Contact Info */}
        <div>
          <h2 className="mb-2 text-sm font-semibold uppercase">Contact</h2>
          <p className="font-bold">
            Internship Finder Headquarters
            <br />
            89 Park Dr Boston, MA 02215
          </p>
          <p className="mt-2">Phone: 929-242-6868</p>
          <p className="text-blue-300 underline">support@internfinder.com</p>

          {/* Social Icons */}
          <div className="flex mt-4 space-x-4 text-xl">
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaLinkedin />
            </a>
            <a href="#">
              <FaFacebook />
            </a>
            <a href="#">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Why Choose Us */}
        <div>
          <h2 className="mb-2 text-sm font-semibold uppercase">
            Why Choose Us
          </h2>
          <ul className="space-y-2 text-gray-300">
            <li>✅ Verified Internship Listings</li>
            <li>🎯 Role-based Filtering System</li>
            <li>📈 Trusted by 500+ Companies</li>
            <li>💬 Dedicated Student Support</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="pt-4 mt-10 text-sm text-center text-gray-400 border-t border-gray-700">
        © 2025 Internship Finder | Built to empower your career
      </div>
    </footer>
  );
};

export default Footer;
