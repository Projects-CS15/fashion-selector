import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useAuth } from './AuthContext';
import AuthNavigationButton from '../components/AuthNavigationButton'; // Adjust the path as needed
import '../styles/AuthForm.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const location = useLocation();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      alert('Login successful');
      console.log(response.data);
      login(email); // Update the AuthContext with the logged-in user's email
      history.push('/search');
    } catch (error) {
      alert('Login failed');
      console.error('AxiosError:', error); // Add logging
    }
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
          <button type="submit">Login</button>
        </form>
      </div>
      {
        <AuthNavigationButton navigateTo="/signup" label="Don't have an account? Sign-Up" />
      }
    </div>
  );
};

export default Login;
