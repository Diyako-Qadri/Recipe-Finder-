'use client';
import MealCards from '@/components/MealCards';
import RandomMeals from '@/components/RandomMeals';
import { useUserContext } from '@/utils/contexts';
import { fetchRecipes } from '@/utils/functions';
import { MealCardTypes, userContextType } from '@/utils/types';
import { useEffect, useState } from 'react';
import { FaBowlFood } from 'react-icons/fa6';
import { SlNotebook } from 'react-icons/sl';

const Profile = () => {
  const { user } = useUserContext() as userContextType;
  const [savedRecipe, setSavedRecipe] = useState<MealCardTypes[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.savedRecipes && user.savedRecipes.length > 0) {
        try {
          const recipeRequests = user.savedRecipes.map(recipe =>
            fetchRecipes({ endpoints: `lookup.php?i=${recipe}` })
          );

          const data = await Promise.all(recipeRequests);

          const recipes = data
            .map((response: any) => {
              const meal = response.meals ? response.meals[0] : null;
              return meal
                ? {
                    name: meal.strMeal,
                    id: meal.idMeal,
                    image: meal.strMealThumb,
                  }
                : null;
            })
            .filter(recipe => recipe !== null);

          setSavedRecipe(recipes);
        } catch (error) {
          console.error('Error fetching recipes:', error);
        }
      } else {
        setSavedRecipe(null);
      }
    };

    fetchData();
  }, [user?.savedRecipes]);

  return (
    <div className="pt-20">
      <div className="flex items-center">
        {user ? (
          <div className="p-5 flex flex-col gap-4 max-w-[1280px] m-auto w-full items-center md:items-start">
            <div className="flex flex-col md:flex-row gap-4">
              <img
                src={user.image}
                alt="user image"
                className="w-full md:w-[200px] h-auto rounded-[10px]"
              />
              <div className="flex flex-col gap-2">
                <p className="p-2 md:text-xl">Name: {user.name}</p>
                <p className="p-2 md:text-xl">
                  Favorite category: {user.category}
                </p>
                <p className="p-2 md:text-xl">Email: {user.email}</p>
              </div>
            </div>
            {user ? (
              <div className="relative p-1   w-full flex flex-row max-w-[1280px] border-b-[2px] border-[#4e9a5d] items-center ml-3">
                <span className="flex flex-row  items-center gap-2 max-w-[1280px]    py-[2.5px] px-[2px] ">
                  {' '}
                  <span className="text-[#fec30adb] text-[30px] ">
                    <SlNotebook />
                  </span>{' '}
                  Saved recipe:{' '}
                </span>
              </div>
            ) : null}

            <div className="grid relative m-auto w-full s:grid-cols-2 lg:grid-cols-3 justify-items-center h-full p-8 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)] max-w-[1280px]">
              {savedRecipe ? (
                savedRecipe.map(meal => <MealCards key={meal.id} {...meal} />)
              ) : (
                <div className="absolute w-full text-center ">
                  No recipes's saved
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
      <div className="p-5 flex flex-col gap-4 max-w-[1280px] m-auto w-full items-center md:items-start">
        {user ? (
          <div className="relative p-1 flex flex-row max-w-[1280px] w-full border-b-[2px] border-[#4e9a5d] items-center ml-3">
            <span className="flex flex-row items-center gap-2  py-[2.5px] px-[2px] ">
              {' '}
              <span className="text-[#fec30adb] text-[30px] ">
                <FaBowlFood />
              </span>{' '}
              Based on {user.name}'s category{' '}
            </span>
          </div>
        ) : null}
        <RandomMeals />
      </div>
    </div>
  );
};

export default Profile;
