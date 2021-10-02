import { useEffect, useState } from 'react';
import { auth, firestore } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserData } from 'types';

export const useUserData = () : UserData => {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState();
  const [diet, setDiet] = useState(undefined);
  const [intolerances, setIntolerances] = useState(undefined);
  const [favoritedRecipes, setFavoritedRecipes] = useState(undefined);
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
      unsubscribe = userNamesRef.onSnapshot((doc) => {
        setFavoritedRecipes(doc.data()?.favoritedRecipes);
        setDislikedIngredients(doc.data()?.dislikedIngredients);
        setDiet(doc.data()?.diet);
        setIntolerances(doc.data()?.intolerances);
      });
    } else {
      setFavoritedRecipes(undefined);
      setDislikedIngredients(undefined);
      setDiet(undefined);
      setIntolerances(undefined);
    }
    return unsubscribe;
  }, [username]);

  return {
    user,
    username,
    favoritedRecipes,
    intolerances,
    dislikedIngredients,
    diet,
  };
};
