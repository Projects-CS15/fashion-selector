import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Typography } from '@mui/material';
import AuthNavigationButton from '../components/AuthNavigationButton'; 
import '../styles/AuthForm.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`event ${e} happened - try to sign up with email ${email}`);
    console.log(password, firstName, lastName)
    try {
      console.log('trying to send request to signup')
      const response = await axios.post('/api/signup', { email, password, firstName, lastName });
      alert('Signup successful');
      history.push('/search');
      console.log(response.data);
    } catch (error) {
      alert('Signup failed');
      console.error('AxiosError:', error); // Add logging
    }
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
          <button type="submit">Signup</button>
        </form>
      </div>
      <AuthNavigationButton navigateTo="/login" label="Already Have an Account? Login" />
    </div>
  );
};

export default Signup;
