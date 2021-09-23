import { createContext, useContext, ReactNode } from 'react';

const RecipeListContext = createContext(undefined);

type RecipeListProviderProps = {
  children: ReactNode;
  value: object;
};

const RecipeListProvider = (props: RecipeListProviderProps) => {
  const { value, children } = props;
  return (
    <RecipeListContext.Provider value={value}>
      {children}
    </RecipeListContext.Provider>
  );
};

const useRecipeListContext = () => {
  const context = useContext(RecipeListContext);
  if (context === undefined) {
    throw new Error(
      'useRecipeListContext must be used within a RecipeListProvider'
    );
  }
  return context;
};

export { RecipeListProvider, useRecipeListContext };
