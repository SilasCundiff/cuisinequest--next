import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { useUserContext } from '@/contexts/UserContext';
import { useEffect, useState, useCallback } from 'react';
import { DietSelect } from '@/components/Select/DietSelect';
import debounce from 'lodash.debounce';
import Link from 'next/link';
export default function Login() {
  const { user, username } = useUserContext();

  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}

const SignInButton = () => {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <button
      className='font-semibold px-4 py-3 rounded text-md bg-gray-200 hover:bg-gray-300 text-gray-700 m-4 flex items-center text-xl '
      onClick={signInWithGoogle}
    >
      <img src='google.png' className='w-10 mr-4' alt="google's logo" />
      Sign in with Google
    </button>
  );
};

const SignOutButton = () => {
  return (
    <button>
      <Link href='/'>Home</Link>
    </button>
  );
};

const UsernameForm = () => {
  const [formValue, setFormValue] = useState('');
  const [dietFormValue, setDietFormValue] = useState('unselected');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useUserContext();

  const onSubmit = async (e) => {
    e.preventDefault();

    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    const batch = firestore.batch();

    batch.set(userDoc, {
      username: formValue,
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
        { name: 'shellfish', avoid: true },
        { name: 'soy', avoid: false },
        { name: 'sulfite', avoid: false },
        { name: 'tree_nut', avoid: false },
        { name: 'wheat', avoid: true },
      ],
      diet: dietFormValue,
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

  const onChange = (e) => {
    const value = e.target.value.toLowerCase();
    const regex = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (value.length < 3) {
      setFormValue(value);
      setLoading(false);
      setIsValid(false);
    }

    if (regex.test(value)) {
      setFormValue(value);
      setLoading(true);
      setIsValid(false);
    }
  };

  const handleChange = (e) => {
    setDietFormValue(e.target.value);
  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

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

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input
            name='username'
            placeholder='myname'
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />

          <DietSelect handleChange={handleChange} diet={dietFormValue} />
          <button type='submit' disabled={!isValid}>
            Choose
          </button>
        </form>
      </section>
    )
  );
};

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p>{username} is available!</p>;
  } else if (username && !isValid) {
    return <p>That username is taken!</p>;
  } else {
    return <p></p>;
  }
}
