import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider } from "@mui/material";
import logo from "../assets/images/logo.png";
import { useAuth } from "../hooks/useAuth.js";
import { loginWithGoogle } from "../services/authService.js";

export default function Login() {
  const [googleLoading, setGoogleLoading] = useState(false);
  const { user} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error(error);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-8">
      <div className="flex flex-col items-center gap-2">
        <img src={logo} className="w-60 h-60" alt="" />
      </div>

      <div className="flex items-center w-64 gap-3">
        <Divider sx={{ flex: 1, borderColor: "#d1d5db" }} />
        <span className="text-gray-400 text-sm">o</span>
        <Divider sx={{ flex: 1, borderColor: "#d1d5db" }} />
      </div>

      <Button variant="outlined" onClick={handleGoogleLogin} disabled={googleLoading} sx={{
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.95rem",
          color: "#3c4043",
          borderColor: "#dadce0",
          backgroundColor: "#fff",
          padding: "10px 24px",
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "#f7f8f8",
            borderColor: "#d2e3fc",
            boxShadow: "0 1px 3px rgba(60,64,67,0.15)",
          },
        }}
      >
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M21.6 12.23c0-.69-.06-1.35-.17-1.99H12v3.77h5.39a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.89-1.74 2.97-4.31 2.97-7.3Z"
            />
            <path
              fill="#34A853"
              d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.24-2.5c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.58A10 10 0 0 0 12 22Z"
            />
            <path
              fill="#FBBC05"
              d="M6.41 12.91A5.99 5.99 0 0 1 6.41 9.09V6.51H3.07a10 10 0 0 0 0 12.8l3.34-2.4Z"
            />
            <path
              fill="#EA4335"
              d="M12 6.04c1.47 0 2.79.5 3.83 1.49l2.87-2.87A9.98 9.98 0 0 0 12 2 10 10 0 0 0 3.07 6.51l3.34 2.58C7.2 7.8 9.4 6.04 12 6.04Z"
            />
          </svg>
          {googleLoading ? "Conectando..." : "Iniciar sesión con Google"}
        </span>
      </Button>
    </div>
  );
}