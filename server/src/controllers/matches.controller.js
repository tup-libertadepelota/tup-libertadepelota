import {
  getMatches,
  getMatchById,
  addMatch,
  replaceMatch,
  updateMatchActive,
  deleteMatch,
} from '../data/matches.memory.js';

export function getAllMatches(req, res) {
  res.json(getMatches());
}

export function getOneMatch(req, res) {
  const id = Number(req.params.id);
  const match = getMatchById(id);

  if (!match) {
    return res.status(404).json({ message: 'Match not found' });
  }

  res.json(match);
}

export function createMatch(req, res) {
  const newMatch = {
    ...req.body,
    fixture: {
      ...req.body.fixture,
      id: req.body.fixture?.id || Date.now(),
    },
    active: req.body.active ?? true,
  };

  const createdMatch = addMatch(newMatch);

  res.status(201).json(createdMatch);
}

export function putMatch(req, res) {
  const id = Number(req.params.id);

  const replacedMatch = {
    ...req.body,
    fixture: {
      ...req.body.fixture,
      id,
    },
  };

  const result = replaceMatch(id, replacedMatch);

  if (!result) {
    return res.status(404).json({ message: 'Match not found' });
  }

  res.json(result);
}

export function patchMatch(req, res) {
  const id = Number(req.params.id);
  const result = updateMatchActive(id, req.body.active);

  if (!result) {
    return res.status(404).json({ message: 'Match not found' });
  }

  res.json(result);
}

export function removeMatch(req, res) {
  const id = Number(req.params.id);
  const deleted = deleteMatch(id);

  if (!deleted) {
    return res.status(404).json({ message: 'Match not found' });
  }

  res.status(204).send();
}