import { formatMatchDate } from "../utils/formatDate";

export default function MatchCard({ match }) {
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
      <p>
        {formatMatchDate(match.fixture.date)}
      </p>

      <div className="grid grid-cols-3 items-center">
        <div className="flex items-center gap-2 justify-start">
          <img src={match.teams.home.logo} className="w-6 h-6" alt="local" />
          <span className={homeWins ? 'text-winner font-bold' : awayWins ? 'text-loser' : ''}>
            {match.teams.home.name}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-4xl font-black">
            <span className={homeWins ? 'text-winner' : awayWins ? 'text-loser' : 'text-white'}>
              {match.goals.home}
            </span>
            <span className="text-white/40"> - </span>
            <span className={awayWins ? 'text-winner' : homeWins ? 'text-loser' : 'text-white'}>
              {match.goals.away}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2 justify-end">
          <span className={awayWins ? 'text-winner font-bold' : homeWins ? 'text-loser' : ''}>
            {match.teams.away.name}
          </span>
          <img src={match.teams.away.logo} className="w-6 h-6" alt="visitante" />

    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      
      <p>{new Date(match.fixture.date).toLocaleDateString()}</p>

      <div className="p-4 bg-white/5 rounded-xl border border-white/10">

        <p>
          {formatMatchDate(match.fixture.date)}
        </p>

        <div className="grid grid-cols-3 items-center text-center">

          {/* LOCAL */}
          <div className="flex flex-col items-center gap-3 min-w-0">
            <img
              src={match.teams.home.logo}
              className="w-16 h-16"
              alt="local"
            />

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
            <img
              src={match.teams.away.logo}
              className="w-16 h-16"
              alt="visitante"
            />

            <h3 className="font-bold uppercase text-sm md:text-base truncate max-w-full">
              {match.teams.away.name}
            </h3>
          </div>

        </div>

        <div className="mt-6 text-sm text-gray-400 space-y-1">
          <p>Árbitro: {match.fixture.referee || "No informado"}</p>

          <p>
            Estadio: {match.fixture.venue.name || "No informado"}
          </p>
        </div>

      </div>
    </div>
  );
}