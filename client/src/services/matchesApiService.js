const FIXTURES_URL = 'https://v3.football.api-sports.io/fixtures?league=128&season=2024';

export async function fetchMatches() {
  const response = await fetch(FIXTURES_URL, {
    headers: {
      'x-apisports-key': import.meta.env.VITE_API_KEY_FOOTBALL,
    },
  });

  if (!response.ok) {
    throw new Error('errors.api');
  }

  const data = await response.json();

  return data.response;
}
