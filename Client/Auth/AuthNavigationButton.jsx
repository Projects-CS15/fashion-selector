import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

const AuthNavigationButton = ({ navigateTo, label }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(navigateTo);
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick} style={{ marginTop: '20px' }}>
      {label}
    </Button>
  );
};

export default AuthNavigationButton;
