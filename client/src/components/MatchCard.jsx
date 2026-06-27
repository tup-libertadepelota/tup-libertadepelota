import { formatMatchDate } from '../utils/formatDate';
import { useTranslation } from 'react-i18next';

export default function MatchCard({ match }) {
  const { t } = useTranslation();

  const homeGoals = match.goals.home;
  const awayGoals = match.goals.away;

  const hasResult = homeGoals !== null && awayGoals !== null;
  const homeWins = hasResult && homeGoals > awayGoals;
  const awayWins = hasResult && awayGoals > homeGoals;
  const isDraw = hasResult && homeGoals === awayGoals;

  const cardBg = homeWins
    ? 'bg-[linear-gradient(to_right,_theme(colors.winner-bg),_transparent_50%,_theme(colors.loser-bg))]'
    : awayWins
      ? 'bg-[linear-gradient(to_right,_theme(colors.loser-bg),_transparent_50%,_theme(colors.winner-bg))]'
      : isDraw
        ? 'bg-[linear-gradient(to_right,_theme(colors.draw-bg),_transparent_50%,_theme(colors.draw-bg))]'
        : 'bg-white/5';

  const cardBorder = isDraw ? 'border-draw-border' : 'border-white/10';

  return (
    <div className={`p-4 rounded-xl border ${cardBorder} ${cardBg}`}>
      <p className="mb-4 text-sm text-gray-300 capitalize">{formatMatchDate(match.fixture.date)}</p>

      <div className="grid grid-cols-3 items-center text-center">
        <div className="flex flex-col items-start gap-2 min-w-0">
          <img src={match.teams.home.logo} className="w-10 h-10" alt="local" />

          <h3
            className={`font-bold text-sm md:text-base truncate max-w-full ${
              homeWins ? 'text-winner' : awayWins ? 'text-loser' : 'text-white'
            }`}
          >
            {match.teams.home.name}
          </h3>
        </div>

        <div className="flex justify-center">
          <span className="text-2xl font-black">
            <span className={homeWins ? 'text-winner' : awayWins ? 'text-loser' : 'text-white'}>
              {homeGoals ?? '-'}
            </span>

            <span className="text-white/40"> - </span>

            <span className={awayWins ? 'text-winner' : homeWins ? 'text-loser' : 'text-white'}>
              {awayGoals ?? '-'}
            </span>
          </span>
        </div>

        <div className="flex flex-col items-end gap-2 min-w-0">
          <img src={match.teams.away.logo} className="w-10 h-10" alt="visitante" />

          <h3
            className={`font-bold text-sm md:text-base truncate max-w-full ${
              awayWins ? 'text-winner' : homeWins ? 'text-loser' : 'text-white'
            }`}
          >
            {match.teams.away.name}
          </h3>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-400 space-y-1">
        <p>
          {t('match.referee', {
            referee: match.fixture.referee || t('match.noInfo'),
          })}
        </p>

        <p>
          {t('match.stadium', {
            venue: match.fixture.venue.name || t('match.noInfo'),
          })}
        </p>
      </div>
    </div>
  );
}
