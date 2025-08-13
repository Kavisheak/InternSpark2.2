import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
  FaBriefcase,
  FaDollarSign,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdReport } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

export default function InternshipDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [internship, setInternship] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://localhost/InternBackend/students/api/get_internship_by_id.php?id=${id}`
      )
      .then((res) => {
        if (res.data.success && res.data.internship) {
          setInternship(res.data.internship);
        } else {
          setError("Internship not found.");
        }
      })
      .catch(() => setError("Failed to fetch internship."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleApply = async () => {
    try {
      const res = await axios.post(
        "http://localhost/InternBackend/students/api/applications.php",
        { internship_id: internship.id },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message || "Application submitted!");
      } else {
        toast.error(res.data.message || "Failed to apply.");
      }
    } catch (err) {
      toast.error("Failed to apply.");
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading internship details...
      </div>
    );
  }

  if (error || !internship) {
    return (
      <div className="p-6 text-center text-red-600">
        {error || "Internship not found."}
        <button
          onClick={() => navigate(-1)}
          className="block mt-4 text-orange-500 underline"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-800 bg-gray-50 fade-in-up">
      {/* Top Bar */}
      <div
        className="flex items-center gap-2 p-4 text-[#002147] bg-white border-b border-gray-200 cursor-pointer hover:underline"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="w-4 h-4" />
        <span>Back to Internships</span>
      </div>

      <div className="max-w-5xl p-6 mx-auto">
        {/* Internship Header */}
        <div className="p-6 mb-2 bg-white border border-gray-200 shadow-md rounded-xl">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center bg-gray-100 rounded-lg w-14 h-14">
                <FaBriefcase className="text-2xl text-[#002147]" />
              </div>
              <div>
                <h1 className="mb-1 text-3xl font-bold text-[#002147]">
                  {internship.title}
                </h1>
                <p className="text-gray-500">
                  {internship.company || `Company ID: ${internship.Company_Id}`}
                </p>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 text-gray-600 transition border border-gray-300 rounded-full hover:bg-gray-100"
                title="More"
              >
                <HiOutlineDotsVertical className="w-5 h-5" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 z-10 mt-2 bg-white border rounded-md shadow-lg w-36">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      alert("Reported!");
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 transition hover:bg-red-50"
                  >
                    <MdReport className="w-4 h-4 mr-2" />
                    Report
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 gap-6 mt-6 mb-6 sm:grid-cols-2 lg:grid-cols-3">
            <DetailItem
              icon={<FaMapMarkerAlt />}
              label="Location"
              value={internship.location}
            />
            <DetailItem
              icon={<FaClock />}
              label="Duration"
              value={internship.duration}
            />
            <DetailItem
              icon={<FaCalendarAlt />}
              label="Deadline"
              value={internship.deadline}
            />
            <DetailItem
              icon={<FaBriefcase />}
              label="Internship Type"
              value={internship.workType || internship.internship_type}
            />
            <DetailItem
              icon={<FaDollarSign />}
              label="Salary"
              value={internship.pay || internship.salary}
            />
            <DetailItem
              icon={<FaBriefcase />}
              label="Status"
              value={internship.status}
            />
            <DetailItem
              icon={<FaBriefcase />}
              label="Application Limit"
              value={internship.application_limit}
            />
            <DetailItem
              icon={<FaBriefcase />}
              label="Posted On"
              value={internship.created_at}
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 text-sm text-white bg-orange-500 rounded-full">
              {internship.workType || internship.internship_type}
            </span>
            <span className="px-3 py-1 text-sm text-white bg-orange-500 rounded-full">
              {internship.pay || internship.salary}
            </span>
            <span className="px-3 py-1 text-sm text-white bg-orange-500 rounded-full">
              {internship.status}
            </span>
          </div>

          <Section title="About the Internship">
            {internship.description}
          </Section>

          <Section title="Requirements">
            <ul className="pl-6 space-y-1 text-gray-700 list-disc">
              {(Array.isArray(internship.requirements)
                ? internship.requirements
                : internship.requirements?.split("\n") || []
              ).map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </Section>
        </div>

        {/* CTA Card */}
        <div className="p-8 text-center bg-white border border-gray-200 shadow-md text-oxfordblue rounded-xl">
          <h2 className="mb-2 text-2xl font-semibold">Ready to Apply?</h2>
          <p className="mb-6">
            Submit your application before{" "}
            <strong>{internship.deadline}</strong>
          </p>
          <button
            className="px-6 py-3 font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600"
            onClick={handleApply}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 text-[#002147]">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="mb-3 text-xl font-semibold text-[#002147]">{title}</h3>
      <div>{children}</div>
    </div>
  );
}
