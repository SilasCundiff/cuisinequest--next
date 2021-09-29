import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { useUserContext } from '@/contexts/UserContext';
import { useEffect, useState, useCallback, useContext } from 'react';
import debounce from 'lodash.debounce';

export default function Login(props) {
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

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
};

const SignOutButton = () => {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
};

const UsernameForm = () => {
  const [formValue, setFormValue] = useState('');
  const [dietFormValue, setDietFormValue] = useState('');

  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, username } = useUserContext();

  const onSubmit = async (e) => {
    e.preventDefault();

    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);
    const favoriteRecipes = firestore
      .doc(`usernames/${formValue}`)
      .collection('/favoriteRecipes')
      .doc('/0');
    const dislikedIngredients = firestore
      .doc(`usernames/${formValue}`)
      .collection('/dislikedIngredients')
      .doc('/0');

    const batch = firestore.batch();

    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, {
      uid: user.uid,
      intolerances: ['dairy', 'egg', 'wheat'],
      diet: dietFormValue,
    });
    batch.set(favoriteRecipes, {
      recipeId: 637898,
      title: 'Chicken and Dumpling Soup',
      imgLink: 'https://spoonacular.com/recipeImages/637898-556x370.jpg',
    });
    batch.set(dislikedIngredients, {
      id: 9040,
      title: 'banana',
      imgLink: 'bananas.jpg',
    });
    console.log(
      'batch, usernameDoc, userDoc :>> ',
      batch,
      usernameDoc,
      userDoc
    );
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
  const onChange2 = (e) => {
    const value = e.target.value.toLowerCase();
    setDietFormValue(value);
  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        console.log('Firestore read executed!');
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
          <input
            type='text'
            name='diet'
            placeholder='diet'
            value={dietFormValue}
            onChange={onChange2}
          />
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
