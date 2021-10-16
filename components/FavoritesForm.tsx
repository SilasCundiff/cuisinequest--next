import { useState, useEffect } from 'react';
import { firestore } from '../lib/firebase';
import { useUserContext } from '@/contexts/UserContext';
import { Toaster } from 'react-hot-toast';
import { FavoritesModule } from '@/components/FormModules/BuiltModules';
import { successfulSave } from './Toaster/ToasterConfig';
import { placeholderFavorites } from 'testData/placeholderFavorites';
const UserDataForm = () => {
  const { favoriteRecipes, user, username } = useUserContext();

  const [userFavorites, setUserFavorites] = useState(favoriteRecipes);
  // console.log(`username`, username, favoriteRecipes, userFavorites);
  const AddDummyFavorites = async () => {
    const usernameDoc = firestore.doc(`usernames/${username}`);
    try {
      await usernameDoc.update('favoriteRecipes', placeholderFavorites);
    } catch (e) {
      console.log(`e`, e);
    }
  };
  const RemoveFavorite = async (newFavorites) => {
    const usernameDoc = firestore.doc(`usernames/${username}`);
    try {
      await usernameDoc.update('favoriteRecipes', newFavorites);
    } catch (e) {
      console.log(`e`, e);
    }
    successfulSave('Recipe removed!', 'Favorite Recipes updated!');
  };

  useEffect(() => {
    setUserFavorites(favoriteRecipes);
  }, [username, favoriteRecipes]);

  return (
    <>
      <Toaster position='bottom-center' />
      {user && (
        <FavoritesModule
          favoriteRecipes={userFavorites}
          setUserFavorites={setUserFavorites}
          RemoveFavorite={RemoveFavorite}
        />
      )}
      <button onClick={AddDummyFavorites}>Refill Favorites for debugging</button>
    </>
  );
};

export default UserDataForm;
