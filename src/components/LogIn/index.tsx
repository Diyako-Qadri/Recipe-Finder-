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
      setUser(loggedInUser[0]);
    }
  };

  return (
    <div className="flex fixed  w-[300px] flex-col bg-[#4e9a5d] gap-2 left-0 right-2 top-[6rem] m-auto pt-3 text-white z-30 abslute justify-center  items-center">
      <p>To log in please enter your user name</p>
      <label htmlFor="user-input">Enter User Name</label>
      <input
        className="max-w-[200px] border-[1px] rounded-sm border-black text-black"
        type="text"
        id="user-input"
        onChange={handleChange}
      />
      <div className='flex flex-col pb-2 gap-0 justify-center items-center'>
        <button
          className="bg-[#d76721] px-8 py-1 m-1 w-full  rounded-[20px]"
          onClick={handleClick}
        >
          Log In
        </button>
        <button
          className="bg-[#d76721] px-8 py-1 m-1 w-full rounded-[20px]"
          onClick={handleClick}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LogIn;
