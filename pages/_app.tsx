import { useState } from 'react';
import '../styles/index.css';
import { UserProvider } from '@/contexts/UserContext';
import { SearchProvider } from '@/contexts/SearchContext';
import { RecipeListProvider } from '@/contexts/RecipeListContext';
import { dummyData } from '../testData/exampleSearchResponse';
import { useUserData } from '../lib/hooks';
import Nav from '@/components/Nav';
import GlobalStyle from '../styles/GlobalStyle';
import Footer from '@/components/Footer';
function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  const [currentSearch, setCurrentSearch] = useState({ query: 'Salad' });
  const [recipeList, setRecipeList] = useState(dummyData.results);

  return (
    <>
      <UserProvider value={{ ...userData }}>
        <SearchProvider value={{ search: currentSearch }}>
          <RecipeListProvider value={{ recipeList: recipeList }}>
            <GlobalStyle />
            <Nav />
            <Component {...pageProps} />
            <Footer />
          </RecipeListProvider>
        </SearchProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
