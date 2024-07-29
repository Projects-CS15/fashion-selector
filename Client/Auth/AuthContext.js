import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Context object created
 */
const AuthContext = createContext();

/**
 * Functional component that will use the Provider functionality in the AuthContext to 
 * share the state and functions with child components. 
 * AuthContext : { ..., Provider: {the auth state}}
 * @param {*} children deconstructed prop - refers to any nested components wrapped by AuthProvider
 * in the virtual DOM (see client/index.js)
 * @returns 
 */
export const AuthProvider = ({ children }) => {
  
  /**
   * State variables and setters for holding top level authentication information 
   */
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * sessionStorage does not persist beyond the current session,
   * only accessible in the same window/tab and cleared when either closed.
   * Stored in memory on web browser, not written to disk like cookies
   */
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    const storedSession = JSON.parse(sessionStorage.getItem('session'));
    const storedAvatarUrl = sessionStorage.getItem('avatarUrl');
    if (storedUser) {
      setUser(storedUser);
    }
    if (storedSession) {
      setSession(storedSession);
    }
    if (storedAvatarUrl) {
      setAvatarUrl(storedAvatarUrl);
    }
    setLoading(false);  // Indicates that the data fetching has completed
  }, []);

  /**
   * Async function that makes a request 
   * @param {*} user 
   * @param {*} session 
   */
  const login = async (user, session) => {
    setUser(user);
    setSession(session);
    fetchAvatarUrl(user.id);
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('session', JSON.stringify(session));
  };

  const fetchAvatarUrl = async (userId) => {
    try {
      const response = await axios.get(`/api/user-profile/${userId}`);
      const avatarUrl = response.data.avatar_url;
      setAvatarUrl(avatarUrl);
      sessionStorage.setItem('avatarUrl', avatarUrl);
    } catch (error) {
      console.error('Error fetching avatar URL:', error);
    }
  };

  const logout = () => {
    setUser(null);
    setSession(null);
    setAvatarUrl(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('session');
    sessionStorage.removeItem('avatarUrl');
  };

  /**
   * Using React 
   */
  return (
    <AuthContext.Provider value={{ user, session, avatarUrl, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
