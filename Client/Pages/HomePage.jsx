import React from 'react';
import { useHistory } from 'react-router-dom';
import { Paper, Button, Typography } from '@mui/material';
import Login from '../Auth/Login'; // Adjust the path as needed

const HomePage = () => {
  const history = useHistory();

  const navigateToSignup = () => {
    history.push('/signup');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Login />
        <Button variant="contained" color="primary" onClick={navigateToSignup} style={{ marginTop: '20px' }}>
          Don't have an account? Sign-Up
        </Button>
    </div>
  );
};

export default HomePage;
