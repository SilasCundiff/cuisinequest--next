import { FavoritesModule } from '@/components/PageComponents/FormModules/BuiltModules';
import { useUserContext } from '@/contexts/UserContext';

const UserDataForm = () => {
  const { user } = useUserContext();

  return <>{user && <FavoritesModule />}</>;
};

export default UserDataForm;
