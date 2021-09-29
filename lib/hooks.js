import { useEffect, useState } from 'react';
import { auth, firestore } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const useUserData = () => {
  const [user] = useAuthState(auth);

  const [username, setUsername] = useState(null);
  const [diet, setDiet] = useState(null);
  const [intolerances, setIntolerances] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [dislikedIngredients, setDislikedIngredients] = useState([]);

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

      const favoriteRecipesRef = userNamesRef.collection('favoriteRecipes');

      const dislikedIngredients = userNamesRef.collection(
        'dislikedIngredients'
      );

      unsubscribe = userNamesRef.onSnapshot((doc) => {
        const recipes = [];
        const ingredients = [];

        favoriteRecipesRef.onSnapshot((snapshot) => {
          snapshot.forEach((doc) => recipes.push(doc.data()));
        });

        dislikedIngredients.onSnapshot((snapshot) => {
          snapshot.forEach((doc) => ingredients.push(doc.data()));
        });

        setFavoriteRecipes(recipes);
        setDislikedIngredients(ingredients);
        setDiet(doc.data()?.diet);
        setIntolerances(doc.data()?.intolerances);
      });
    } else {
      setFavoriteRecipes([]);
      setDislikedIngredients([]);
      setDiet(null);
      setIntolerances([]);
    }
    return unsubscribe;
  }, [username]);

  return {
    user,
    username,
    diet,
    intolerances,
    favoriteRecipes,
    dislikedIngredients,
  };
};
