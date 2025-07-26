import { useState, useRef, useEffect } from "react";
import {
  FiDownload,
  FiMail,
  FiPhone,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";

export default function ApplicationDetailPanel({
  selected,
  handleStatusUpdate,
  primaryColor,
}) {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const imageRef = useRef(null); // for detecting outside click

  if (!selected)
    return <div className="w-full p-4 md:w-2/3">Application data not found.</div>;

  const statusOptions = [ "Reviewing", "Interviewing", "Rejected", "Hired"];

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (imageRef.current && !imageRef.current.contains(event.target)) {
        setIsImageOpen(false);
      }
    };

    if (isImageOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isImageOpen]);

  return (
    <div className="relative w-full p-6 text-gray-800 bg-white shadow-md md:w-2/3 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="relative flex items-center gap-4">
          {/* Profile Picture + Popup Preview */}
          <div className="relative">
            <img
              src={selected.image || "/default-avatar.png"}
              alt={selected.name}
              className="object-cover w-16 h-16 rounded-full cursor-pointer"
              onClick={() => setIsImageOpen(!isImageOpen)}
              title="Click to enlarge"
            />

            {/* Small popup preview next to the image */}
            {isImageOpen && (
              <div
                ref={imageRef}
                className="absolute top-0 z-50 w-40 h-40 p-1 bg-white border shadow-xl rounded-xl left-20"
              >
                <img
                  src={selected.image || "/default-avatar.png"}
                  alt="Preview"
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-semibold">{selected.name}</h2>
            <p className="text-sm text-gray-500">{selected.role}</p>
          </div>
        </div>
        <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
          {selected.status} Application
        </span>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <a
          href={selected.cvUrl || "/sample-cv.pdf"}
          download
          className="flex items-center gap-2 bg-[color:var(--primaryColor)] text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-all"
          style={{ backgroundColor: primaryColor }}
        >
          <FiDownload /> Download CV
        </a>
        <a
          href={`mailto:${selected.email}`}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          <FiMail /> Contact
        </a>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">Contact Information</h3>
        <p className="flex items-center gap-2 text-sm text-gray-700">
          <FiMail className="text-gray-500" /> {selected.email}
        </p>
        <p className="flex items-center gap-2 text-sm text-gray-700">
          <FiPhone className="text-gray-500" /> +1 (555) 123-4567
        </p>
        <p className="flex items-center gap-2 text-sm text-gray-700">
          <FiGithub className="text-gray-500" />{" "}
          <a
            href={`https://github.com/${selected.name
              .split(" ")[0]
              .toLowerCase()}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/{selected.name.split(" ")[0].toLowerCase()}
          </a>
        </p>
        <p className="flex items-center gap-2 text-sm text-gray-700">
          <FiLinkedin className="text-gray-500" />{" "}
          <a
            href={`https://linkedin.com/in/${selected.name
              .replace(" ", "")
              .toLowerCase()}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/{selected.name.replace(" ", "").toLowerCase()}
          </a>
        </p>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">Education</h3>
        <p>{selected.education}</p>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">Experience</h3>
        <p>{selected.experience}</p>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">Skills / Motivation</h3>
        <p>{selected.skills}</p>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "GraphQL"].map(
            (skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-sm bg-gray-100 border rounded-full"
              >
                {skill}
              </span>
            )
          )}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Update Application Status</h3>
        <select
          value={selected.status}
          onChange={(e) => handleStatusUpdate(selected.id, e.target.value)}
          className="p-2 text-sm border rounded-md"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
