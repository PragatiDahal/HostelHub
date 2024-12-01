import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // Check for a token in localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  // Login function: save token to localStorage and update state
  const login = () => {
    setIsLoggedIn(true);
  };

  // Logout function: clear token from localStorage and reset state
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home page after logging out
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, token }}>
      {console.log("AuthContext value:", { isLoggedIn, login, logout, token })}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);}