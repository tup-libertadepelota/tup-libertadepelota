import { formatMatchDate } from '../utils/formatDate';
import { useTranslation } from 'react-i18next';

export default function MatchCard({ match }) {
  const { t } = useTranslation();

  if (!match) {
    return null;
  }

  return (
    <div className="p-4 rounded-xl border border-white/10 bg-white/5">
      <p className="mb-4 text-sm text-gray-300 capitalize">{formatMatchDate(match.date)}</p>

      <div className="grid grid-cols-3 items-center text-center">
        <h3 className="font-bold text-sm md:text-base truncate max-w-full text-left">
          {match.homeTeam}
        </h3>

        <span className="text-2xl font-black text-white/40">-</span>

        <h3 className="font-bold text-sm md:text-base truncate max-w-full text-right">
          {match.awayTeam}
        </h3>
      </div>

      <div className="mt-4 text-sm text-gray-400 space-y-1">
        <p>{match.league}</p>
        <p>{match.status || t('match.noInfo')}</p>
      </div>
    </div>
  );
}
