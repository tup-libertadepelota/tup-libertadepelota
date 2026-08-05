import {
  getMatches,
  getMatchById,
  addMatch,
  replaceMatch,
  updateMatchActive,
  deleteMatch,
} from '../data/matches.firestore.js';

export async function getAllMatches(req, res) {
  try {
    const matches = await getMatches();
    res.json(matches);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getOneMatch(req, res) {
  try {
    const id = Number(req.params.id);
    const match = await getMatchById(id);

    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    res.json(match);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function createMatch(req, res) {
  try {
    const newMatch = {
      ...req.body,
      fixture: {
        ...req.body.fixture,
        id: req.body.fixture?.id || Date.now(),
      },
      active: req.body.active ?? true,
    };

    const createdMatch = await addMatch(newMatch);

    res.status(201).json(createdMatch);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function putMatch(req, res) {
  try {
    const id = Number(req.params.id);

    const replacedMatch = {
      ...req.body,
      fixture: {
        ...req.body.fixture,
        id,
      },
    };

    const result = await replaceMatch(id, replacedMatch);

    if (!result) {
      return res.status(404).json({ message: 'Match not found' });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function patchMatch(req, res) {
  try {
    const id = Number(req.params.id);
    const result = await updateMatchActive(id, req.body.active);

    if (!result) {
      return res.status(404).json({ message: 'Match not found' });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function removeMatch(req, res) {
  try {
    const id = Number(req.params.id);
    const deleted = await deleteMatch(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Match not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}