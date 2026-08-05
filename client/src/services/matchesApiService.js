import { getCurrentUserToken } from './authService.js';

export class MatchesApiError extends Error {
  constructor(status, code) {
    super(code);
    this.name = 'MatchesApiError';
    this.status = status;
    this.code = code;
  }
}

function getApiBaseUrl() {
  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:3001' : '');

  if (!apiBaseUrl) {
    throw new MatchesApiError(0, 'errors.apiConfiguration');
  }

  return apiBaseUrl.replace(/\/$/, '');
}

export async function fetchMatches() {
  const token = await getCurrentUserToken();
  const apiBaseUrl = getApiBaseUrl();

  if (!token) {
    throw new MatchesApiError(401, 'errors.unauthenticated');
  }

  const response = await fetch(`${apiBaseUrl}/api/matches`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    throw new MatchesApiError(401, 'errors.unauthenticated');
  }

  if (response.status === 403) {
    throw new MatchesApiError(403, 'errors.forbidden');
  }

  if (!response.ok) {
    throw new MatchesApiError(response.status, 'errors.api');
  }

  const data = await response.json();

  return data;
}
