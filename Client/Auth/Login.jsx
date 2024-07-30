import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useAuth } from './AuthContext';
import AuthNavigationButton from './AuthNavigationButton';
import '../styles/AuthForm.css';

/**
 * User-side functionality for existing user at login and route path
 * @returns 
 */
const Login = () => {
  /**
   * local state for email, password, loading
   */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const history = useHistory();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/login', { email, password });
      const { user, session } = response.data;
      login(user, session);
      setSnackbar({ open: true, message: 'Login successful', severity: 'success' });
      setTimeout(() => {
        history.push('/search');
      }, 1200); 
    } catch (error) {
      setSnackbar({ open: true, message: 'Login failed', severity: 'error' });
      console.error('AxiosError:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <Typography variant="h4" style={{ marginBottom: '1rem' }}>Login</Typography>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" disabled={loading}>Login</button>
        </form>
        {loading && (
          <div className="center-loading">
            <CircularProgress />
          </div>
        )}
      </div>
      <AuthNavigationButton navigateTo="/signup" label="Don't have an account? Sign-Up" />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Center the Snackbar at the top
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
