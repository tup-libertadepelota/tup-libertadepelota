import { formatMatchDate } from '../utils/formatDate';
import { useTranslation } from 'react-i18next';

export default function MatchCard({ match }) {
  const { t } = useTranslation();
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <p>{new Date(match.fixture.date).toLocaleDateString()}</p>

      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
        <p>{formatMatchDate(match.fixture.date)}</p>

        <div className="grid grid-cols-3 items-center text-center">
          {/* LOCAL */}
          <div className="flex flex-col items-center gap-3 min-w-0">
            <img src={match.teams.home.logo} className="w-16 h-16" alt="local" />

            <h3 className="font-bold uppercase text-sm md:text-base truncate max-w-full">
              {match.teams.home.name}
            </h3>
          </div>

          {/* RESULTADO */}
          <div className="text-center">
            <span className="font-bold">
              {match.goals.home} - {match.goals.away}
            </span>
          </div>

          {/* VISITANTE */}
          <div className="flex flex-col items-center gap-3 min-w-0">
            <img src={match.teams.away.logo} className="w-16 h-16" alt="visitante" />

            <h3 className="font-bold uppercase text-sm md:text-base truncate max-w-full">
              {match.teams.away.name}
            </h3>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-400 space-y-1">
          <p>{t('match.referee', { referee: match.fixture.referee || t('match.noInfo') })}</p>

          <p>{t('match.stadium', { venue: match.fixture.venue.name || t('match.noInfo') })}</p>
        </div>
      </div>
    </div>
  );
}
