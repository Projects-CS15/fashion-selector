import React from 'react';
import { useAuth } from './AuthContext';

const LoginStatus = () => {
  const { user } = useAuth();
  return (
    <div className="login-status">
      {user ? `Logged in as: ${user.user_metadata.first_name}` : 'Not logged in'}
    </div>
  );
};

export default LoginStatus;
