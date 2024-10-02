"use client";

import { useUserContext } from '@/utils/contexts';
import LogIn from '../LogIn';
import { userContextType } from '@/utils/types';
import Menu from '../Menu';

const LogInWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserContext() as userContextType;
  return (
    <div>
      {!user ? (
        <LogIn />
      ) : (
        <>
        <div>
          <Menu/>
          <p>Hi {user.name}</p>
          {children}
          </div>
        </>
      )}
    </div>
  );
};

export default LogInWrapper;
