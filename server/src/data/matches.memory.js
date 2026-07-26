export let matches = [];

export function setMatches(newMatches) {
  matches = newMatches;
}

export function getMatches() {
  return matches;
}

export function getMatchById(id) {
  return matches.find((match) => match.fixture.id === id);
}

export function addMatch(match) {
  matches.push(match);
  return match;
}

export function replaceMatch(id, newMatch) {
  const index = matches.findIndex((match) => match.fixture.id === id);

  if (index === -1) return null;

  matches[index] = newMatch;
  return matches[index];
}

export function updateMatchActive(id, active) {
  const match = getMatchById(id);

  if (!match) return null;

  match.active = active;
  return match;
}

export function deleteMatch(id) {
  const exists = matches.some((match) => match.fixture.id === id);

  if (!exists) return false;

  matches = matches.filter((match) => match.fixture.id !== id);
  return true;
}