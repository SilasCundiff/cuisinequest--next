import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/dist/client/router';
import debounce from 'lodash.debounce';
import { firestore } from '../lib/firebase';
import { useUserContext } from '@/contexts/UserContext';
import toast, { Toaster } from 'react-hot-toast';
import {
  IntolerancesModule,
  DietTypeModule,
  DislikedIngredientsModule,
  FavoritesModule,
} from '@/components/FormModules/BuiltModules';
import Container from './Containers/Container';
import { UsernameModule } from './FormModules/BuiltModules/UsernameModule';

const initialIntolerances = [
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
];

const successfulSave = () =>
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-green-600 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className='flex-1 w-0 p-4'>
        <div className='flex items-start'>
          <div className='ml-3 flex-1'>
            <p className='text-sm font-medium text-green-50'>Success!</p>
            <p className='mt-1 text-sm text-gray-100'>
              Your preferences are saved!
            </p>
          </div>
        </div>
      </div>
      <div className='flex'>
        <button
          onClick={() => toast.dismiss(t.id)}
          className='w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500'
        >
          Close
        </button>
      </div>
    </div>
  ));

const UserDataForm = () => {
  const {
    diet = 'unselected',
    intolerances = initialIntolerances,
    favoritedRecipes = [],
    dislikedIngredients = [],
    user,
    username,
  } = useUserContext();

  const router = useRouter();
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    checkUsername(usernameFormValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usernameFormValue]);

  const FirstLoginSubmit = async () => {
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
      intolerances: userIntolerances,
      diet: userDiet,
      dislikedIngredients: userDisliked,
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

  const DashboardSubmit = async () => {
    const usernameDoc = firestore.doc(`usernames/${username}`);

    const batch = firestore.batch();

    batch.update(usernameDoc, {
      intolerances: userIntolerances,
      diet: userDiet,
      dislikedIngredients: userDisliked,
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
    successfulSave();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (router.pathname === '/login') return FirstLoginSubmit();
    if (router.pathname === '/dashboard') return DashboardSubmit();
  };

  return (
    <Container>
      <Toaster position='bottom-center' />
      {user && (
        <form onSubmit={(e) => handleSubmit(e)}>
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
              userIntolerances={userIntolerances}
              setUserIntolerances={setUserIntolerances}
            />
            <DislikedIngredientsModule
              dislikedIngredients={userDisliked}
              setUserDisliked={setUserDisliked}
            />
            <DietTypeModule diet={userDiet} setUserDiet={setUserDiet} />
            {router.pathname === '/login' ? (
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
            ) : (
              <button
                className={`
             bg-green-500 hover:shadow-lg transition-all text-gray-50 text-4xl rounded p-4 max-w-md`}
                type='submit'
              >
                Save
              </button>
            )}
          </div>
        </form>
      )}
    </Container>
  );
};

export default UserDataForm;
