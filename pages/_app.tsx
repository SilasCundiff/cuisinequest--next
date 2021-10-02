import { useState } from 'react';
import '../styles/index.css';
import { UserProvider } from '@/contexts/UserContext';
import { SearchProvider } from '@/contexts/SearchContext';
import { RecipeListProvider } from '@/contexts/RecipeListContext';
import { dummyData } from '../testData/exampleSearchResponse';
import { useUserData } from '../lib/hooks';
import Nav from '@/components/Nav';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  console.log('userData :>> ', userData);

  const [currentSearch, setCurrentSearch] = useState({ query: 'Salad' });
  const [recipeList, setRecipeList] = useState(dummyData.results);

  return (
    <>
      <UserProvider value={{ ...userData }}>
        <SearchProvider value={{ search: currentSearch }}>
          <RecipeListProvider value={{ recipeList: recipeList }}>
            <Nav />
            <Component {...pageProps} />
          </RecipeListProvider>
        </SearchProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
