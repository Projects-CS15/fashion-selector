import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Button, Typography } from '@mui/material';
import '../styles/AuthForm.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      alert('Login successful');
      console.log(response.data);
      login(email); // Update the AuthContext with the logged-in user's email
      // history.push('/dashboard');
    } catch (error) {
      alert('Login failed');
      console.error('AxiosError:', error); // Add logging
    }
  };

  const navigateToSignup = () => {
    history.push('/signup');
  };

  return (
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
  );
};

export default Login;
