import { createContext, useContext, ReactNode } from 'react';

const UserContext = createContext({ user: null, username: null });

type UserProviderProps = {
  children: ReactNode;
  value: {
    user: object;
    username: string;
  };
};

const UserProvider = (props: UserProviderProps) => {
  const { value, children } = props;

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
