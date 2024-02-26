import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { hostAPIs as url } from "./apiList";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const loginUser = async (userData) => {
    let formData = new FormData();
    formData.append("login", true);
    formData.append("username", userData.username);
    formData.append("password", userData.password);
    try {
      const response = await axios.post(url.login, formData);
      return response.data;
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      setCurrentUser(localStorage.getItem("currentUser"));
    }
  }, [currentUser]);

  const value = {
    currentUser,
    loginUser,
    setCurrentUser,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
