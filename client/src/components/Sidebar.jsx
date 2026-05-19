import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Sidebar() {
  const { pathname } = useLocation();
  const { t } = useTranslation();

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
      </nav>
    </div>
  );
}
