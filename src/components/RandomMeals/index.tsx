'use client';

import { useUserContext } from '@/utils/contexts';
import { MealCardTypes, userContextType } from '@/utils/types';
import { useEffect, useState, useRef } from 'react';
import { fetchRecipes } from '@/utils/functions';
import MealCards from '../MealCards';
import { RiRectangleFill } from 'react-icons/ri';

const RandomMeals = () => {
  const { user } = useUserContext() as userContextType;
  const [recipes, setRecipes] = useState<MealCardTypes[] | null>(null);
  const mealCards = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const fetchdata = async () => {
      const data = await fetchRecipes({
        endpoints: `filter.php?c=${user?.category}`,
      });

      const filteredRecipes = data.meals.filter(
        (meal: any) => !user?.savedRecipes.includes(meal.idMeal)
      );

      const topSixRecipes = filteredRecipes.slice(0, 6);

      const recipe = topSixRecipes.map((meal: any) => ({
        name: meal.strMeal,
        id: meal.idMeal,
        image: meal.strMealThumb,
      }));
      setRecipes(recipe);
    };
    fetchdata();
  }, []);

  useEffect(() => {
    if (recipes && mealCards.current.length) {
      mealCards.current.forEach(card => {
        if (card) {
          let randomAniDelay = Math.random() * 0.5;
          card.style.animation = `fadeIn 1s ${randomAniDelay}s ease forwards`;
        }
      });
    }
  }, [recipes]);

  return (
    <>
      {user ? (
        <div className="relative p-1 s:p-6 flex flex-row max-w-[1280px] w-full items-center ">
          <span className="text-[#4e9a5d] text-5xl flex items-center  ">
            <RiRectangleFill />
            <span className="text-xl  border-[1px] py-[1px]  px-4 border-[#4e9a5d]">
              {user.name}'s category
            </span>
          </span>
        </div>
      ) : null}
      <div className="grid m-auto s:grid-cols-2 lg:grid-cols-3 items-center justify-items-center h-full p-8 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)] max-w-[1280px]">
        {recipes && recipes.map(meal => <MealCards key={meal.id} {...meal} />)}
      </div>
    </>
  );
};

export default RandomMeals;
