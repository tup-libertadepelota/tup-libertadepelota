const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3001' : '';

function normalizeMatch(match) {
  return {
    id: match.id,
    league: match.league,
    status: match.status,
    active: match.active,
    fixture: {
      id: match.id,
      date: match.date,
      referee: '',
      venue: {
        name: match.league,
      },
    },
    teams: {
      home: {
        name: match.homeTeam,
        logo: '/favicons/favicon.svg',
      },
      away: {
        name: match.awayTeam,
        logo: '/favicons/favicon.svg',
      },
    },
    goals: {
      home: null,
      away: null,
    },
  };
}

export async function fetchMatches() {
  const response = await fetch(`${API_BASE_URL}/api/matches`);

  if (!response.ok) {
    throw new Error('errors.api');
  }

  const data = await response.json();

  return data.map(normalizeMatch);
}
