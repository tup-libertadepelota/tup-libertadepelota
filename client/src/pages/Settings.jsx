import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import logo from "../assets/images/logo.png";

export default function Settings() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    setLogoutDialogOpen(false);
    logout();
    navigate("/login");
  };

  const user = {
    name: "Franco Urrutia",
    email: "franco.urrutia@email.com",
    role: "Administrador",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[#00ff9c]">
          Configuración
        </h2>

        <Button
          variant="text"
          color="error"
          small
          startIcon={<LogoutIcon />}
          onClick={() => setLogoutDialogOpen(true)}
          sx={{
            textTransform: "none",
            fontWeight: 500,
            color: "#ef4444",
            opacity: 0.8,
            "&:hover": {
              backgroundColor: "rgba(239,68,68,0.08)",
              opacity: 1,
            },
          }}
        >
          Cerrar sesión
        </Button>
      </div>

      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
        <span>Opciones del usuario</span>
      </div>

      <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex items-center gap-5">
        <Avatar
          sx={{
            width: 72,
            height: 72,
            bgcolor: "var(--color-primary)",
            fontSize: "1.75rem",
            fontWeight: 700,
          }}
        >
          {user.name
            .split(" ")
            .map((w) => w[0])
            .join("")}
        </Avatar>

        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold text-white">{user.name}</span>
          <span className="text-sm text-gray-400">{user.email}</span>
          <span className="text-xs text-[var(--color-primary-soft)] bg-[var(--color-primary)]/15 px-2 py-0.5 rounded-full w-fit mt-1">
            {user.role}
          </span>
        </div>
      </div>

      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: "#1a1f2e",
            color: "#e5e7eb",
            borderRadius: 3,
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          ¿Cerrar sesión?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#9ca3af" }}>
            Estás a punto de cerrar tu sesión. Tendrás que volver a iniciar
            sesión para acceder a la aplicación.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setLogoutDialogOpen(false)}
            sx={{ textTransform: "none", color: "#9ca3af" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleLogout}
            variant="contained"
            color="error"
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Sí, cerrar sesión
          </Button>
        </DialogActions>
      </Dialog>

      <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-2">
          <InfoOutlinedIcon fontSize="small" />
          <span>Acerca de la aplicación</span>
        </div>

        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="Logo LibertaDEpelota"
            className="w-14 h-14 rounded-xl object-contain"
          />
          <div>
            <span className="text-lg font-bold text-[var(--color-primary)]">
              LibertaDEpelota
            </span>
            <p className="text-xs text-gray-500">
              Tu app de fútbol favorita
            </p>
          </div>
        </div>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Versión</span>
            <span className="text-white font-mono">1.0.0</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-400">User Agent</span>
            <span className="text-white/70 text-xs font-mono break-all bg-white/5 px-3 py-2 rounded-lg">
              {navigator.userAgent}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}