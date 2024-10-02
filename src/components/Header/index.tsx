'use client';

import { useUserContext } from '@/utils/contexts';
import { userContextType } from '@/utils/types';
import { IoPersonOutline } from 'react-icons/io5';
import Menu from '../Menu';
import logo from '../../../public/headerlogo.png';
import Image from 'next/image';
type HeaderProps = {
  LogIn: () => void;
};

const Header = ({ LogIn }: HeaderProps) => {
  const { user, setUser } = useUserContext() as userContextType;

  return (
    <header className=" flex flex-col items-center transition-transform transform ease-in-out duration-700 justify-between w-full text-center  ">
      <div className="flex px-3 text-white flex-row bg-[#d05411] justify-between w-full items-center rounded-br-[16px] rounded-bl-[16px]">
        <Image src={logo} height={80} alt="logo" width={100}></Image>
       {!user ? <div
          onClick={() => LogIn()}
          className="text-3xl flex w-[65px] flex-col items-center"
        >
          <IoPersonOutline />
          <p className="hidden md:flex text-base">Log in</p>
        </div> : <div
          onClick={() => setUser(null)}
          className="text-3xl flex w-[65px] flex-col items-center"
        >
          <IoPersonOutline />
          <p className="hidden md:flex text-base">Log out</p>
        </div>} 
      </div>
      {user ? (
        <div className="flex flex-row justify-end items-center border-b-[1px] border-[#d05411] w-full ">
          <div className="flex p-2 w-full flex-row justify-around">
            <Menu />
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
