import { useState } from 'react';
import '../styles/index.css';
import { UserAuthProvider } from '@/contexts/UserAuthContext';
import { SearchProvider } from '@/contexts/SearchContext';
import { RecipeListProvider } from '@/contexts/RecipeListContext';
import { dummyData } from '../testData/exampleSearchResponse';

function MyApp({ Component, pageProps }) {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [currentSearch, setCurrentSearch] = useState({ query: 'Salad' });
  const [recipeList, setRecipeList] = useState(dummyData.results);

  const toggleAuthForDebugging = () => {
    setUserAuthenticated(!userAuthenticated);
  };

  return (
    <>
      <UserAuthProvider
        value={{ authenticated: userAuthenticated, toggleAuthForDebugging }}
      >
        <SearchProvider value={{ search: currentSearch }}>
          <RecipeListProvider value={{ recipeList: recipeList }}>
            <Component {...pageProps} />
          </RecipeListProvider>
        </SearchProvider>
      </UserAuthProvider>
    </>
  );
}

export default MyApp;
