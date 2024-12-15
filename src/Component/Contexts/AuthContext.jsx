import React, { createContext, useState, useContext, useEffect } from "react";

// Create AuthContext
const AuthContext = createContext();

// Custom hook to access the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  // Load token and user info from localStorage on initial render
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUserInfo = localStorage.getItem("userInfo");

    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
    }

    if (storedUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        setUserInfo(parsedUserInfo);
      } catch (error) {
        console.error("Failed to parse userInfo from localStorage:", error);
      }
    }
  }, []);

  // Login method
  const login = (newToken, newUserInfo) => {
    setIsLoggedIn(true);
    setToken(newToken);
    setUserInfo(newUserInfo);

    // Store token and user info in localStorage
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
  };

  // Logout method
  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
    setUserInfo({});
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        userInfo,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
