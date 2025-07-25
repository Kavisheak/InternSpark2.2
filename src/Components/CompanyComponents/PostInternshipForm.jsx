import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import CompanyNavbar from "./CompanyNavbar";
import axios from "axios";

const PostInternshipForm = () => {
  const { id } = useParams(); // internship id from URL
  const location = useLocation();
  const navigate = useNavigate();

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

  const [isEditable, setIsEditable] = useState(!isViewOnlyMode && !id);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`http://localhost/InternBackend/api/get_internship_details.php?id=${id}`, { withCredentials: true })
        .then(res => {
          if (res.data.success) {
            const internship = res.data.internship;

            const capitalize = (str) =>
              str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "On-site";

            setFormData({
              title: internship.title || "",
              location: internship.location || "",
              internshipType: capitalize(internship.internship_type),
              salary: internship.salary || "",
              duration: internship.duration || "",
              description: internship.description || "",
              requirements: internship.requirements || "",
              deadline: internship.deadline || "",
              applicationLimit: internship.application_limit || "",
            });

            setIsEditable(!isViewOnlyMode);
          } else {
            alert("Failed to load internship details: " + res.data.message);
            navigate("/company/internships");
          }
        })
        .catch(err => {
          console.error("Error fetching internship details", err);
          alert("Server error fetching internship details");
          navigate("/company/internships");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, isViewOnlyMode, navigate]);

  const handleChange = (e) => {
    if (!isEditable) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (type) => {
    if (!isEditable) return;
    setFormData({ ...formData, internshipType: type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditable) return;

    try {
      const payload = {
        ...formData,
        id: id || null,
      };

      const res = await axios.post(
        "http://localhost/InternBackend/api/post_internship.php",
        payload,
        { withCredentials: true }
      );

      if (res.data.success) {
        alert(id ? "Changes Updated" : "Internship posted successfully!");
        if (!id) {
          setFormData({
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
        }
        navigate("/company/internships");
      } else {
        alert("❌ Failed: " + res.data.message);
      }
    } catch (error) {
      console.error("Error submitting internship:", error);
      alert("Server error. Please try again later.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading internship details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <CompanyNavbar />
      <div className="max-w-3xl px-6 py-10 mx-auto my-10 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-center text-oxfordblue">
          {id
            ? isEditable
              ? "Edit Internship"
              : "Internship Details"
            : "Post a New Internship"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 text-gray-800">
          <div>
            <label className="block mb-1 font-semibold text-oxfordblue">
              Internship Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              disabled={!isEditable}
              required
              placeholder="e.g., Frontend Developer Intern"
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2128BD] disabled:bg-gray-100"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-1 font-semibold text-oxfordblue">
                Location
              </label>
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
              <label className="block mb-1 font-semibold text-oxfordblue">
                Internship Type
              </label>
              <div className="flex space-x-2">
                {["On-site", "Remote", "Hybrid"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleTypeChange(type)}
                    disabled={!isEditable}
                    className={`px-4 py-2 border rounded-full ${
                      formData.internshipType === type
                        ? "bg-oxfordblue text-white"
                        : "bg-white text-oxfordblue border-[#2128BD]"
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
              <label className="block mb-1 font-semibold text-oxfordblue">
                Salary
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
              <label className="block mb-1 font-semibold text-oxfordblue">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                disabled={!isEditable}
                required
                placeholder="e.g., 3 months"
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2128BD] disabled:bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-oxfordblue">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={!isEditable}
              required
              rows="4"
              placeholder="Describe the internship..."
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2128BD] disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-oxfordblue">
              Requirements
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              disabled={!isEditable}
              required
              rows="4"
              placeholder="Skills and qualifications..."
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2128BD] disabled:bg-gray-100"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-1 font-semibold text-oxfordblue">
                Application Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                disabled={!isEditable}
                required
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2128BD] disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-oxfordblue">
                Application Limit
              </label>
              <input
                type="number"
                name="applicationLimit"
                value={formData.applicationLimit}
                onChange={handleChange}
                disabled={!isEditable}
                required
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
