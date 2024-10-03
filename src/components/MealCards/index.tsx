'use client';

import Link from 'next/link';
import { MealCardTypes } from '@/utils/types';

const MealCards = ({ name, id, image }: MealCardTypes) => {
  return (
 
      <div
        className=" relative w-full boxShadow h-full  felx items-centern rounded-[20px] justify-center "
        key={id}
      >
        <Link
          className=" hover:scale-[1.02] transition-all origin-center overflow-hidden duration-500 ease-in-out flex flex-col items-center boxShadow cursor-pointer justify-between rounded-[20px] "
          href={`/recipe/${id}`}
        >
          <img
            className="rounded-[20px] "
            src={image}
            height="auto"
            width="100%"
          ></img>
          <span className="h-12 absolute text-xl w-full top-[70%] md:top-[70%] bottom-[20%] py-2 bg-[#4e9a5de1] text-white p-2 text-center flex justify-center items-center">
            {name.slice(0,20)+"..."}
          </span>
        </Link>
      </div>
   
  );
};

export default MealCards;
