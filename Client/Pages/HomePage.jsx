import React from 'react';
import { useHistory } from 'react-router-dom';
import { Paper, Button, Typography } from '@mui/material';
import ResponsiveAppBar from '../components/ResponsiveAppBar'; // Adjust the path as needed
import './HomePage.css'; // Ensure to retain or update any relevant styles

const Home = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/search');
  };

  return (
    <div style={{ backgroundColor: 'transparent', margin: '15px' }}>
      <ResponsiveAppBar />
      <div
        style={{
          backgroundColor: 'transparent',
          textAlign: 'center',
          padding: '1rem 10rem',
        }}
      >
        <Paper
          style={{
            position: 'relative',
            margin: '10px',
            transition: 'opacity 3s ease-in-out',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            padding: '1rem 10rem',
          }}
        >
          <div
            style={{
              height: '500px',
              opacity: 1,
              transition: 'opacity 3s ease-in-out',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={handleClick}
          >
            <Typography variant="h4">
              Welcome to the Fashion Selector
            </Typography>
          </div>
          <Typography variant="subtitle2" style={{ marginTop: '1rem' }}>
            Discover Your Style!
          </Typography>
          <br />
          <Button
            variant="contained"
            className="CheckButton"
            onClick={handleClick}
          >
            Get Started
          </Button>
        </Paper>
      </div>
    </div>
  );
};

export default Home;
