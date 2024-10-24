'use client';

import Link from 'next/link';
import { MealCardTypes, userContextType } from '@/utils/types';
import { IoIosHeartEmpty } from 'react-icons/io';
import { IoIosHeart } from 'react-icons/io';
import { useUserContext } from '@/utils/contexts';
import { useEffect, useState } from 'react';

const MealCards = ({ name, id, image }: MealCardTypes) => {
  const { user, setUser } = useUserContext() as userContextType;
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    if (user && user.savedRecipes) {
      setLiked(user.savedRecipes.includes(id));
    }
  }, [user, id]);

  const handleClick = () => {
    if (user) {
      if (user.savedRecipes.includes(id)) {
        const unlikedRecipe = user.savedRecipes.filter(item => item !== id);
        user.savedRecipes = unlikedRecipe;
        setUser({ ...user });
        setLiked(false);
      } else {
        user.savedRecipes = [...user.savedRecipes, id];
        setUser({ ...user });
        setLiked(true);
      }
    }
  };
  return (
    <div
      className=" relative w-full boxShadow  felx items-centern rounded-[20px] justify-center "
      key={id}
    >
      <button
        onClick={handleClick}
        className="absolute right-3 mt-3 p-2 text-[34px] text-white bg-red-400 md:hover:bg-red-500 transition-all ease-in-out duration-300 rounded-[50px] "
      >
        {liked ? <IoIosHeart /> : <IoIosHeartEmpty />}
      </button>
      <Link
        className="flex flex-col items-center boxShadow cursor-pointer justify-between rounded-[20px] "
        href={`/recipe/${id}`}
      >
        <img
          className="rounded-[20px] "
          src={image}
          height="auto"
          width="100%"
        ></img>
        <span className="h-12 absolute text-xl w-full top-[70%] md:top-[70%] bottom-[20%] py-2 bg-[#4e9a5de1] text-white p-2 text-center flex justify-center items-center">
          {name.slice(0, 20) + '...'}
        </span>
      </Link>
    </div>
  );
};

export default MealCards;
