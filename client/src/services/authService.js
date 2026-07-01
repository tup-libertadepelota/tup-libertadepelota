import {
  onAuthStateChanged,
  signInWithCredential,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { Capacitor } from '@capacitor/core';
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
  if (Capacitor.isNativePlatform()) {
    const result = await FirebaseAuthentication.signInWithGoogle();

    const credential = GoogleAuthProvider.credential(
      result.credential?.idToken,
      result.credential?.accessToken
    );

    return signInWithCredential(auth, credential);
  }

  return signInWithPopup(auth, googleProvider);
}
