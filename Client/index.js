import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes'; 
import './index.css';
import { AuthProvider } from './Auth/AuthContext';
import AuthProviderDebugger from './Auth/AuthProviderDebugger'; 

const App = () => {
  return (
    <AuthProvider>
      <Routes />
      <AuthProviderDebugger />
    </AuthProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
