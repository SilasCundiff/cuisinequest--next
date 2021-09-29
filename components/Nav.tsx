import { auth } from '../lib/firebase';
import { useUserContext } from '@/contexts/UserContext';
import Link from 'next/link';
const Nav = () => {
  const { user } = useUserContext();
  return (
    <div>{user ? <SignOutButton /> : <Link href='/login'>Login</Link>}</div>
  );
};
const SignOutButton = () => {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
};
export default Nav;
