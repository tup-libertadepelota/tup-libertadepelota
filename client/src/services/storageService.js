const MATCHES_KEY = 'matches';
const CACHE_DURATION = 5 * 60 * 1000;

export function getStoredMatches() {
  const cached = JSON.parse(localStorage.getItem(MATCHES_KEY));

  if (!cached) return null;

  const isExpired = Date.now() - cached.timestamp > CACHE_DURATION;

  if (isExpired) {
    localStorage.removeItem(MATCHES_KEY);
    return null;
  }

  return cached.data;
}

export function saveMatches(matches) {
  localStorage.setItem(
    MATCHES_KEY,
    JSON.stringify({
      data: matches,
      timestamp: Date.now(),
    })
  );
}
