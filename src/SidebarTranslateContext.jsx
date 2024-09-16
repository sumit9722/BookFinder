import React, { createContext, useState } from 'react';

export const SidebarTranslateContext = createContext();

export function SidebarTranslateProvider({ children }) {
  const [sidebarTranslateClass, setSidebarTranslateClass] = useState("")

  return (
    <SidebarTranslateContext.Provider value={{ sidebarTranslateClass, setSidebarTranslateClass }}>
      {children}
    </SidebarTranslateContext.Provider>
  );
}