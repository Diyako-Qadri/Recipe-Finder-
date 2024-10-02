"use client"

import { useUserContext } from "@/utils/contexts";
import { RecipeType, userContextType } from "@/utils/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchRecipes } from "@/utils/functions";

const RandomMeals = () => {
    const { user } = useUserContext() as userContextType;
    const [recipes, setRecipes] = useState<RecipeType | null>(null);


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

    return (
        <div className="grid m-auto  s:grid-cols-2 md:grid-cols-3 items-center justify-items-center h-full p-8 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)] max-w-[1280px]">
        {recipes &&
          recipes.map((meal: RecipeType) => (
            <div
              className="bg-[#ff7c11f8] w-full h-full felx items-centern rounded-lg justify-center "
              key={meal.idMeal}
            >
              <Link
                className="flex flex-col items-center cursor-pointer b-Radius justify-between rounded-tr-[10px]"
                href={`/recipe/${meal.idMeal}`}
              >
                <img
                  className="rounded-tr-lg rounded-tl-lg "
                  src={meal.strMealThumb}
                  height="auto"
                  width="100%"
                ></img>
                <div className="h-12 text-lg text-white p-2 text-center flex justify-center items-center">
                  {meal.strMeal}
                </div>
              </Link>
            </div>
          ))}
      </div>
    )
};

export default RandomMeals
