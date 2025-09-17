import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; // If you use react-hot-toast for notifications

const MentorManagement = () => {
  const [mentors, setMentors] = useState([]);
  const [internshipPosts, setInternshipPosts] = useState([]);
  const [mentorName, setMentorName] = useState("");
  const [mentorEmail, setMentorEmail] = useState("");
  const [mentorExpertise, setMentorExpertise] = useState("");
  const [companyId, setCompanyId] = useState(null);

  // Fetch company ID
  useEffect(() => {
    const fetchCompanyId = async () => {
      try {
        const res = await axios.get(
          "http://localhost/InternBackend/company/api/get_company_id.php",
          { withCredentials: true }
        );
        if (res.data && res.data.company_id) {
          setCompanyId(res.data.company_id);
        }
      } catch (err) {
        setCompanyId(null);
      }
    };
    fetchCompanyId();
  }, []);

  // Fetch internship posts for this company
  useEffect(() => {
    const fetchPosts = async () => {
      if (!companyId) return;
      try {
        const res = await axios.get(
          `http://localhost/InternBackend/company/api/get_internship_posts.php?company_id=${companyId}`
        );
        setInternshipPosts(res.data || []);
        if (res.data && res.data.length > 0) {
          setMentorExpertise(res.data[0].title);
        }
      } catch (err) {
        setInternshipPosts([]);
      }
    };
    fetchPosts();
  }, [companyId]);

  // Fetch mentors from backend
  useEffect(() => {
    const fetchMentors = async () => {
      if (!companyId) return;
      try {
        const res = await axios.get(
          `http://localhost/InternBackend/company/api/get_mentors.php?company_id=${companyId}`
        );
        setMentors(res.data || []);
      } catch (err) {
        setMentors([]);
      }
    };
    fetchMentors();
  }, [companyId]);

  const handleAddMentor = async (e) => {
    e.preventDefault();
    if (!mentorName.trim() || !mentorEmail.trim() || !mentorExpertise) return;

    // Prevent duplicate in frontend (optional, backend will also check)
    const duplicateEmailDifferentName = mentors.some(
      (m) =>
        m.email.trim().toLowerCase() === mentorEmail.trim().toLowerCase() &&
        m.name.trim().toLowerCase() !== mentorName.trim().toLowerCase()
    );
    if (duplicateEmailDifferentName) {
      alert("This email is already used by another mentor name!");
      return;
    }

    const duplicate = mentors.some(
      (m) =>
        m.name.trim().toLowerCase() === mentorName.trim().toLowerCase() &&
        m.email.trim().toLowerCase() === mentorEmail.trim().toLowerCase() &&
        m.expertise === mentorExpertise
    );
    if (duplicate) {
      alert("This mentor with the same name, email, and expertise is already added!");
      return;
    }

    try {
      const res = await axios.post("http://localhost/InternBackend/company/api/add_mentor.php", {
        company_id: companyId,
        name: mentorName.trim(),
        email: mentorEmail.trim(),
        expertise: mentorExpertise,
      });
      if (res.data.success) {
        setMentors([res.data.mentor, ...mentors]);
        setMentorName("");
        setMentorEmail("");
        setMentorExpertise(internshipPosts[0]?.title || "");
      } else {
        alert(res.data.message || "Failed to add mentor");
      }
    } catch (err) {
      alert("Server error. Please try again.");
    }
  };

  const handleDeleteMentor = async (mentorId) => {
    if (!window.confirm("Are you sure you want to remove this mentor?")) return;
    try {
      const res = await axios.post(
        "http://localhost/InternBackend/company/api/delete_mentor.php",
        { mentor_id: mentorId, company_id: companyId }
      );
      if (res.data.success) {
        setMentors(mentors.filter((m) => m.id !== mentorId));
        toast && toast.success("Mentor removed successfully!");
      } else {
        toast && toast.error(res.data.message || "Failed to remove mentor");
      }
    } catch (err) {
      toast && toast.error("Server error. Please try again.");
    }
  };

  return (
    <div
      style={{
        background: "#f8f9fa",
        minHeight: "100vh",
        padding: "2rem 0",
      }}
    >
      <div
        style={{
          maxWidth: 700,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,33,71,0.07)",
          padding: "2.5rem 2rem",
          border: "1.5px solid #002147",
        }}
      >
        <h2
          style={{
            color: "#002147",
            fontWeight: 700,
            fontSize: "2rem",
            marginBottom: "1.5rem",
            letterSpacing: "-1px",
          }}
        >
          Mentor Management
        </h2>

        {/* Add Mentor Form */}
        <form
          onSubmit={handleAddMentor}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            marginBottom: "2.5rem",
            background: "#f6f8fa",
            borderRadius: 12,
            padding: "1.5rem",
            border: "1px solid #e5e7eb",
          }}
        >
          <div>
            <label
              style={{
                color: "#002147",
                fontWeight: 600,
                marginBottom: 4,
                display: "block",
              }}
            >
              Mentor Name
            </label>
            <input
              type="text"
              value={mentorName}
              onChange={(e) => setMentorName(e.target.value)}
              style={{
                width: "100%",
                padding: "0.6rem 0.9rem",
                border: "1.5px solid #002147",
                borderRadius: 8,
                fontSize: "1rem",
                outline: "none",
                transition: "border 0.2s",
              }}
              placeholder="Enter mentor name"
              required
            />
          </div>
          <div>
            <label
              style={{
                color: "#002147",
                fontWeight: 600,
                marginBottom: 4,
                display: "block",
              }}
            >
              Mentor Email
            </label>
            <input
              type="email"
              value={mentorEmail}
              onChange={(e) => setMentorEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "0.6rem 0.9rem",
                border: "1.5px solid #002147",
                borderRadius: 8,
                fontSize: "1rem",
                outline: "none",
                transition: "border 0.2s",
              }}
              placeholder="Enter mentor email"
              required
            />
          </div>
          <div>
            <label
              style={{
                color: "#002147",
                fontWeight: 600,
                marginBottom: 4,
                display: "block",
              }}
            >
              Expertise
            </label>
            <select
              value={mentorExpertise}
              onChange={(e) => setMentorExpertise(e.target.value)}
              style={{
                width: "100%",
                padding: "0.6rem 0.9rem",
                border: "1.5px solid #002147",
                borderRadius: 8,
                fontSize: "1rem",
                background: "#fff",
                outline: "none",
              }}
              required
            >
              {internshipPosts.length === 0 && (
                <option value="">No posts available</option>
              )}
              {internshipPosts.map((post) => (
                <option key={post.id} value={post.title}>
                  {post.title}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            style={{
              alignSelf: "flex-start",
              background: "#FF8500",
              color: "#fff",
              fontWeight: 600,
              fontSize: "1rem",
              padding: "0.6rem 1.5rem",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(255,133,0,0.08)",
              transition: "background 0.2s",
            }}
            onMouseOver={e => (e.currentTarget.style.background = "#e67300")}
            onMouseOut={e => (e.currentTarget.style.background = "#FF8500")}
            disabled={internshipPosts.length === 0}
          >
            Add Mentor
          </button>
        </form>

        {/* Mentor List */}
        <h3
          style={{
            color: "#002147",
            fontWeight: 600,
            fontSize: "1.2rem",
            marginBottom: "1rem",
          }}
        >
          Current Mentors
        </h3>
        <div
          style={{
            maxHeight: "220px", // ~5 items at 44px each
            overflowY: "auto",
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,33,71,0.03)",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {mentors.length === 0 && (
              <li style={{ padding: "1rem", color: "#888" }}>
                No mentors added yet.
              </li>
            )}
            {mentors.map((mentor) => (
              <li
                key={mentor.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  padding: "1rem 1.2rem",
                  borderBottom: "1px solid #f0f0f0",
                  transition: "background 0.15s",
                  position: "relative"
                }}
                onMouseOver={e => (e.currentTarget.style.background = "#f6f8fa")}
                onMouseOut={e => (e.currentTarget.style.background = "#fff")}
              >
                <span style={{ fontWeight: 600, color: "#002147", fontSize: "1.05rem" }}>
                  {mentor.name}
                </span>
                <span style={{ color: "#555", fontSize: "0.97rem" }}>
                  <span style={{ color: "#002147" }}>{mentor.email}</span>
                  {" "}·{" "}
                  <span style={{ color: "#FF8500", fontWeight: 500 }}>{mentor.expertise}</span>
                </span>
                <button
                  onClick={() => handleDeleteMentor(mentor.id)}
                  style={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "#FF4C4C",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "0.3rem 0.8rem",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  title="Remove Mentor"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MentorManagement;