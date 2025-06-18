import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

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

  const [isEditable, setIsEditable] = useState(!true); // editable if creating

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
      setIsEditable(!isViewOnlyMode)
      if (isViewOnlyMode) {
        setIsEditable(false); // force view-only mode
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
    <div className="max-w-3xl min-h-screen px-6 py-10 mx-auto my-5 text-white border border-gray-500 rounded-md">
      <h1 className="mb-6 text-3xl font-semibold text-center">
        {id ? (isEditable ? "Edit Internship" : "Internship Details") : "Post a New Internship"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-1 font-semibold">Internship Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            disabled={!isEditable}
            placeholder="e.g., Frontend Developer Intern"
            className="w-full px-4 py-2 text-white bg-transparent border border-gray-500 rounded-md"
          />
        </div>

        {/* Location & Type */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-1 font-semibold">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              disabled={!isEditable}
              placeholder="e.g., San Francisco, CA"
              className="w-full px-4 py-2 text-white bg-transparent border border-gray-500 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Internship Type</label>
            <div className="flex space-x-2">
              {["On-site", "Remote", "Hybrid"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleTypeChange(type)}
                  disabled={!isEditable}
                  className={`px-4 py-2 border rounded-full ${
                    formData.internshipType === type
                      ? "bg-purple-500 text-white"
                      : "bg-white text-black"
                  } ${!isEditable ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Salary & Duration */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-1 font-semibold">Salary/Stipend (Optional)</label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              disabled={!isEditable}
              placeholder="e.g., $20/hour"
              className="w-full px-4 py-2 text-white bg-transparent border border-gray-500 rounded-md"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              disabled={!isEditable}
              placeholder="e.g., 3 months"
              className="w-full px-4 py-2 text-white bg-transparent border border-gray-500 rounded-md"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={!isEditable}
            rows="4"
            placeholder="Describe the internship..."
            className="w-full px-4 py-2 text-white bg-transparent border border-gray-500 rounded-md"
          />
        </div>

        {/* Requirements */}
        <div>
          <label className="block mb-1 font-semibold">Requirements</label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            disabled={!isEditable}
            rows="4"
            placeholder="Skills and qualifications..."
            className="w-full px-4 py-2 text-white bg-transparent border border-gray-500 rounded-md"
          />
        </div>

        {/* Deadline & Application Limit */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-1 font-semibold">Application Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              disabled={!isEditable}
              className="w-full px-4 py-2 text-white bg-transparent border border-gray-500 rounded-md"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Application Limit</label>
            <input
              type="number"
              name="applicationLimit"
              value={formData.applicationLimit}
              onChange={handleChange}
              disabled={!isEditable}
              placeholder="e.g., 100"
              className="w-full px-4 py-2 text-white bg-transparent border border-gray-500 rounded-md"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          {!isEditable && id ? (
            <button
              type="button"
              onClick={() => setIsEditable(true)}
              className="px-6 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
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
                className="px-4 py-2 text-white border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 font-semibold text-white bg-purple-500 rounded hover:bg-purple-600"
              >
                {id ? "Save Changes" : "Publish Internship"}
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostInternshipForm;
