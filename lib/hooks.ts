import { useEffect, useState } from 'react';
import { auth, firestore, googleAuthProvider } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserData } from 'types';
import { successfulSave } from '@/components/Toaster/ToasterConfig';
import { useUserContext } from '@/contexts/UserContext';

export const useUserData = () : UserData => {

  const [user] = useAuthState(auth);
  const [username, setUsername] = useState();

  const [diet, setDiet] = useState(undefined);
  const [intolerance, setIntolerance] = useState(undefined);
  const [favoriteRecipes, setFavoriteRecipes] = useState(undefined);
  const [dislikedIngredients, setDislikedIngredients] = useState(undefined);
  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = firestore.collection('users').doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
      });
     
    } else {
      setUsername(null);
    }
   
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    let unsubscribe;

    if (username) {
      const userNamesRef = firestore.collection('usernames').doc(username);
      unsubscribe = userNamesRef.onSnapshot(async (doc) => {
        const {diet, favoriteRecipes, dislikedIngredients, intolerance} = doc.data()
        setFavoriteRecipes(favoriteRecipes);
        setDislikedIngredients(dislikedIngredients);
        setDiet(diet);
        setIntolerance(intolerance);
      });
    } 
   
    return unsubscribe;
  }, [username]);



  return {
    user,
    username,
    favoriteRecipes,
    intolerance,
    dislikedIngredients,
    diet,
    setDiet,
    setIntolerance
  };
};


export const signInWithGoogle = async () => {
  try {
    await auth.signInWithPopup(googleAuthProvider);
  } catch (err) {
    console.log(err);
  }
};



export const useRemoveFavorite = () => {
  const { favoriteRecipes, username } = useUserContext();

  const [userFavorites, setUserFavorites] = useState(favoriteRecipes);

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


export const useAddFavorite = () => {
  const { favoriteRecipes, username } = useUserContext();

  const [userFavorites, setUserFavorites] = useState(favoriteRecipes);

  const addToFavorites = (id: number, title: string) => {
      const newRecipe = {recipeId: id, title};
      const updatedFavorites = userFavorites.unshift(newRecipe);
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