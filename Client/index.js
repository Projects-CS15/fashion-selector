import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes'; // Assuming this is your main routing component
import './index.css';
import { AuthProvider } from './Auth/AuthContext';
import AuthProviderDebugger from './Auth/AuthProviderDebugger'; // Adjust the path as needed

const App = () => {
  return (
    <AuthProvider>
      <Routes />
      <AuthProviderDebugger />
    </AuthProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
