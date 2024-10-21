'use client';

import Header from '../Header';
import { useUserContext } from '@/utils/contexts';
import { userContextType } from '@/utils/types';
import LogIn from '../LogIn';
import { useState } from 'react';
import Footer from '../Footer';
import HeroMessage from '../HeroMessage';

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserContext() as userContextType;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const toggleLogin = () => {
    setIsLoggedIn(prevState => !prevState);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header LogIn={toggleLogin} />
      {!user && <HeroMessage />}
      <main className="flex-grow">
        {isLoggedIn && !user ? <LogIn /> : null}
        {user ? <section>{children}</section> : null}
      </main>
      <Footer />
    </div>
  );
};

export default LayoutWrapper;
