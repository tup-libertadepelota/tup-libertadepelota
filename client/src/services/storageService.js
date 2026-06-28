const MATCHES_KEY_PREFIX = 'matches';
const CACHE_DURATION = 5 * 60 * 1000;

function getMatchesKey(season) {
  return `${MATCHES_KEY_PREFIX}-${season}`;
}

export function getStoredMatches(season = 2024) {
  const cached = JSON.parse(localStorage.getItem(getMatchesKey(season)));

  if (!cached) return null;

  const isExpired = Date.now() - cached.timestamp > CACHE_DURATION;

  if (isExpired) {
    localStorage.removeItem(getMatchesKey(season));
    return null;
  }

  return cached.data;
}

export function saveMatches(matches, season = 2024) {
  localStorage.setItem(
    getMatchesKey(season),
    JSON.stringify({
      data: matches,
      timestamp: Date.now(),
    })
  );
}
