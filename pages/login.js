import { auth, googleAuthProvider } from '../lib/firebase';
import { useUserContext } from '@/contexts/UserContext';
import { useEffect } from 'react';
import UserDataForm from '@/components/UserDataForm';
import Router from 'next/router';
import Container from '@/components/Containers/Container';
export default function Login() {
  const { user, username } = useUserContext();

  useEffect(() => {
    if (user && username) Router.push('/');
  }, [user, username]);

  return <main>{user && !username ? <UserDataForm /> : <SignInButton />}</main>;
}

const SignInButton = () => {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <Container className='p-4 '>
      <div className='m-auto'>
        <h1
          className='text-5xl text-green-500 font-bold
        m-auto py-8 '
        >
          Login to unlock your quest!
        </h1>
        <button
          className='font-semibold px-4 py-3 rounded text-md bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center text-2xl my-6 '
          onClick={signInWithGoogle}
        >
          <img src='google.png' className='w-10 mr-4' alt="google's logo" />
          Sign in with Google
        </button>
      </div>
    </Container>
  );
};
