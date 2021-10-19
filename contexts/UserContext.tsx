import { createContext, useContext, ReactNode } from 'react';
import { UserData } from '@/types/';

interface UserProviderProps {
  children: ReactNode;
  value: UserData;
}

const UserContext = createContext<UserData | null>(null);

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
