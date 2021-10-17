import { useUserContext } from '@/contexts/UserContext';

import { FavoritesModule } from '@/components/FormModules/BuiltModules';

const UserDataForm = () => {
  const { user } = useUserContext();

  return <>{user && <FavoritesModule />}</>;
};

export default UserDataForm;
