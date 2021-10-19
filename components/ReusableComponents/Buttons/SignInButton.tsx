import Container from '@/components/ReusableComponents/Containers/Container';
import { useSignInWithGoogle } from '@/lib/hooks/';
import Image from 'next/image';
export const SignInButton = () => {
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
          onClick={useSignInWithGoogle}
        >
          <span className='mr-2 flex justify-center items-center'>
            <Image layout='fixed' width='28' height='28' src='/google.png' alt="google's logo" />
          </span>
          Sign in with Google
        </button>
      </div>
    </Container>
  );
};
