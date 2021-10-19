import { useEffect, useState } from 'react';
import { successfulSave } from '@/components/GlobalComponents/Toaster/ToasterConfig';
import { useUserContext } from '@/contexts/UserContext';
import {  firestore } from '@/lib/firebase';



export const useRemoveFavorite = () => {
  const { favoriteRecipes, username } = useUserContext();

  const [userFavorites, setUserFavorites] = useState(favoriteRecipes || []);

  const removeFromFavorites = (id: number) => {
    if (userFavorites && userFavorites.length > 0) {
      const filteredArray = userFavorites.filter((recipe) => recipe.recipeId !== id); 
      RemoveFavorite(filteredArray);
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
  }, [favoriteRecipes]);

  return { userFavorites, RemoveFavorite, removeFromFavorites };
};