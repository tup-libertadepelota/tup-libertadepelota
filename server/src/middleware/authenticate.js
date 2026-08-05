import { getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import '../config/firebase.js';

export async function authenticate(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Missing or invalid Authorization header',
    });
  }

  const token = authorizationHeader.slice('Bearer '.length).trim();

  if (!token) {
    return res.status(401).json({
      message: 'Missing bearer token',
    });
  }

  try {
    const firebaseApp = getApps()[0];

    if (!firebaseApp) {
      return res.status(401).json({
        message: 'Firebase Admin is not initialized',
      });
    }

    const decodedToken = await getAuth(firebaseApp).verifyIdToken(token);

    req.user = decodedToken;
    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token',
    });
  }
}