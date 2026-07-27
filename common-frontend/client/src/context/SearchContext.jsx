import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchContext = createContext({ query: '', setQuery: () => {} });

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    setQuery('');
  }, [location.pathname]);

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
