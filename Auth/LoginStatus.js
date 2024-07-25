import React from 'react';
import { useAuth } from './AuthContext';

const LoginStatus = () => {
  const { user } = useAuth();
  return (
    <div className="login-status">
      {user ? `Logged in as: ${user.username}` : 'Not logged in'}
    </div>
  );
};

export default LoginStatus;
