import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { firestore } from '../lib/firebase';
import { useUserContext } from '@/contexts/UserContext';
import { Toaster } from 'react-hot-toast';
import Module from '@/components/FormModules/Module';
import {
  IntolerancesModule,
  DietTypeModule,
  DislikedIngredientsModule,
} from '@/components/FormModules/BuiltModules';
import { UsernameModule } from './FormModules/BuiltModules/UsernameModule';
import { placeholderFavorites } from '../testData/placeholderFavorites';
import { initialIntolerances } from '@/lib/initializerData';
import { successfulSave } from './Toaster/ToasterConfig';

const FirstLoginForm = () => {
  const {
    diet = 'unselected',
    intolerances = initialIntolerances,
    dislikedIngredients = [],
    user,
  } = useUserContext();

  // Username Form state
  const [usernameFormValue, setUsernameFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isLongEnough, setIsLongEnough] = useState(true);
  const [isFirstTimePast3Chars, setIsFirstTimePast3Chars] = useState(true);
  const [loading, setLoading] = useState(false);

  // User Preferences state
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
      favoritedRecipes: placeholderFavorites,
    });

    await batch.commit();
    successfulSave('Welcome', 'Quest started!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    FirstLoginSubmit();
  };

  useEffect(() => {
    checkUsername(usernameFormValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usernameFormValue]);

  return (
    <>
      <Toaster position='bottom-center' />
      {user && (
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className='flex flex-col mx-auto '>
            <UsernameModule
              usernameFormValue={usernameFormValue}
              isValid={isValid}
              onChange={onChange}
              loading={loading}
              isFirstTimePast3Chars={isFirstTimePast3Chars}
              isLongEnough={isLongEnough}
            />
            <div>
              <h2 className='text-green-500 text-5xl font-light mb-4'>
                Set your preferences below.
              </h2>
              <p className='text-gray-400 text-3xl font-thin mb-2'>
                Eager to start your journey?
              </p>
              <p className='text-gray-400 text-3xl font-thin mb-32'>
                No worries, you can skip this next part and change your
                preferences later in the dashboard.
              </p>
            </div>
            <IntolerancesModule
              userIntolerances={userIntolerances}
              setUserIntolerances={setUserIntolerances}
            />
            <DislikedIngredientsModule
              dislikedIngredients={userDisliked}
              setUserDisliked={setUserDisliked}
            />
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
      )}
    </>
  );
};

export default FirstLoginForm;
