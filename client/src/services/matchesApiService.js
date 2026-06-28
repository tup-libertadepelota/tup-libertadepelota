export async function fetchMatches(season = 2024) {
  const response = await fetch(
    `https://v3.football.api-sports.io/fixtures?league=128&season=${season}`,
    {
      headers: {
        'x-apisports-key': import.meta.env.VITE_API_KEY_FOOTBALL,
      },
    }
  );

  if (!response.ok) {
    throw new Error('errors.api');
  }

  const data = await response.json();

  return data.response;
}
