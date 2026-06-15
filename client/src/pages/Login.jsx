import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"
import {Button, CircularProgress} from '@mui/material'
import logo from '../assets/images/logo.png'


export default function Login(){

  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate();


  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login();
      navigate('/');
    }, 2000);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-8">
      <div className="flex flex-col items-center gap-2">
        <img src={logo} className="w-60 h-60" alt="" />
      </div>

      <Button
        variant="contained"
        onClick={handleLogin}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={18} color="inherit"/> : null}
      >
        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </Button>
    </div>
  )
}