import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { Toaster } from 'react-hot-toast';
import { firestore } from '../lib/firebase';
import { useUserContext } from '@/contexts/UserContext';
import { successfulSave } from '@/components/Toaster/ToasterConfig';
import {
  IntolerancesModule,
  DietTypeModule,
  DislikedIngredientsModule,
} from '@/components/FormModules/BuiltModules';
import { initialIntolerances } from '@/lib/initializerData';

const UserDataForm = () => {
  const {
    diet = 'unselected',
    intolerances = initialIntolerances,
    dislikedIngredients = [],
    user,
    username,
  } = useUserContext();

  const router = useRouter();

  const [userIntolerances, setUserIntolerances] = useState(intolerances);
  const [userDisliked, setUserDisliked] = useState(dislikedIngredients);
  const [userDiet, setUserDiet] = useState(diet);

  const DashboardSubmit = async () => {
    const usernameDoc = firestore.doc(`usernames/${username}`);

    const batch = firestore.batch();

    batch.update(usernameDoc, {
      intolerances: userIntolerances,
      diet: userDiet,
      dislikedIngredients: userDisliked,
    });

    await batch.commit();
    successfulSave('Success', 'Your preferences have been saved!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (router.pathname === '/dashboard') return DashboardSubmit();
  };

  return (
    <>
      <Toaster position='bottom-center' />
      {user && (
        <form
          className='flex flex-col mx-auto '
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
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
            className={`
             bg-green-500 hover:shadow-lg transition-all text-gray-50 text-4xl rounded p-4 max-w-md`}
            type='submit'
          >
            Save
          </button>
        </form>
      )}
    </>
  );
};

export default UserDataForm;
