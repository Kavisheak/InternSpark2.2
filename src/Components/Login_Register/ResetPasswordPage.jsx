import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [strength, setStrength] = useState({ label: "", color: "" });

  // ✅ Password strength rules
  const validatePassword = (pwd) => {
    const minLength = /.{8,}/;
    const upper = /[A-Z]/;
    const lower = /[a-z]/;
    const number = /[0-9]/;
    const special = /[@$!%*?&]/;

    let score = 0;
    if (minLength.test(pwd)) score++;
    if (upper.test(pwd)) score++;
    if (lower.test(pwd)) score++;
    if (number.test(pwd)) score++;
    if (special.test(pwd)) score++;

    if (score <= 2) return { label: "Weak", color: "red" };
    if (score === 3 || score === 4) return { label: "Medium", color: "orange" };
    if (score === 5) return { label: "Strong", color: "green" };
    return { label: "", color: "" };
  };

  const handlePasswordChange = (pwd) => {
    setPassword(pwd);
    setStrength(validatePassword(pwd));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (strength.label === "Weak") {
      setError("Password is too weak. Please make it stronger.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    try {
      const res = await axios.post("http://localhost/InternBackend/api/reset_password.php", { token, password });
      setMessage(res.data.message);
    } catch {
      setMessage("Error resetting password.");
    }
  };

  return (
    <div className="reset-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          placeholder="New password"
          required
        />
        {strength.label && (
          <p style={{ color: strength.color }}>Strength: {strength.label}</p>
        )}

        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Confirm password"
          required
        />

        <button type="submit">Reset</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
};

export default ResetPassword;
