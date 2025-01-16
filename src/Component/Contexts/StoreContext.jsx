import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [token, setToken] = useState("");
  // const [selectedHostel, setSelectedHostel] = useState(null);
  // const [userInfo, setUserInfo] = useState({});

  // Load token from localStorage on initial render
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    console.log(savedToken); // Logging the token for debugging.
    setToken(savedToken); // Set the token in state.
  }, [token]);

   // State for storing delivery information for an order.
   const [BookingInfo, setBookingInfo] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const contextValue = {
    token, 
    setToken,
    BookingInfo,
    setBookingInfo,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};


// Custom hook to use the store context easily.
export const useStore = () => useContext(StoreContext);
