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
  Divider,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import logo from '../assets/images/logo.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../services/userProfileService.js';

export default function Settings() {
  const { user, logout } = useAuth();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setLogoutDialogOpen(false);
    logout();
  };

  const userName = user?.name || t('settings.defaultUser');
  const userEmail = user?.email || t('settings.noEmail');
  const userProfile = getUserProfile(user?.email);
  const userPhones = Array.isArray(userProfile.phones)
    ? userProfile.phones.filter((phone) => phone.trim() !== '')
    : [];

  const userInitials = userName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  return (
    <div className="space-y-4">
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
            {user?.role || t('settings.noInfo')}
          </span>
        </div>
        <Button
          variant="outlined"
          onClick={() => navigate('/settings/account')}
          className="ml-auto self-center shrink-0"
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            ml: 'auto',
            color: '#00ff9c',
            borderColor: 'rgba(0,255,156,0.65)',
            px: 4,
            '&:hover': {
              borderColor: '#00ff9c',
              backgroundColor: 'rgba(0,255,156,0.08)',
            },
          }}
        >
          {t('settings.edit')}
        </Button>
      </div>

      <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-4">
        <h3 className="text-lg font-semibold text-white">{t('settings.userInformation')}</h3>

        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <span className="text-gray-400">{t('settings.name')}</span>
            <span className="text-white">{userName}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-400">{t('settings.email')}</span>
            <span className="text-white break-all">{userEmail}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-400">{t('settings.role')}</span>
            <span className="text-white">{user?.role || t('settings.noInfo')}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-400">{t('accountSettings.birthDate')}</span>
            <span className="text-white">{userProfile.birthDate || t('settings.noInfo')}</span>
          </div>

          <div className="flex flex-col gap-1 sm:col-span-2">
            <span className="text-gray-400">{t('accountSettings.address')}</span>
            <span className="text-white">{userProfile.address || t('settings.noInfo')}</span>
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <span className="text-gray-400">{t('accountSettings.phones')}</span>
            {userPhones.length ? (
              <div className="flex flex-wrap gap-2">
                {userPhones.map((phone, index) => (
                  <span
                    key={`${phone}-${index}`}
                    className="rounded-full bg-white/10 px-3 py-1 text-sm text-white"
                  >
                    {phone}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-white">{t('settings.noInfo')}</span>
            )}
          </div>
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

      <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-2">
          <InfoOutlinedIcon fontSize="small" />
          <span>{t('settings.aboutTitle')}</span>
        </div>

        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="Logo LibertaDEpelota"
            className="w-14 h-14 rounded-xl object-contain"
          />
          <div>
            <span className="text-lg font-bold text-[var(--color-primary)]">{t('app.title')}</span>
            <p className="text-xs text-gray-500">{t('app.subtitle')}</p>
          </div>
        </div>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">{t('settings.version')}</span>
            <span className="text-white font-mono">1.0.0</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-400">{t('settings.userAgent')}</span>
            <span className="text-white/70 text-xs font-mono break-all bg-white/5 px-3 py-2 rounded-lg">
              {navigator.userAgent}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
