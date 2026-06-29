import { useEffect, useState } from 'react';
import * as Sentry from '@sentry/react';
import { subscribeToAuthChanges, logoutUser } from '../services/authService.js';
import { AuthContext } from './authContext.js';
import { trackEvent } from '../utils/analytics.js';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((nextUser) => {
      setUser(nextUser);
      setLoading(false);

      if (nextUser) {
        Sentry.setUser({ email: nextUser.email, username: nextUser.name });
      } else {
        Sentry.setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await logoutUser();
      Sentry.setUser(null);
      trackEvent('logout', { method: 'google' });
    } catch (error) {
      console.log(error);
    }
  };

  return <AuthContext.Provider value={{ user, loading, logout }}>{children}</AuthContext.Provider>;
}
