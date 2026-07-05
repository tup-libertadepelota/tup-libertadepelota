const MATCHES_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001/api/matches';

export async function fetchMatches() {
  const response = await fetch(MATCHES_URL);

  if (!response.ok) {
    throw new Error('errors.api');
  }

  return response.json();
}
