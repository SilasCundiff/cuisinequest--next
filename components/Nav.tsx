import { auth } from '../lib/firebase';
import { useUserContext } from '@/contexts/UserContext';
import Link from 'next/link';
import Logo from '@/components/Logo/Logo';

import { useRouter } from 'next/dist/client/router';
import RecipeNavSearch from './RecipeSearchForm';

const Nav = () => {
  const { user } = useUserContext();
  const router = useRouter();
  const signOut = () => auth.signOut();

  return (
    <nav className='fixed inset-0 flex h-32 pt-4 px-6 z-50'>
      <div className='max-w-1/6 min-w-1/6'>
        <Link passHref href='/'>
          <a>
            <Logo className='' />
          </a>
        </Link>
      </div>

      <div className='mx-auto mt-auto min-w-1/2'>
        <RecipeNavSearch />
      </div>
      <div className='buttonContainer ml-auto mt-auto mb-6'>
        {user ? (
          <>
            <LinkButton
              className='text-green-400 hover:text-green-500'
              path='/dashboard'
              onClick={signOut}
              type='button'
            >
              Logout
            </LinkButton>
            <LinkButton
              className={` hover:text-green-500 ${
                router.pathname === '/' ? 'text-gray-50' : 'text-gray-700'
              }`}
              path='/dashboard'
              type='link'
            >
              Dashboard
            </LinkButton>
          </>
        ) : (
          <>
            {router.pathname !== '/login' && (
              <LinkButton
                className='text-green-400 hover:text-green-500'
                path='/login'
                type='link'
              >
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
