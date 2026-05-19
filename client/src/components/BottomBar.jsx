import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function BottomBar() {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const itemClass = (path) =>
    `flex flex-col items-center text-xs ${
      pathname === path ? 'text-[var(--color-primary)]' : 'text-gray-400'
    }`;

  return (
    <div className="flex justify-around py-3 bg-[var(--color-card)] border-t border-white/10 backdrop-blur-md">
      <Link to="/" className={itemClass('/')}>
        <span>{t('nav.matches')}</span>
      </Link>

      <Link to="/settings" className={itemClass('/settings')}>
        <span>{t('nav.config')}</span>
      </Link>
    </div>
  );
}
