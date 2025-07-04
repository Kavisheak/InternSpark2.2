import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import CompanyNavbar from "./CompanyNavbar";

const PostInternshipForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const editingInternship = location.state?.internship;
  const isViewOnlyMode = location.state?.viewOnly === true;

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    internshipType: "On-site",
    salary: "",
    duration: "",
    description: "",
    requirements: "",
    deadline: "",
    applicationLimit: "",
  });

  const [isEditable, setIsEditable] = useState(!id);

  useEffect(() => {
    if (editingInternship) {
      setFormData({
        title: editingInternship.title || "",
        location: editingInternship.location || "",
        internshipType: editingInternship.mode || "",
        salary: editingInternship.salary || "",
        duration: editingInternship.duration || "",
        description: editingInternship.description || "",
        requirements: editingInternship.requirements || "",
        deadline: editingInternship.deadline || "",
        applicationLimit: editingInternship.applicationLimit || "",
      });
      setIsEditable(!isViewOnlyMode);
      if (isViewOnlyMode) {
        setIsEditable(false);
      }
    }
  }, [editingInternship, isViewOnlyMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (type) => {
    if (isEditable) {
      setFormData({ ...formData, internshipType: type });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEditable) return;

    if (id) {
      console.log("✅ Updating internship:", formData);
      alert("Changes Updated");
    } else {
      console.log("✅ Creating new internship:", formData);
      alert("Post has been published");
    }
    navigate("/company/internships");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <CompanyNavbar />
      <div className="max-w-3xl px-6 py-10 mx-auto my-10 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-center text-[#2128BD]">
          {id
            ? isEditable
              ? "Edit Internship"
              : "Internship Details"
            : "Post a New Internship"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 text-gray-800">
          <div>
            <label className="block mb-1 font-semibold text-[#2128BD]">Internship Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              disabled={!isEditable}
              placeholder="e.g., Frontend Developer Intern"
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2128BD] disabled:bg-gray-100"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-1 font-semibold text-[#2128BD]">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                disabled={!isEditable}
                placeholder="e.g., San Francisco, CA"
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2128BD] disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-[#2128BD]">Internship Type</label>
              <div className="flex space-x-2">
                {["On-site", "Remote", "Hybrid"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleTypeChange(type)}
                    disabled={!isEditable}
                    className={`px-4 py-2 border rounded-full ${
                      formData.internshipType === type
                        ? "bg-[#2128BD] text-white"
                        : "bg-white text-[#2128BD] border-[#2128BD]"
                    } ${!isEditable ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-1 font-semibold text-[#2128BD]">
                Salary/Stipend (Optional)
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                disabled={!isEditable}
                placeholder="e.g., $20/hour"
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2128BD] disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-[#2128BD]">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                disabled={!isEditable}
                placeholder="e.g., 3 months"
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2128BD] disabled:bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#2128BD]">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={!isEditable}
              rows="4"
              placeholder="Describe the internship..."
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2128BD] disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#2128BD]">Requirements</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              disabled={!isEditable}
              rows="4"
              placeholder="Skills and qualifications..."
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2128BD] disabled:bg-gray-100"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-1 font-semibold text-[#2128BD]">Application Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                disabled={!isEditable}
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2128BD] disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-[#2128BD]">Application Limit</label>
              <input
                type="number"
                name="applicationLimit"
                value={formData.applicationLimit}
                onChange={handleChange}
                disabled={!isEditable}
                placeholder="e.g., 100"
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2128BD] disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            {!isEditable && id ? (
              <button
                type="button"
                onClick={() => setIsEditable(true)}
                className="px-6 py-2 font-semibold text-white bg-[#2128BD] rounded hover:bg-blue-800"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    if (isViewOnlyMode) {
                      navigate("/company/dashboard");
                    } else {
                      setIsEditable(false);
                    }
                  }}
                  className="px-4 py-2 text-[#2128BD] border border-[#2128BD] rounded hover:bg-[#2128BD] hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 font-semibold text-white bg-[#2128BD] rounded hover:bg-blue-800"
                >
                  {id ? "Save Changes" : "Publish Internship"}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostInternshipForm;
