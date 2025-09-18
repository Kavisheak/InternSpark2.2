import React, { useState, useEffect } from "react";
import axios from "axios";

// Utility to shuffle arrays
function shuffle(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const AllocateMentors = () => {
  const [companyId, setCompanyId] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [allocations, setAllocations] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch company ID from backend session
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

  // Fetch mentors for this company
  useEffect(() => {
    if (!companyId) return;
    const fetchMentors = async () => {
      try {
        const res = await axios.get(
          `http://localhost/InternBackend/company/api/get_mentors.php?company_id=${companyId}`
        );
        setMentors(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setMentors([]);
      }
    };
    fetchMentors();
  }, [companyId]);

  // Fetch accepted students for this company
  useEffect(() => {
    if (!companyId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const fetchStudents = async () => {
      try {
        const res = await axios.get(
          `http://localhost/InternBackend/company/api/get_accepted_students.php?company_id=${companyId}`
        );
        setStudents(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setStudents([]);
      }
      setLoading(false);
    };
    fetchStudents();
  }, [companyId]);

  // Fetch allocations
  useEffect(() => {
    if (!companyId) return;
    const fetchAllocations = async () => {
      try {
        const res = await axios.get(
          `http://localhost/InternBackend/company/api/get_mentor_allocations.php?company_id=${companyId}`
        );
        setAllocations(res.data || {});
      } catch (err) {
        setAllocations({});
      }
    };
    fetchAllocations();
  }, [companyId, students.length, mentors.length]);

  // Allocation logic: only allocate students not already allocated
  const handleRandomAllocate = async () => {
    let newAllocations = { ...allocations };
    const posts = [...new Set(students.map(s => s.post))];

    console.log("Mentors:", mentors.map(m => m.expertise));
    console.log("Student Posts:", students.map(s => s.post));

    posts.forEach(post => {
      console.log("Allocating for post:", post);
      const mentorsForPost = shuffle(
        mentors.filter(
          m =>
            m.expertise &&
            m.expertise.trim() === post.trim()
        )
      );
      console.log("Mentors found for this post:", mentorsForPost.map(m => m.expertise));

      const studentsForPost = shuffle(
        students.filter(
          s => s.post && s.post.trim() === post.trim()
        )
      );

      if (mentorsForPost.length === 0) {
        studentsForPost.forEach(student => {
          newAllocations[`${student.id}-${student.post}`] = null;
        });
        return;
      }

      studentsForPost.forEach((student, idx) => {
        const mentor = mentorsForPost[idx % mentorsForPost.length];
        newAllocations[`${student.id}-${student.post}`] = mentor.id;
      });
    });

    setSaving(true);
    try {
      await axios.post(
        "http://localhost/InternBackend/company/api/save_mentor_allocations.php",
        { allocations: newAllocations, company_id: companyId },
        { headers: { "Content-Type": "application/json" } }
      );
      setAllocations(newAllocations);
    } catch (err) {
      // Optionally show error
    }
    setSaving(false);
  };

  const allAllocated = students.every(s => {
    const mentorId = allocations[s.id];
    return mentorId && mentors.some(m => String(m.id) === String(mentorId));
  });

  let content;
  try {
    if (loading) {
      content = <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</div>;
    } else {
      content = (
        <div style={{
          background: "#fff",
          minHeight: "60vh",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,33,71,0.07)",
          padding: "2.5rem 2rem",
          border: "1.5px solid #002147",
          maxWidth: 900,
          margin: "2rem auto"
        }}>
          <h2 style={{
            color: "#002147",
            fontWeight: 700,
            fontSize: "2rem",
            marginBottom: "1.5rem",
            letterSpacing: "-1px",
          }}>
            Allocate Mentors
          </h2>
          <button
            onClick={handleRandomAllocate}
            style={{
              background: "#FF8500",
              color: "#fff",
              fontWeight: 600,
              padding: "0.6rem 1.5rem",
              border: "none",
              borderRadius: 8,
              cursor: allAllocated || saving ? "not-allowed" : "pointer",
              marginBottom: "1.5rem",
              fontSize: "1rem"
            }}
            disabled={students.length === 0 || mentors.length === 0 || allAllocated || saving}
          >
            {saving ? "Allocating..." : allAllocated ? "All Allocated" : "Allocate Randomly"}
          </button>
          <button
            onClick={async () => {
              if (!companyId) return;
              setSaving(true);
              try {
                const res = await axios.post(
                  "http://localhost/InternBackend/company/api/send_mentor_allocation_mails.php",
                  new URLSearchParams({ company_id: companyId }),
                  { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
                );
                if (res.data && res.data.success) {
                  alert(
                    `Emails sent!\nMentors: ${res.data.mentors_emailed}\nStudents: ${res.data.students_emailed}`
                  );
                } else {
                  alert("Failed to send emails.");
                }
              } catch (err) {
                alert("Failed to send emails.",err);
              }
              setSaving(false);
            }}
            style={{
              background: "#002147",
              color: "#fff",
              fontWeight: 600,
              padding: "0.6rem 1.5rem",
              border: "none",
              borderRadius: 8,
              cursor: allAllocated && !saving ? "pointer" : "not-allowed",
              marginBottom: "1.5rem",
              fontSize: "1rem",
              marginLeft: "1rem"
            }}
            disabled={!allAllocated || saving}
          >
            {saving ? "Sending..." : "Send Mail"}
          </button>
          <div style={{
            border: "2px solid #000",
            borderRadius: 8,
            overflow: "hidden",
            marginBottom: "2rem"
          }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f6f8fa" }}>
                  <th style={{ color: "#002147", padding: "0.75rem", textAlign: "left" }}>Student</th>
                  <th style={{ color: "#002147", padding: "0.75rem", textAlign: "left" }}>Post</th>
                  <th style={{ color: "#002147", padding: "0.75rem", textAlign: "left" }}>Mentor</th>
                </tr>
              </thead>
            </table>
            <div style={{
              maxHeight: "280px", // 5 rows × ~56px
              overflowY: "auto"
            }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  {Array.isArray(students) && students.map((student) => {
                    const allocationKey = `${student.id}-${student.post}`;
                    const mentorId = allocations[allocationKey];
                    const mentor = mentors.find(m => String(m.id) === String(mentorId));
                    return (
                      <tr key={allocationKey} style={{ borderBottom: "1px solid #eee" }}>
                        <td style={{ padding: "0.75rem" }}>
                          <span style={{ fontWeight: 600 }}>{student.name}</span>
                          <br />
                          <span style={{ color: "#555", fontSize: "0.95rem" }}>{student.email}</span>
                        </td>
                        <td style={{ padding: "0.75rem", color: "#FF8500", fontWeight: 500 }}>{student.post}</td>
                        <td style={{ padding: "0.75rem" }}>
                          {mentor
                            ? <span style={{ color: "#002147", fontWeight: 600 }}>{mentor.name}</span>
                            : <span style={{ color: "#888" }}>Not allocated</span>
                          }
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {(students.length === 0 || mentors.length === 0) && (
            <div style={{ color: "#888", fontWeight: 500 }}>
              {students.length === 0
                ? "No accepted students found for your internships."
                : "No mentors available for allocation."}
            </div>
          )}
        </div>
      );
    }
  } catch (err) {
    content = <div style={{ color: "red" }}>Error: {err.message}</div>;
  }
  return content;
};

export default AllocateMentors;

