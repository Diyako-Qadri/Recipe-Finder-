"use client"

import { useUserContext } from "@/utils/contexts";
import { RecipeType, userContextType } from "@/utils/types";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { fetchRecipes } from "@/utils/functions";

const RandomMeals = () => {
    const { user } = useUserContext() as userContextType;
    const [recipes, setRecipes] = useState<RecipeType[] | null>(null);
    const mealCards = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const fetchdata = async () => {
        
             const data = await fetchRecipes({endpoints: `filter.php?c=${user?.category}`})
            console.log(data)
              const shuffledRecipes = data.meals.sort(() => Math.random() - 0.5);
              const topFiveRecipes = shuffledRecipes.slice(0, 6);
              setRecipes(topFiveRecipes);
        }
        fetchdata()

      }, []);

      useEffect(() => {
        if (recipes && mealCards.current.length) {
          mealCards.current.forEach((card) => {
            if (card) {
              let randomAniDelay = Math.random() * 0.5;
              card.style.animation = `fadeIn 1s ${randomAniDelay}s ease forwards`;
            }
          });
        }
      }, [recipes]);

    return (
        <div className="grid m-auto  s:grid-cols-2 lg:grid-cols-3 items-center justify-items-center h-full p-8 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)] max-w-[1280px]">
        {recipes &&
          recipes.map((meal: RecipeType, index) => (
            <div
            ref={(el) => {
                if (el) {
                  mealCards.current[index] = el;
                }
              }}
              className=" relative w-full boxShadow h-full meal-Cards felx items-centern rounded-xl justify-center "
              key={meal.idMeal}
            >
              <Link
                className="flex flex-col items-center boxShadow cursor-pointer justify-between rounded-[20px] "
                href={`/recipe/${meal.idMeal}`}
              >
                <img
                  className=" rounded-[20px] "
                  src={meal.strMealThumb}
                  height="auto"
                  width="100%"
                ></img>
                <span className="h-12 absolute text-xl w-full top-[70%] md:top-[70%] bottom-[20%] py-2 bg-[#4e9a5de1] text-white p-2 text-center flex justify-center items-center">
                  {meal.strMeal}
                </span>
              </Link>
            </div>
          ))}
      </div>
    )
};

export default RandomMeals
