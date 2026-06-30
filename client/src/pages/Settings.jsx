import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from 'react-i18next';

export default function Settings() {
  const { user, logout } = useAuth();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { t } = useTranslation();

  const handleLogout = () => {
    setLogoutDialogOpen(false);
    logout();
  };

  const userName = user?.name || t('settings.defaultUser');
  const userEmail = user?.email || t('settings.noEmail');

  const userInitials = userName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[#00ff9c]">{t('settings.title')}</h2>

        <Button
          variant="text"
          color="error"
          size="small"
          startIcon={<LogoutIcon />}
          onClick={() => setLogoutDialogOpen(true)}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            color: '#ef4444',
            opacity: 0.8,
            '&:hover': {
              backgroundColor: 'rgba(239,68,68,0.08)',
              opacity: 1,
            },
          }}
        >
          {t('settings.logout')}
        </Button>
      </div>

      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
        <span>{t('settings.userOptions')}</span>
      </div>

      <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex items-center gap-5">
        <Avatar
          src={user?.picture || undefined}
          sx={{
            width: 72,
            height: 72,
            bgcolor: 'var(--color-primary)',
            fontSize: '1.75rem',
            fontWeight: 700,
          }}
        >
          {userInitials}
        </Avatar>

        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold text-white">{userName}</span>
          <span className="text-sm text-gray-400">{userEmail}</span>
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
            bgcolor: '#1a1f2e',
            color: '#e5e7eb',
            borderRadius: 3,
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>{t('settings.logoutDialogTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#9ca3af' }}>
            {t('settings.logoutDialogText')}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setLogoutDialogOpen(false)}
            sx={{ textTransform: 'none', color: '#9ca3af' }}
          >
            {t('settings.logoutCancel')}
          </Button>
          <Button
            onClick={handleLogout}
            variant="contained"
            color="error"
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            {t('settings.logoutConfirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
