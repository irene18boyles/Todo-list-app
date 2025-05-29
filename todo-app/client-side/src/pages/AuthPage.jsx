import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import "../styles/AuthPage.css";

export default function AuthPage({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login-container">
      <div className="login-form space-y-6">
        <h2 style={{ textAlign: "center" }}>
          {isLogin ? "Login" : "Register"}
        </h2>

        {isLogin ? (
          <LoginForm onAuthSuccess={onAuthSuccess} />
        ) : (
          <RegisterForm onAuthSuccess={onAuthSuccess} />
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "0.875rem",
            marginTop: "1rem",
          }}
        >
          <span>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{
              marginTop: "0.25rem",
              color: "#3b82f6",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
              padding: 0,
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}