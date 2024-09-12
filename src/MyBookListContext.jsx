import React, { createContext, useState } from 'react';

export const MyBookListContext = createContext();

export function MyBookListProvider({ children }) {
  const [myBookList, setMyBookList] = useState([]);

  return (
    <MyBookListContext.Provider value={{ myBookList, setMyBookList}}>
      {children}
    </MyBookListContext.Provider>
  );
}