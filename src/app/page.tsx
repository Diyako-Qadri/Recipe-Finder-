'use client';
import RandomMeals from '@/components/RandomMeals';
import { useUserContext } from '@/utils/contexts';
import {  userContextType } from '@/utils/types';
import { RiRectangleFill } from "react-icons/ri";

export default function Home() {
  const { user } = useUserContext() as userContextType;

 
  return (
    <div className="">
      {user ? (
        <div className="relative p-1 s:p-6 flex flex-row items-center ml-3">
         <span className='text-[#4e9a5d] text-5xl '><RiRectangleFill /></span> 
          <span className="  border-[1px] py-[2.5px] px-4 border-[#4e9a5d]">{user.name}'s category </span>
        </div>
      ) : null}
      <RandomMeals/>
    </div>
  );
}
