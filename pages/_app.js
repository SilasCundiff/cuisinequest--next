import { useState } from 'react';
import '../styles/index.css';
import { UserAuthProvider } from '@/contexts/UserAuthContext';
import { SearchProvider } from '@/contexts/SearchContext';
import { RecipeListProvider } from '@/contexts/RecipeListContext';

const dummyData = {
  results: [
    {
      id: 646512,
      title: 'Salmon Caesar Salad',
      image: 'https://spoonacular.com/recipeImages/646512-312x231.jpg',
      imageType: 'jpg',
    },
    {
      id: 638166,
      title: 'Chicken Liver Salad',
      image: 'https://spoonacular.com/recipeImages/638166-312x231.jpg',
      imageType: 'jpg',
    },
    {
      id: 1095697,
      title: '15-Minute Tamari Marinated Steak Salad ',
      image: 'https://spoonacular.com/recipeImages/1095697-312x231.jpg',
      imageType: 'jpg',
    },
    {
      id: 638550,
      title: 'Chili Chicken Salad',
      image: 'https://spoonacular.com/recipeImages/638550-312x231.jpg',
      imageType: 'jpg',
    },
    {
      id: 1095693,
      title: 'Raspberry Arugula Side Salad ',
      image: 'https://spoonacular.com/recipeImages/1095693-312x231.jpg',
      imageType: 'jpg',
    },
    {
      id: 650378,
      title: 'Curry Chicken Salad',
      image: 'https://spoonacular.com/recipeImages/650378-312x231.jpg',
      imageType: 'jpg',
    },
  ],
};

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
