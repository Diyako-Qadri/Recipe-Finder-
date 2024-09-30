'use client';
import { SetStateAction, useState } from 'react';
import { registeredUsers } from '@/utils/user';
import { userContextType, UserType } from '@/utils/types';
import { useUserContext } from '@/utils/contexts';
const LogIn = () => {
  const [userInput, setUserInput] = useState<string | null>(null);
  const {setUser} = useUserContext() as userContextType

  const handleChange = (e: {
    target: { value: SetStateAction<string | null> };
  }) => {
    setUserInput(e.target.value);
  };
  const handleClick = () => {
    const loggedInUser = registeredUsers.filter(
      (user: UserType) => user.name === userInput
    );
    if (loggedInUser.length) {
      console.log(loggedInUser[0]);
      setUser(loggedInUser[0])
    }
  };

  return (
    <div>
      sf
      <p>To log in please enter your user name</p>
      <label htmlFor="user-input">Enter User Name</label>
      <input type="text" id="user-input" onChange={handleChange} />
      <button onClick={handleClick}>Log in</button>
    </div>
  );
};

export default LogIn;
