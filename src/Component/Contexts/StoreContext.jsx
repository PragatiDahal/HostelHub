import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
export const StoreContext = createContext(null);

// Context provider component to wrap the application and provide the context.
export const StoreContextProvider = (props) => {
  // Token state to store the user's authentication token.
  const [token, setToken] = useState("");
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken && !token) {
      setToken(savedToken);
    }
  }, [token]); // Dependency array should be empty // 

  const contextValue = {
    token, // User authentication token.
    setToken, // Function to update token.
  };
  return (
    // Providing context value to all child components.
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

// Custom hook to use the store context easily.
export const useStore = () => useContext(StoreContext);