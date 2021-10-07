import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { firestore } from '../lib/firebase';
import { useUserContext } from '@/contexts/UserContext';
import {
  IntolerancesModule,
  DietTypeModule,
  DislikedIngredientsModule,
  FavoritesModule,
} from '@/components/FormModules/BuiltModules';
import Container from './Containers/Container';
import { UsernameModule } from './FormModules/BuiltModules/UsernameModule';

const UserDataForm = () => {
  const {
    diet,
    intolerances,
    favoritedRecipes,
    dislikedIngredients,
    user,
    username,
  } = useUserContext();

  // Username Form state
  const [usernameFormValue, setUsernameFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isLongEnough, setIsLongEnough] = useState(true);
  const [isFirstTimePast3Chars, setIsFirstTimePast3Chars] = useState(true);
  const [loading, setLoading] = useState(false);

  // User Preferences state
  const [userFavorited, setUserFavorited] = useState(favoritedRecipes);
  const [userIntolerances, setUserIntolerances] = useState(intolerances);
  const [userDisliked, setUserDisliked] = useState(dislikedIngredients);
  const [userDiet, setUserDiet] = useState(diet);

  const onChange = (e) => {
    const value = e.target.value;
    const regex = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    if (isFirstTimePast3Chars && value.length >= 3)
      setIsFirstTimePast3Chars(false);
    if (value.length < 3) {
      setUsernameFormValue(value);
      setLoading(false);
      setIsValid(false);
      if (!isFirstTimePast3Chars) setIsLongEnough(false);
    }

    if (regex.test(value)) {
      setUsernameFormValue(value);
      setLoading(true);
      setIsValid(false);
      setIsLongEnough(true);
    }
  };

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const userName = firestore.doc(`usernames/${username}`);
        const { exists } = await userName.get();
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    setUserFavorited(favoritedRecipes);
  }, [favoritedRecipes]);

  useEffect(() => {
    setUserIntolerances(intolerances);
  }, [intolerances]);

  useEffect(() => {
    setUserDisliked(dislikedIngredients);
  }, [dislikedIngredients]);

  useEffect(() => {
    setUserDiet(diet);
  }, [diet]);

  useEffect(() => {
    checkUsername(usernameFormValue);
  }, [usernameFormValue]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${usernameFormValue}`);

    const batch = firestore.batch();

    batch.set(userDoc, {
      username: usernameFormValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });

    batch.set(usernameDoc, {
      uid: user.uid,
      intolerances: [
        { name: 'dairy', avoid: false },
        { name: 'egg', avoid: false },
        { name: 'gluten', avoid: false },
        { name: 'grain', avoid: false },
        { name: 'peanut', avoid: false },
        { name: 'seafood', avoid: false },
        { name: 'sesame', avoid: false },
        { name: 'shellfish', avoid: false },
        { name: 'soy', avoid: false },
        { name: 'sulfite', avoid: false },
        { name: 'tree_nut', avoid: false },
        { name: 'wheat', avoid: false },
      ],
      diet: 'ketogenic',
      dislikedIngredients: [
        {
          id: 9040,
          title: 'banana',
          imageURL: 'bananas.jpg',
        },
        {
          id: 19400,
          title: 'banana chips',
          imageURL: 'banana-chips.jpg',
        },
        {
          id: 18019,
          title: 'banana bread',
          imageURL: 'banana-bread.jpg',
        },
      ],
      favoritedRecipes: [
        {
          recipeId: 1096010,
          title: 'Egg Salad Wrap',
        },
        {
          recipeId: 642240,
          title: 'Egg Salad Sandwiches With Tarragon',
        },
        {
          recipeId: 637898,
          title: 'Chicken and Dumpling Soup',
        },
        {
          recipeId: 643933,
          title: 'Fruid Salad Dressing',
        },
        {
          recipeId: 157106,
          title: 'Wedge Salad',
        },
      ],
    });

    await batch.commit();
  };

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <div className='flex flex-col mx-auto '>
          {username ? (
            <FavoritesModule favoritedRecipes={userFavorited} />
          ) : (
            <UsernameModule
              usernameFormValue={usernameFormValue}
              isValid={isValid}
              onChange={onChange}
              loading={loading}
              isFirstTimePast3Chars={isFirstTimePast3Chars}
              isLongEnough={isLongEnough}
            />
          )}

          <IntolerancesModule
            setUserIntolerances={setUserIntolerances}
            userIntolerances={userIntolerances}
          />
          <DislikedIngredientsModule dislikedIngredients={userDisliked} />
          <DietTypeModule diet={userDiet} setUserDiet={setUserDiet} />
          <button
            className={`${
              isValid
                ? 'bg-green-500 hover:shadow-lg transition-all'
                : 'bg-red-300'
            } text-gray-50 text-4xl rounded p-4 max-w-md`}
            type='submit'
            disabled={!isValid}
          >
            {isValid ? 'Save' : 'Check username'}
          </button>
        </div>
      </form>
    </Container>
  );
};

export default UserDataForm;
