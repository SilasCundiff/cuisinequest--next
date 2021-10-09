//! Example recipe image url
// https://spoonacular.com/recipeImages/{recipeID}-312x231.jpg

import { Container } from '@/components/FormModules/ModuleComponents';
import UserDataForm from '@/components/UserDataForm';
import { useUserContext } from '@/contexts/UserContext';
const Dashboard = () => {
  const { user } = useUserContext();
  return (
    <Container>
      {user ? <UserDataForm /> : <div>please login to view page</div>}
    </Container>
  );
};

export default Dashboard;
