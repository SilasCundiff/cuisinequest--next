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

  const [currentSearch, setCurrentSearch] = useState();
  const [previousSearch, setPreviousSearch] = useState();
  const [currentRecipeList, setCurrentRecipeList] = useState();
  const [previousRecipeList, setPreviousRecipeList] = useState();

  return (
    <>
      <UserProvider value={{ ...userData }}>
        <SearchProvider
          value={{
            currentSearch,
            setCurrentSearch,
            previousSearch,
            setPreviousSearch,
          }}
        >
          <RecipeListProvider
            value={{
              currentRecipeList,
              setCurrentRecipeList,
              previousRecipeList,
              setPreviousRecipeList,
            }}
          >
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
