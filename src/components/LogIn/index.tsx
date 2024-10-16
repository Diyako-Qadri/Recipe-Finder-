'use client';
import { SetStateAction, useState } from 'react';
import { registeredUsers } from '@/utils/user';
import { userContextType, UserType } from '@/utils/types';
import { useUserContext } from '@/utils/contexts';
const LogIn = () => {
  const [userInput, setUserInput] = useState<string | null>(null);
  const { setUser } = useUserContext() as userContextType;

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
      setUser(loggedInUser[0]);
    }
  };

  return (
    <div className="flex w-full flex-col bg-[#4e9a5d] pt-36 relative justify-center  items-center">
        
        <p>To log in please enter your user name</p>
        <label htmlFor="user-input">Enter User Name</label>
        <input
          className="max-w-[200px] border-[1px] rounded-sm border-black text-black"
          type="text"
          id="user-input"
          onChange={handleChange}
        />
        <button
          className="bg-[#4e9a5d] px-8 py-1 m-3 rounded-[20px]"
          onClick={handleClick}
        >
          Log in
        </button>
    
    </div>
  );
};

export default LogIn;
