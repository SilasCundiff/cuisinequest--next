import { useEffect } from 'react';
import Container from '@/components/Containers/Container';
import DashboardForm from '@/components/DashboardForm';
import { useUserContext } from '@/contexts/UserContext';
import FavoritesForm from '@/components/FavoritesForm';
import Router from 'next/router';

const Dashboard = () => {
  const { user, username } = useUserContext();

  useEffect(() => {
    if (user && !username) Router.push('/login');
  }, [user, username]);

  return (
    <Container className='mt-80'>
      {user && username ? (
        <>
          <FavoritesForm />
          <DashboardForm />
        </>
      ) : (
        <div>please login</div>
      )}
    </Container>
  );
};

export default Dashboard;
