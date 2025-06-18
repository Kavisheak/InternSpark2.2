import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const PostInternshipForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const editingInternship = location.state?.internship;

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    internshipType: "On-site",
    salary: "",
    duration: "",
    description: "",
    requirements: "",
    deadline: "",
  });

  useEffect(() => {
    if (editingInternship) {
      setFormData({
        title: editingInternship.title || "",
        location: editingInternship.location || "",
        internshipType: editingInternship.mode || "",
        salary: "", // You can pass/edit this if available
        duration: "",
        description: "",
        requirements: "",
        deadline: editingInternship.deadline || "",
      });
    }
  }, [editingInternship]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (type) => {
    setFormData({ ...formData, internshipType: type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      console.log("✅ Updating internship:", formData);
      alert("Changes Updated");
      // Update API logic here
    } else {
      console.log("✅ Creating new internship:", formData);
      
      alert("Post have been published");
      // Create API logic here
    }
    navigate("/internships"); // redirect after save
  };

  return (
    <div className="max-w-3xl min-h-screen px-6 py-10 mx-auto my-5 text-white border border-gray-500 rounded-md">
      <h1 className="mb-6 text-3xl font-semibold text-center">
        {id ? "Edit Internship" : "Post a New Internship"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Internship Title */}
        <div>
          <label className="block mb-1 font-semibold">Internship Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
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
                  className={`px-4 py-2 border rounded-full ${
                    formData.internshipType === type
                      ? "bg-purple-500 text-white"
                      : "bg-white text-black"
                  }`}
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
              placeholder="e.g., $20/hour or $1500/month"
              className="w-full px-4 py-2 text-white bg-transparent border border-gray-500 rounded-md "
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 3 months, Summer 2025"
              className="px-4 py-2 text-white bg-transparent border border-gray-500 rounded-md placeholder-slate-800w-full"
              
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
            placeholder="Describe the internship, responsibilities, and what the intern will learn..."
            rows="4"
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
            placeholder="List skills and qualifications required (one per line)"
            rows="4"
            className="w-full px-4 py-2 text-white bg-transparent border border-gray-500 rounded-md"
          />
          <p className="mt-1 text-sm text-gray-500">Each line will be displayed as a separate requirement.</p>
        </div>

        {/* Deadline */}
        <div>
          <label className="block mb-1 font-semibold">Application Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full px-4 py-2 text-white bg-transparent border border-gray-500 rounded-md"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/internships')}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 font-semibold text-white bg-purple-500 rounded hover:bg-purple-600"
          >
            {id ? "Save Changes" : "Publish Internship"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostInternshipForm;
