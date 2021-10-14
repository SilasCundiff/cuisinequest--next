import { useUserContext } from '@/contexts/UserContext';
import { useEffect } from 'react';
import FirstLoginForm from '@/components/FirstLoginForm';
import Router from 'next/router';
import { SignInButton } from '@/components/Button/SignInButton';
import Container from '@/components/Containers/Container';
export default function Login() {
  const { user, username } = useUserContext();

  useEffect(() => {
    if (user && username) Router.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <Container>
      {user && username === undefined ? <FirstLoginForm /> : <SignInButton />}
    </Container>
  );
}
