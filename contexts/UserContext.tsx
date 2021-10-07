import { createContext, useContext, ReactNode } from 'react';
import { UserData } from '../types';

type UserContextProps = {
  user?:
    | {
        uid: number;
        photoURL: string;
        displayName: string;
      }
    | undefined;
  username?: string | undefined;
  diet?: string | undefined;
  intolerances?: object[] | undefined;
  favoritedRecipes?: object[] | undefined;
  dislikedIngredients?: object[] | undefined;
};

interface UserProviderProps {
  children: ReactNode;
  value: UserData;
}

const UserContext = createContext<UserContextProps | null>(null);

const UserProvider = ({ children, value }: UserProviderProps) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserAuthProvider');
  }
  return context;
};

export { UserProvider, useUserContext };
