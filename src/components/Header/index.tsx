'use client';

import { useUserContext } from '@/utils/contexts';
import { userContextType } from '@/utils/types';

import { CiFaceSmile } from 'react-icons/ci';
import Menu from '../Menu';
import logo from '../../../public/headerlogo.png';
import Image from 'next/image';
type HeaderProps = {
  LogIn: () => void;
};

const Header = ({ LogIn }: HeaderProps) => {
  const { user, setUser } = useUserContext() as userContextType;

  return (
    <header className=" flex fixed z-30  flex-col bg-[#4e9a5d] items-center transition-transform transform ease-in-out duration-700 justify-between w-full text-center">
      <div className="flex px-3 text-white flex-row justify-between w-full items-center max-w-[1280px] ">
        <Image src={logo} height={80} alt="logo" width={90}></Image>
        {user ? (
          <div className="flex flex-row justify-end items-center border-b-[1px] border-[#4e9a5d] w-full ">
            <div className="flex p-2 w-full flex-row justify-end">
              <Menu />
            </div>
          </div>
        ) : null}
        {!user ? (
          <div
            onClick={() => LogIn()}
            className="text-3xl flex w-[85px] flex-col items-center"
          >
            <CiFaceSmile />

            <p className="hidden md:flex text-base">Log in</p>
          </div>
        ) : (
          <div
            onClick={() => setUser(null)}
            className="text-3xl flex w-[85px] flex-col items-center"
          >
            <CiFaceSmile />

            <p className="hidden md:flex text-base">Log out</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
