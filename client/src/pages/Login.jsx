import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js"
import {Button, CircularProgress, Divider} from '@mui/material'
import logo from '../assets/images/logo.png'
import { loginWithGoogle } from "../services/authService.js";

export default function Login(){


  const [googleLoading, setGoogleLoading] = useState(false)

  const { user } = useAuth();
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
  }


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-8">
      <div className="flex flex-col items-center gap-2">
        <img src={logo} className="w-60 h-60" alt="" />
      </div>

      <div className="flex items-center w-64 gap-3">
        <Divider sx={{ flex: 1, borderColor: '#d1d5db' }} />
        <span className="text-gray-400 text-sm">o</span>
        <Divider sx={{ flex: 1, borderColor: '#d1d5db' }} />
      </div>

      <Button
        variant="outlined"
        onClick={handleGoogleLogin}
        disabled={googleLoading}
        startIcon={
          googleLoading ? (
            <CircularProgress size={18} color="inherit" />
          ) : (
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
          )
        }
        sx={{
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.95rem',
          color: '#3c4043',
          borderColor: '#dadce0',
          backgroundColor: '#fff',
          padding: '10px 24px',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: '#f7f8f8',
            borderColor: '#d2e3fc',
            boxShadow: '0 1px 3px rgba(60,64,67,0.15)',
          },
        }}
      >
        {googleLoading ? 'Conectando...' : 'Iniciar sesión con Google'}
      </Button>
    </div>
  )
}