import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  // Load token from localStorage on initial render
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken && !token) {
      setToken(savedToken);
    }
  }, [token]);

  const contextValue = {
    token, 
    setToken, 
    selectedHostel, 
    setSelectedHostel, 
    userInfo, 
    setUserInfo,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

// Custom hook to access the store context
export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreContextProvider");
  }
  return context;
};
