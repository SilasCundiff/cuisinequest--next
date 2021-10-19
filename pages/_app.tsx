import { useState } from 'react';
import Nav from '@/components/GlobalComponents/Nav';
import Footer from '@/components/GlobalComponents/Footer';
import { UserProvider, RecipeListProvider, SearchProvider } from '@/contexts/index';
import { useUserData } from '@/lib/hooks';
import GlobalStyle from '@/styles/GlobalStyle';
import '@/styles/index.css';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  const [currentSearch, setCurrentSearch] = useState();
  const [previousSearch, setPreviousSearch] = useState();
  const [currentRecipeList, setCurrentRecipeList] = useState();
  const [previousRecipeList, setPreviousRecipeList] = useState();
  const [loadingRecipes, setLoadingRecipes] = useState(false);

  const [term, setTerm] = useState();

  return (
    <>
      <UserProvider value={{ ...userData }}>
        <SearchProvider
          value={{
            currentSearch,
            setCurrentSearch,
            previousSearch,
            setPreviousSearch,
            term,
            setTerm,
          }}
        >
          <RecipeListProvider
            value={{
              currentRecipeList,
              setCurrentRecipeList,
              previousRecipeList,
              setPreviousRecipeList,
              loadingRecipes,
              setLoadingRecipes,
            }}
          >
            <GlobalStyle />
            <Nav />
            <div className='min-h-screen min-w-screen'>
              <Component {...pageProps} />
            </div>
            <Toaster position='bottom-center' />
            <Footer />
          </RecipeListProvider>
        </SearchProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
