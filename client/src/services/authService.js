import { onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase_config.js';

function mapFirebaseUser(firebaseUser) {
  if (!firebaseUser) return null;

  return {
    email: firebaseUser.email || '',
    name: firebaseUser.displayName || firebaseUser.email,
    picture: firebaseUser.photoURL || '',
  };
}

export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, (firebaseUser) => {
    callback(mapFirebaseUser(firebaseUser));
  });
}

export function logoutUser() {
  return firebaseSignOut(auth);
}

export async function loginWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}
export async function getCurrentUserToken() {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    return null;
  }

  return currentUser.getIdToken();
}
