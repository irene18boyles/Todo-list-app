import { useState } from "react";
import "../styles/RegisterForm.css"
export default function RegisterForm({ onAuthSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      localStorage.setItem("token", data.token);
      onAuthSuccess(data.token);
    } catch (err) {
      setError("Server error", err);
    }
  };

  return (
    <form onSubmit={handleRegister} className="login-form space-y-4">
  <input
    type="text"
    placeholder="Name"
    className="form-input"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
  />
  <input
    type="email"
    placeholder="Email"
    className="form-input"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
  <input
    type="password"
    placeholder="Password"
    className="form-input"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
  {error && <p className="error-text">{error}</p>}
  <button type="submit" className="form-button-login">
    Register
  </button>
</form>

  );
}
