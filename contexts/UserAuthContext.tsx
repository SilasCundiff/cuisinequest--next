import { createContext, useContext, ReactNode } from 'react';

const UserAuthContext = createContext(undefined);

type UserAuthProviderProps = {
  children: ReactNode;
  value: object;
};

const UserAuthProvider = (props: UserAuthProviderProps) => {
  const { value, children } = props;
  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
};

const useUserAuthContext = () => {
  const context = useContext(UserAuthContext);
  if (context === undefined) {
    throw new Error(
      'useUserAuthContext must be used within a UserAuthProvider'
    );
  }
  return context;
};

export { UserAuthProvider, useUserAuthContext };
