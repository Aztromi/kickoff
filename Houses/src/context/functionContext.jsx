import React from "react";
import React, { useContext, useEffect, useState } from "react";
const FunctionContext = React.createContext();

export function useFunction() {
  return useContext(FunctionContext);
}
export function FunctionProvider({ children }) {
  function caps(string) {
    return string.toLowerCase();
  }
  const value = { 
    caps, 
};
  return (
    <FunctionContext.Provider value={value}>
      {children}
    </FunctionContext.Provider>
  );
}
