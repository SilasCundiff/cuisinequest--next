import { useEffect, useState } from 'react';
import { auth, firestore, googleAuthProvider } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserData } from 'types';

export const useUserData = () : UserData => {

  const [user,loading, error] = useAuthState(auth);
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
      unsubscribe = userNamesRef.onSnapshot(async (doc) => {
        const {diet, favoritedRecipes, dislikedIngredients, intolerances} = doc.data()
        console.log(`favoritedRecipes in hooks`, favoritedRecipes)
        setFavoritedRecipes(favoritedRecipes);
        setDislikedIngredients(dislikedIngredients);
        setDiet(diet);
        setIntolerances(intolerances);
      });
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


export const signInWithGoogle = async () => {
  try {
    await auth.signInWithPopup(googleAuthProvider);
  } catch (err) {
    console.log(err);
  }
};