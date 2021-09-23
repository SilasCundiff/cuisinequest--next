import { createContext, useContext, ReactNode } from 'react';

const SearchContext = createContext(undefined);

type SearchProviderProps = {
  children: ReactNode;
  value: object;
};

const SearchProvider = (props: SearchProviderProps) => {
  const { value, children } = props;
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};

export { SearchProvider, useSearchContext };
