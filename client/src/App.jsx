import React from 'react';
import './styles/index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { useAuth } from './hooks/useAuth.js';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Items from './pages/Items.jsx';
import Settings from './pages/Settings.jsx';
import AccountSettings from './pages/AccountSettings.jsx';

function App() {
  const { user, loading } = useAuth();
  if (loading) return null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route index element={<Items />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/account" element={<AccountSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
