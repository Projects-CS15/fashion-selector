import React, { createContext, useContext, useState } from 'react'; // import react and hooks

const AuthContext = createContext(); // create auth context


export const AuthProvider = ({ children }) => { // create auth provider component
  const [user, setUser] = useState(null); // state for user
   
  const login = (username) => { // login function
    setUser({ username }); // set user state
  };

  const logout = () => { // logout function
    setUser(null); // clear user state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}> 
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => { // custom hook to use auth context
  return useContext(AuthContext); // return auth context
};
