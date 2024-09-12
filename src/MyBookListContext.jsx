import React, { createContext, useState } from 'react';

export const MyBookListContext = createContext();

export function MyBookListProvider({ children }) {
  const [myBookList, setMyBookList] = useState('Click on the "Add a Book" on the Navbar To Add a Book');

  return (
    <MyBookListContext.Provider value={{ myBookList, setMyBookList }}>
      {children}
    </MyBookListContext.Provider>
  );
}