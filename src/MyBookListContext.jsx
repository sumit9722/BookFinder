import React, { createContext, useState, useEffect } from 'react';

export const MyBookListContext = createContext();

export function MyBookListProvider({ children }) {
  const [myBookList, setMyBookList] = useState([]);

  useEffect(()=>{
    const data = localStorage.getItem("booklist");
    if(data)
    {
        setMyBookList(JSON.parse(data));
      }
    
  },[]
  )

  return (
    <MyBookListContext.Provider value={{ myBookList, setMyBookList}}>
      {children}
    </MyBookListContext.Provider>
  );
}