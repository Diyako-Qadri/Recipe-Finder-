'use client';
import RandomMeals from '@/components/RandomMeals';
import { useUserContext } from '@/utils/contexts';
import { userContextType } from '@/utils/types';
import { RiRectangleFill } from 'react-icons/ri';
import HeroMessage from '@/components/HeroMessage';

export default function Home() {
  const { user } = useUserContext() as userContextType;

  return (
    <div className="w-full max-w-[1280px] m-auto">
      <HeroMessage />
      {user ? (
        <div className="relative p-1 s:p-6 flex flex-row max-w-[1280px] w-full items-center ml-3">
          <span className="text-[#4e9a5d] text-5xl flex items-center  ">
            <RiRectangleFill />
            <span className="text-xl  border-[1px] py-[1px]  px-4 border-[#4e9a5d]">
              {user.name}'s category
            </span>
          </span>
        </div>
      ) : null}
      <RandomMeals />
    </div>
  );
}
