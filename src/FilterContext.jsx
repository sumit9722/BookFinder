import React, { createContext, useState } from 'react';

export const FilterContext = createContext();

export function FilterContextProvider({ children }) {
  const [filter, setFilter] = useState({
    fav : false,
    categories : [],
    subcategories : []
  })

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
}