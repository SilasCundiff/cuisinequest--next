import { useState, useEffect } from 'react';
import { firestore } from '../lib/firebase';
import { useUserContext } from '@/contexts/UserContext';
import { Toaster } from 'react-hot-toast';
import { FavoritesModule } from '@/components/FormModules/BuiltModules';
import { successfulSave } from './Toaster/ToasterConfig';
import { placeholderFavorites } from 'testData/placeholderFavorites';
const UserDataForm = () => {
  const { favoritedRecipes, user, username } = useUserContext();

  const [userFavorited, setUserFavorited] = useState(favoritedRecipes);
  console.log(`username`, username, favoritedRecipes, userFavorited);
  const AddDummyFavorites = async () => {
    const usernameDoc = firestore.doc(`usernames/${username}`);
    try {
      await usernameDoc.update('favoritedRecipes', placeholderFavorites);
    } catch (e) {
      console.log(`e`, e);
    }
  };
  const RemoveFavorite = async (newFavorites) => {
    const usernameDoc = firestore.doc(`usernames/${username}`);
    try {
      await usernameDoc.update('favoritedRecipes', newFavorites);
    } catch (e) {
      console.log(`e`, e);
    }
    successfulSave('Recipe removed!', 'Favorite Recipes updated!');
  };

  useEffect(() => {
    setUserFavorited(favoritedRecipes);
  }, [username, favoritedRecipes]);

  return (
    <>
      <Toaster position='bottom-center' />
      {user && (
        <FavoritesModule
          favoritedRecipes={userFavorited}
          setUserFavorited={setUserFavorited}
          RemoveFavorite={RemoveFavorite}
        />
      )}
      <button onClick={AddDummyFavorites}>
        Refill Favorites for debugging
      </button>
    </>
  );
};

export default UserDataForm;
