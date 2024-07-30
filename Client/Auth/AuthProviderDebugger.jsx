import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAuth } from './AuthContext'; // Adjust the path as needed

const style = {
  position: 'fixed',
  bottom: '10px',
  right: '10px',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
  zIndex: 1000,
  overflow: 'auto',
  maxHeight: '50vh',
};

const AuthProviderDebugger = () => {
  const { user, session, avatarUrl } = useAuth();

  return (
    <Box sx={style}>
      <Typography variant="h6" component="h2">
        AuthContext Debug Info
      </Typography>
      <Box sx={{ mt: 2 }}>
        <pre>{JSON.stringify({ user, session, avatarUrl }, null, 2)}</pre>
      </Box>
    </Box>
  );
};

export default AuthProviderDebugger;
 