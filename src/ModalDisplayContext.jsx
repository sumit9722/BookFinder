import React, { createContext, useState } from 'react';

export const ModalDisplayContext = createContext();

export function ModalDisplayProvider({ children }) {
  const [ModalDisplayClass, setModalDisplayClass] = useState("modalscreen-invis")

  return (
    <ModalDisplayContext.Provider value={{ ModalDisplayClass, setModalDisplayClass }}>
      {children}
    </ModalDisplayContext.Provider>
  );
}