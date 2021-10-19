import { useEffect, useState } from 'react';
import { successfulSave } from '@/components/GlobalComponents/Toaster/ToasterConfig';
import { useUserContext } from '@/contexts/UserContext';
import { firestore,  } from '@/lib/firebase';


export const useAddFavorite = () => {
  const { favoriteRecipes, username } = useUserContext();
  const [userFavorites, setUserFavorites] = useState(favoriteRecipes || []);

  const addToFavorites = (id: number, title: string) => {
      const newRecipe = {recipeId: id, title};
      
      if (!userFavorites){
        const updatedFavorites = [newRecipe];
      AddFavorite(updatedFavorites);
        
      }
      const updatedFavorites = [...userFavorites, newRecipe];
      AddFavorite(updatedFavorites);
  };

  const AddFavorite = async (newFavorites) => {
    const usernameDoc = firestore.doc(`usernames/${username}`);
    try {
      await usernameDoc.update('favoriteRecipes', newFavorites);
    } catch (e) {
      console.log(`e`, e);
    }
    successfulSave('Recipe Added!', 'Favorite Recipes updated!');
  };

  useEffect(() => {
    setUserFavorites(favoriteRecipes);
  }, [favoriteRecipes]);

  return { userFavorites, AddFavorite, addToFavorites };
};