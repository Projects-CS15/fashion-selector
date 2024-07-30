import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useAuth } from './AuthContext';
import AuthNavigationButton from './AuthNavigationButton';
import '../styles/AuthForm.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const history = useHistory();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/signup', { email, password, firstName, lastName });
      const { user, session } = response.data;
      login(user, session);
      setTimeout(() => {
        setSnackbar({ open: true, message: 'Signup successful', severity: 'success' });
        setTimeout(() => {
          history.push('/search');
        }, 2000); // Redirect after 2 seconds to ensure the user sees the Snackbar
      }, 1000); // Ensure spinner shows for at least 1 second
    } catch (error) {
      setTimeout(() => {
        setSnackbar({ open: true, message: 'Signup failed', severity: 'error' });
      }, 1000); // Ensure spinner shows for at least 1 second
      console.error('AxiosError:', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000); // Ensure spinner shows for at least 1 second
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <Typography variant="h4" style={{ marginBottom: '1rem' }}>Signup</Typography>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <label>First Name:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          <label>Last Name:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          <button type="submit" disabled={loading}>Signup</button>
        </form>
        {loading && (
          <div className="center-loading">
            <CircularProgress />
          </div>
        )}
      </div>
      <AuthNavigationButton navigateTo="/login" label="Already Have an Account? Login" />
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

export default Signup;
