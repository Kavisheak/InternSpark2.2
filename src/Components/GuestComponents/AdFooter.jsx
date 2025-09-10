import React from "react";
import { FaTwitter, FaLinkedin, FaFacebook, FaYoutube } from "react-icons/fa";

const AdFooter = () => {
  return (
    <footer className="px-6 py-10 text-white bg-black">
      <div className="flex flex-col justify-between max-w-6xl gap-10 mx-auto md:flex-row">
        {/* Contact Info */}
        <div>
          <h2 className="mb-2 text-sm font-semibold uppercase">Contact</h2>
          <p className="font-bold">
            Department of Computer Science & Technology
            <br />
            Uva Wellassa University, Badulla, Sri Lanka
          </p>
          <p className="mt-2">Phone: +94 55 222 6475</p>
          <p className="text-blue-300 underline">
            cststudents@uwu.ac.lk
          </p>

          {/* Social Icons */}
          <div className="flex mt-4 space-x-4 text-xl">
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="#" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* About Us */}
        <div>
          <h2 className="mb-2 text-sm font-semibold uppercase">
            About Us
          </h2>
          <ul className="space-y-2 text-gray-300">
            <li>👨‍💻 2nd Year Computer Science & Technology Students</li>
            <li>🎓 Faculty of Applied Sciences</li>
            <li>🤝 Dedicated to Innovative Projects</li>
            <li>🌍 Empowering Future Tech Leaders</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="pt-4 mt-10 text-sm text-center text-gray-400 border-t border-gray-700">
        © 2025 Uva Wellassa University | CST Students – All Rights Reserved
      </div>
    </footer>
  );
};

export default AdFooter;
