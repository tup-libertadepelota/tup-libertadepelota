import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import matchesRouter from './routes/matches.routes.js';
import { setMatches } from './data/matches.memory.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const FIXTURES_URL = 'https://v3.football.api-sports.io/fixtures?league=128&season=2024';

app.use(cors());
app.use(express.json());

app.use('/api', matchesRouter);

async function loadInitialMatches() {
  const response = await fetch(FIXTURES_URL, {
    headers: {
      'x-apisports-key': process.env.API_KEY_FOOTBALL,
    },
  });

  if (!response.ok) {
    throw new Error('Error fetching matches from API-Football');
  }

  const data = await response.json();

  const matches = data.response.map((match) => ({
    ...match,
    active: true,
  }));

  setMatches(matches);
}

loadInitialMatches()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Could not start server:', error);
  });

