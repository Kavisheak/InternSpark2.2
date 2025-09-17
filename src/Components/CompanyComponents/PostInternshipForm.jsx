import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const PostInternshipForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isViewOnlyMode = location.state?.viewOnly === true;

  const internshipTitles = [
    "AI Research Intern",
    "AR/VR Development Intern",
    "Backend Developer Intern",
    "Big Data Intern",
    "Blockchain Development Intern",
    "Business Intelligence Intern",
    "Cloud Computing Intern",
    "Computer Graphics Intern",
    "Computer Vision Intern",
    "CRM Development Intern",
    "Cybersecurity Intern",
    "Data Analyst Intern",
    "Data Engineering Intern",
    "Data Science Intern",
    "Database Administration Intern",
    "Database Management Intern",
    "DevOps Intern",
    "Digital Forensics Intern",
    "E-Commerce Development Intern",
    "Embedded Systems Intern",
    "Enterprise Software Intern",
    "Full Stack Developer Intern",
    "Game Development Intern",
    "Hardware Engineering Intern",
    "Human-Computer Interaction Intern",
    "Information Security Intern",
    "Information Systems Intern",
    "IT Project Management Intern",
    "IT Support Intern",
    "Machine Learning Intern",
    "Mobile App Developer Intern",
    "Natural Language Processing Intern",
    "Network Administration Intern",
    "Network Security Intern",
    "Product Management Intern",
    "QA / Software Testing Intern",
    "Quantum Computing Intern",
    "Robotics Intern",
    "SEO & Digital Marketing Intern",
    "Site Reliability Engineering Intern",
    "Software Development Intern",
    "Software Engineering Intern",
    "Solutions Architect Intern",
    "Systems Administration Intern",
    "Systems Analyst Intern",
    "Technical Support Intern",
    "Technical Writing Intern",
    "UI/UX Design Intern",
    "Virtualization Intern",
    "Web Development Intern",
  ];

  const sriLankaCities = [
    "Akmeemana",
    "Akuressa",
    "Alawwa",
    "Aluthgama",
    "Ambalantota",
    "Ambalangoda",
    "Ambatenna",
    "Ampara",
    "Anamaduwa",
    "Angoda",
    "Anuradhapura",
    "Avissawella",
    "Baddegama",
    "Badulla",
    "Balangoda",
    "Bandaragama",
    "Bandarawela",
    "Battaramulla",
    "Batticaloa",
    "Beruwala",
    "Bibile",
    "Chavakachcheri",
    "Chilaw",
    "Colombo",
    "Dambulla",
    "Dehiattakandiya",
    "Dehiwala-Mount Lavinia",
    "Delgoda",
    "Deniyaya",
    "Deraniyagala",
    "Devinuwara",
    "Divulapitiya",
    "Dodanduwa",
    "Dompe",
    "Eheliyagoda",
    "Ekala",
    "Embilipitiya",
    "Eravur",
    "Eravur Town",
    "Galagedara",
    "Galaha",
    "Galewela",
    "Galle",
    "Gampaha",
    "Gampola",
    "Girandurukotte",
    "Giriulla",
    "Gonagaldeniya",
    "Habarana",
    "Hambantota",
    "Hanwella",
    "Haputale",
    "Harispattuwa",
    "Hatton-Dickoya",
    "Hettipola",
    "Hikkaduwa",
    "Horana",
    "Homagama",
    "Horowpothana",
    "Ibbagamuwa",
    "Ja-Ela",
    "Jaffna",
    "Kadawatha",
    "Kadugannawa",
    "Kalawana",
    "Kalmunai",
    "Kalpitiya",
    "Kalutara",
    "Kaluwanchikudy",
    "Kamburupitiya",
    "Kandana",
    "Kandy",
    "Karapitiya",
    "Karativu",
    "Katana",
    "Katugastota",
    "Katunayake",
    "Kayts",
    "Kegalle",
    "Kelaniya",
    "Keppetipola",
    "Kilinochchi",
    "Kiribathgoda",
    "Kirindiwela",
    "Kirulapone",
    "Kitulgala",
    "Kochchikade",
    "Kollupitiya",
    "Kolonnawa",
    "Kosgoda",
    "Kottawa",
    "Kotagala",
    "Kotahena",
    "Kotmale",
    "Kurunegala",
    "Kuliyapitiya",
    "Kuruwita",
    "Lunugala",
    "Mabola",
    "Maharagama",
    "Mahiyanganaya",
    "Makola",
    "Malabe",
    "Mannar",
    "Marawila",
    "Matale",
    "Matara",
    "Matugama",
    "Medawachchiya",
    "Meetiyagoda",
    "Meegoda",
    "Minuwangoda",
    "Mirigama",
    "Monaragala",
    "Moratuwa",
    "Mullaithivu",
    "Nagoda",
    "Nallur",
    "Narammala",
    "Nattandiya",
    "Nawalapitiya",
    "Nawinna",
    "Nedimala",
    "Negombo",
    "Nintavur",
    "Nugegoda",
    "Nuwara Eliya",
    "Padukka",
    "Panadura",
    "Pannala",
    "Paranakanda",
    "Peliyagoda",
    "Peradeniya",
    "Point Pedro",
    "Polgahawela",
    "Polonnaruwa",
    "Poruthota",
    "Pothuhera",
    "Puttalam",
    "Ragama",
    "Rakwana",
    "Rambukkana",
    "Ratnapura",
    "Rideegama",
    "Seeduwa",
    "Seethawakapura",
    "Seruwila",
    "Sigiriya",
    "Siyanepura",
    "Sitawaka",
    "Talawakele-Lindula",
    "Tangalle",
    "Teldeniya",
    "Thalawathugoda",
    "Thissamaharama",
    "Trincomalee",
    "Tudella",
    "Udawalawe",
    "Ukuwela",
    "Unawatuna",
    "Uragasmanhandiya",
    "Valachchenai",
    "Valvettithurai",
    "Vavuniya",
    "Veyangoda",
    "Wadduwa",
    "Waga",
    "Walapane",
    "Warakapola",
    "Warakapitiya",
    "Wariyapola",
    "Wattala",
    "Weligama",
    "Weligampola",
    "Wellampitiya",
    "Wellawaya",
    "Wennappuwa",
    "Wirawila",
    "Yakkala",
    "Yatiyantota",
  ].sort();

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
  const [errors, setErrors] = useState({});
  const [isCustomTitle, setIsCustomTitle] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(
          `http://localhost/InternBackend/company/api/get_internship_details.php?id=${id}`,
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.success) {
            const internship = res.data.internship;
            const capitalize = (str) =>
              str
                ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
                : "On-site";

            setFormData({
              title: internship.title || "",
              location: internship.location || "",
              internshipType: capitalize(internship.internship_type),
              // strip Rs and months if exist
              salary: internship.salary?.replace(/Rs\s*/i, "") || "",
              duration: internship.duration?.replace(/\s*months?/i, "") || "",
              description: internship.description || "",
              requirements: internship.requirements || "",
              deadline: internship.deadline || "",
              applicationLimit: internship.application_limit || "",
            });

            // Show custom input if title is not in the list
            if (
              internship.title &&
              !internshipTitles.includes(internship.title)
            ) {
              setIsCustomTitle(true);
            } else {
              setIsCustomTitle(false);
            }
            setIsEditable(!isViewOnlyMode);
          } else {
            toast.error(
              "Failed to load internship details: " + res.data.message
            );
            navigate("/company/internships");
          }
        })
        .catch((err) => {
          console.error("Error fetching internship details", err);
          toast.error("Server error fetching internship details");
          navigate("/company/internships");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, isViewOnlyMode, navigate]);

  const handleChange = (e) => {
    if (!isEditable) return;
    let { name, value } = e.target;

    // Only allow numbers in duration and applicationLimit
    if (name === "duration" || name === "applicationLimit") {
      value = value.replace(/\D/g, ""); // remove non-digits
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleTypeChange = (type) => {
    if (!isEditable) return;
    setFormData({ ...formData, internshipType: type });
    setErrors({ ...errors, internshipType: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Please select a title";
    if (!formData.duration.trim())
      newErrors.duration = "Please fill out this field";
    else if (formData.duration === "0")
      newErrors.duration = "Duration cannot be 0";
    if (!formData.description.trim())
      newErrors.description = "Please fill out this field";
    if (!formData.requirements.trim())
      newErrors.requirements = "Please fill out this field";
    if (!formData.deadline.trim())
      newErrors.deadline = "Please select a deadline";
    if (!formData.applicationLimit.toString().trim())
      newErrors.applicationLimit = "Please fill out this field";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditable) return;

    if (!validate()) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const payload = {
        ...formData,
        id: id || null,
        salary: formData.salary ? `Rs ${formData.salary}` : "",
        duration: formData.duration ? `${formData.duration} months` : "",
      };

      const res = await axios.post(
        "http://localhost/InternBackend/company/api/post_internship.php",
        payload,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(
          id ? "Changes Updated" : "Internship posted successfully!"
        );
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
        toast.error("❌ Failed: " + res.data.message);
      }
    } catch (error) {
      console.error("Error submitting internship:", error);
      toast.error("Server error. Please try again later.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading internship details...</p>
      </div>
    );
  }

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl px-6 py-10 mx-auto my-10 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-center text-oxfordblue">
          {id
            ? isEditable
              ? "Edit Internship"
              : "Internship Details"
            : "Post a New Internship"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 text-gray-800">
          {/* Internship Title */}
          <div>
            <label className="block mb-1 font-semibold text-oxfordblue">
              Internship Title
            </label>
            {!isCustomTitle ? (
              <select
                name="title"
                value={formData.title}
                onChange={(e) => {
                  if (e.target.value === "__custom__") {
                    setIsCustomTitle(true);
                    setFormData({ ...formData, title: "" });
                  } else {
                    setIsCustomTitle(false);
                    handleChange(e);
                  }
                }}
                disabled={!isEditable}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 disabled:bg-gray-100
                  ${
                    errors.title
                      ? "border-red-600 focus:ring-red-400"
                      : "border-gray-400 focus:ring-[#2128BD]"
                  }`}
              >
                <option value="">--- Select Title ---</option>
                {internshipTitles.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
                <option value="__custom__">New +</option>
              </select>
            ) : (
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                disabled={!isEditable}
                placeholder="Type your internship title"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 disabled:bg-gray-100
                  ${
                    errors.title
                      ? "border-red-600 focus:ring-red-400"
                      : "border-gray-400 focus:ring-[#2128BD]"
                  }`}
              />
            )}
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Location & Type */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-1 font-semibold text-oxfordblue">
                Location
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                disabled={!isEditable}
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2128BD] disabled:bg-gray-100"
              >
                <option value="">--- Select City ---</option>
                {sriLankaCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
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

          {/* Salary & Duration */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-1 font-semibold text-oxfordblue">
                Salary Range (Rs)
              </label>
              <select
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                disabled={!isEditable}
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2128BD] disabled:bg-gray-100"
              >
                <option value="">--- Select Salary Range ---</option>
                <option value="Rs 5000 - Rs 10,000">Rs 5000 - Rs 10,000</option>
                <option value="Rs 10,000 - Rs 25,000">Rs 10,000 - Rs 25,000</option>
                <option value="Rs 25,000 - Rs 50,000">Rs 25,000 - Rs 50,000</option>
                <option value="Rs 50,000 - Rs 75,000">Rs 50,000 - Rs 75,000</option>
                <option value="Rs 75,000 - Rs 100,000">Rs 75,000 - Rs 100,000</option>
                <option value="Rs 100,000+">Rs 100,000+</option>
                <option value="Negotiable">Negotiable</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-semibold text-oxfordblue">
                Duration (months)
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                disabled={!isEditable}
                placeholder="e.g., 3"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 disabled:bg-gray-100
                  ${
                    errors.duration
                      ? "border-red-600 focus:ring-red-400"
                      : "border-gray-400 focus:ring-[#2128BD]"
                  }`}
              />
              {errors.duration && (
                <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-semibold text-oxfordblue">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={!isEditable}
              rows="4"
              placeholder="Describe the internship..."
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 disabled:bg-gray-100
                ${
                  errors.description
                    ? "border-red-600 focus:ring-red-400"
                    : "border-gray-400 focus:ring-[#2128BD]"
                }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Requirements */}
          <div>
            <label className="block mb-1 font-semibold text-oxfordblue">
              Requirements
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              disabled={!isEditable}
              rows="4"
              placeholder="Skills and qualifications..."
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 disabled:bg-gray-100
                ${
                  errors.requirements
                    ? "border-red-600 focus:ring-red-400"
                    : "border-gray-400 focus:ring-[#2128BD]"
                }`}
            />
            {errors.requirements && (
              <p className="mt-1 text-sm text-red-600">{errors.requirements}</p>
            )}
          </div>

          {/* Deadline & Limit */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-1 font-semibold text-oxfordblue">
                Application Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                min={minDate}
                onChange={handleChange}
                disabled={!isEditable}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 disabled:bg-gray-100
                  ${
                    errors.deadline
                      ? "border-red-600 focus:ring-red-400"
                      : "border-gray-400 focus:ring-[#2128BD]"
                  }`}
              />
              {errors.deadline && (
                <p className="mt-1 text-sm text-red-600">{errors.deadline}</p>
              )}
            </div>
            <div>
              <label className="block mb-1 font-semibold text-oxfordblue">
                Application Limit
              </label>
              <input
                type="text"
                name="applicationLimit"
                value={formData.applicationLimit}
                onChange={handleChange}
                disabled={!isEditable}
                placeholder="e.g., 100"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 disabled:bg-gray-100
                  ${
                    errors.applicationLimit
                      ? "border-red-600 focus:ring-red-400"
                      : "border-gray-400 focus:ring-[#2128BD]"
                  }`}
              />
              {errors.applicationLimit && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.applicationLimit}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
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
                  className="px-6 py-2 font-semibold text-white rounded bg-oxfordblue hover:bg-blue-800"
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