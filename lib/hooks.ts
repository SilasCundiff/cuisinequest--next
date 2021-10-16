import { useEffect, useState } from 'react';
import { auth, firestore, googleAuthProvider } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserData } from 'types';

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