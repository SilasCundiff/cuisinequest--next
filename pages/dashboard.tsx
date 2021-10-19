import { useEffect } from 'react';
import DashboardForm from '@/components/PageComponents/DashboardForm';
import FavoritesForm from '@/components/PageComponents/FavoritesForm';
import Container from '@/components/ReusableComponents/Containers/Container';
import { useUserContext } from '@/contexts/index';
import Router from 'next/router';

const Dashboard = () => {
  const { user, username } = useUserContext();

  useEffect(() => {
    if (user && !username) Router.push('/login');
    if (!user && !username) Router.push('/');
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
