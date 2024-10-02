"use client"

import Header from "../Header";
import { useUserContext } from '@/utils/contexts';
import { userContextType } from '@/utils/types';
import LogIn from "../LogIn";
import { useState } from "react";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    const { user } = useUserContext() as userContextType;
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const toggleLogin = () => {
        setIsLoggedIn(prevState => !prevState);
      };
     
    return (
        <div>
          <Header LogIn={toggleLogin}/>
          {isLoggedIn && !user ? 
          <LogIn/> : null}
          {user ? <section>{children}</section> : null}
        </div>
    )
};

export default LayoutWrapper
