import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import matchesRouter from './routes/matches.routes.js';
import { hasMatches, initializeMatches } from './data/matches.firestore.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const FIXTURES_URL = 'https://v3.football.api-sports.io/fixtures?league=128&season=2024';
const localFrontendOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
const configuredOrigins = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = new Set([...localFrontendOrigins, ...configuredOrigins]);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Origin not allowed by CORS'));
    },
  })
);
app.use(express.json());
app.get('/', (req, res) => {
  res.json({
    name: 'Libertad e Pelota API',
    status: 'OK',
    version: '1.0.0',
    endpoints: {
      matches: '/api/matches',
    },
  });
});

app.use('/api', matchesRouter);

async function loadInitialMatches() {
  if (!process.env.API_KEY_FOOTBALL) {
    console.info('Skipping API-Football initial load: API_KEY_FOOTBALL is not configured.');
    return;
  }

  if (await hasMatches()) {
    console.info('Skipping API-Football initial load: Firestore already contains matches.');
    return;
  }

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

  await initializeMatches(matches);
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

loadInitialMatches().catch((error) => {
  console.error('Could not load initial matches from API-Football:', error.message);
});

