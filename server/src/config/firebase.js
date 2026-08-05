import 'dotenv/config';
import { applicationDefault, cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { existsSync, readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const currentDirectory = dirname(fileURLToPath(import.meta.url));

function getCredential() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    return cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT));
  }

  const localServiceAccountPath = resolve(
    currentDirectory,
    '../../config/firebase-service-account.json'
  );

  if (existsSync(localServiceAccountPath)) {
    return cert(JSON.parse(readFileSync(localServiceAccountPath, 'utf8')));
  }

  return applicationDefault();
}

// Evita inicializar Firebase más de una vez
const app =
  getApps().length === 0
    ? initializeApp({
        credential: getCredential(),
      })
    : getApps()[0];

const db = getFirestore(app);

export default db;
