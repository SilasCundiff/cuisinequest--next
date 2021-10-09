import { auth } from '../lib/firebase';
import { useUserContext } from '@/contexts/UserContext';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
const Nav = () => {
  const { user } = useUserContext();
  const router = useRouter();
  const signOut = () => auth.signOut();

  return (
    <nav className='flex w-full h-32 pb-8 pt-4 px-6'>
      <div className='logo text-5xl text-green-500 font-black my-auto'>
        <Link href='/'>CuisineQuest</Link>
      </div>
      <div className='searchBarPlaceholder w-1/3 h-10 bg-gray-300 rounded-lg ml-auto mr-auto my-auto'></div>
      <div className='buttonContainer ml-auto my-auto'>
        {user ? (
          <>
            <LinkButton
              className='text-green-500'
              path='/dashboard'
              onClick={signOut}
              type='button'
            >
              Logout
            </LinkButton>
            <LinkButton
              className='text-gray-900 hover:text-green-500'
              path='/dashboard'
              type='link'
            >
              Dashboard
            </LinkButton>
          </>
        ) : (
          <>
            {router.pathname !== '/login' && (
              <LinkButton className='text-green-500' path='/login' type='link'>
                Login
              </LinkButton>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

const LinkButton = ({
  path,
  children,
  className = '',
  onClick = undefined,
  type,
}) => {
  if (type === 'button')
    return (
      <button
        onClick={onClick}
        className={`font-semibold px-4 py-3 rounded text-md ${className}`}
      >
        {children}
      </button>
    );
  if (type === 'link')
    return (
      <button
        className={`font-semibold px-4 py-3 rounded text-md ${className}`}
      >
        <Link href={`${path}`}>{children}</Link>
      </button>
    );
};

export default Nav;
