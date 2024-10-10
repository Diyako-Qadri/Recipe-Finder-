'use client';
import MealCards from '@/components/MealCards';
import RandomMeals from '@/components/RandomMeals';
import { useUserContext } from '@/utils/contexts';
import { fetchRecipes } from '@/utils/functions';
import { MealCardTypes, userContextType } from '@/utils/types';
import { useEffect, useState } from 'react';
import { FaBowlFood } from 'react-icons/fa6';

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
    <div>
      <div className="flex items-center">
        {user ? (
          <div className="p-5 flex flex-col gap-4 w-full items-center md:items-start">
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
            <div>
              <h2>Saved recipe: </h2>
              <div className="grid m-auto w-full  s:grid-cols-2 lg:grid-cols-3 items-center justify-items-center h-full p-8 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)] max-w-[1280px]">
                {savedRecipe ? (
                  savedRecipe.map(meal => <MealCards key={meal.id} {...meal} />)
                ) : (
                  <div>Ingen recept sparade</div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {user ? (
        <div className="relative p-1 s:p-6 flex flex-row items-center ml-3">
          <span className="flex flex-row items-center gap-2  border-b-[2px] py-[2.5px] px-[2px] border-[#fe880af2]">
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
  );
};

export default Profile;
