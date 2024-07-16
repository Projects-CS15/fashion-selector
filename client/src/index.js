// index.js

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme, customTheme } from './themes'; // Import the themes from the themes folder for Material-UI
import App from './components/App.jsx';
import React from 'react';
import { createRoot } from 'react-dom/client';

const theme = createTheme();

const root = createRoot(document.getElementById('root'));

// flag to enabel or diable dynamic theme switching
const enableThemeSwitching = false;

function themeApp() { // function to switch themes
  const [currentTheme, setCurrentTheme] = React.useState(lightTheme); // set the current theme to lightTheme by default and create a function to change the theme to the new theme



root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
}

 // // index.js

// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './components/App.jsx';
// import './style.css';

// const root = createRoot(document.getElementById('root'));
// root.render(<App />);
