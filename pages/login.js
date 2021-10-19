import { useEffect } from 'react';
import FirstLoginForm from '@/components/PageComponents/FirstLoginForm';
import { SignInButton } from '@/components/ReusableComponents/Buttons/SignInButton';
import Container from '@/components/ReusableComponents/Containers/Container';
import { useUserContext } from '@/contexts/index';
import Router from 'next/router';

export default function Login() {
  const { user, username } = useUserContext();

  useEffect(() => {
    if (user && username) Router.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return <Container>{user && username === undefined ? <FirstLoginForm /> : <SignInButton />}</Container>;
}
