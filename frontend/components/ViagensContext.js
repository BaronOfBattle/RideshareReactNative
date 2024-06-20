import React, { createContext, useState } from 'react';

export const ViagemContext = createContext();

export const ViagemProvider = ({ children }) => {
  const [viagem, setViagem] = useState(null);

  return (
    <ViagemContext.Provider value={{ viagem, setViagem }}>
      {children}
    </ViagemContext.Provider>
  );
};
