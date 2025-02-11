import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // On mount, check if token exists in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  // Login function to store the token
  const login = (userToken) => {
    localStorage.setItem("token", userToken); // Store the token in localStorage
    setToken(userToken);
    setIsLoggedIn(true);
  };

  // Logout function
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home page after logout
  };

  return (
      <AuthContext.Provider
        value={{ isLoggedIn, login, logout, token }}
      >
        {children}
      </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
