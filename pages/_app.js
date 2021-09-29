import { useState } from 'react';
import '../styles/index.css';
import { UserProvider } from '@/contexts/UserContext';
import { SearchProvider } from '@/contexts/SearchContext';
import { RecipeListProvider } from '@/contexts/RecipeListContext';
import { dummyData } from '../testData/exampleSearchResponse';
import { useUserData } from '../lib/hooks';
import Nav from '@/components/Nav';

function MyApp({ Component, pageProps }) {
  const {
    user,
    username,
    diet,
    intolerances,
    favoriteRecipes,
    dislikedIngredients,
  } = useUserData();

  const [currentSearch, setCurrentSearch] = useState({ query: 'Salad' });
  const [recipeList, setRecipeList] = useState(dummyData.results);

  console.log(
    'userData :>>',
    username,
    diet,
    intolerances,
    favoriteRecipes,
    dislikedIngredients
  );

  return (
    <>
      <UserProvider value={{ user, username }}>
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
