import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';
import logo from '../assets/images/logo.png';

export default function Sidebar() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [informationOpen, setInformationOpen] = useState(false);

  const linkClass = (path) =>
    `block px-4 py-3 rounded-lg transition-all ${
      pathname === path
        ? 'bg-[#00ff9c]/20 text-[#00ff9c] shadow-[0_0_10px_#00ff9c]'
        : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`;

  return (
    <div className="h-full p-4 backdrop-blur-md bg-white/5 border-r border-white/10">
      <h1 className="text-xl font-bold text-[#578056] mb-6">{t('app.title')}</h1>

      <nav className="flex flex-col gap-2">
        <Link to="/" className={linkClass('/')}>
          {t('nav.matches')}
        </Link>

        <Link to="/settings" className={linkClass('/settings')}>
          {t('nav.settings')}
        </Link>

        <button
          type="button"
          className={`${linkClass('/information')} text-left`}
          onClick={() => setInformationOpen(true)}
        >
          {t('nav.information')}
        </button>
      </nav>

      <Dialog
        open={informationOpen}
        onClose={() => setInformationOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#1a1f2e',
            color: '#e5e7eb',
            borderRadius: 3,
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>{t('nav.information')}</DialogTitle>
        <DialogContent>
          <div className="space-y-4 min-w-80">
            <div className="flex items-center gap-4">
              <img
                src={logo}
                alt="Logo LibertaDEpelota"
                className="w-14 h-14 rounded-xl object-contain"
              />
              <div>
                <span className="text-lg font-bold text-[var(--color-primary)]">
                  {t('app.title')}
                </span>
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
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setInformationOpen(false)} sx={{ textTransform: 'none' }}>
            {t('common.close')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
