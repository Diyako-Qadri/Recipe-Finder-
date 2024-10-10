'use client';
import { MealCardTypes, RecipeType, userContextType } from '@/utils/types';
import { useEffect, useState } from 'react';
import { fetchRecipes } from '@/utils/functions';
import MealCards from '@/components/MealCards';
import { useUserContext } from '@/utils/contexts';

const recipePage = ({ params }: { params: { name: string } }) => {
  const { name } = params;
  const [selectedCategory, setSelectedCategory] = useState<MealCardTypes[] | null>(null);
  const { user  } = useUserContext() as userContextType;




  useEffect(() => {
    const fetchdata = async () => {
      const data = await fetchRecipes({ endpoints: `filter.php?c=${name}` });

      const recipes = data.meals.map((meal: any) => ({
        name: meal.strMeal,
        id: meal.idMeal,
        image: meal.strMealThumb,
      }));
      console.log(recipes);
      setSelectedCategory(recipes);
    };
    fetchdata();
  }, [name]);




  return (
    <div className='w-full'>
      <p>Here are some recipes for delicious {name.toLowerCase()} dishes.</p>
      <div className="grid m-auto w-full  s:grid-cols-2 lg:grid-cols-3 items-center justify-items-center h-full p-8 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)] max-w-[1280px]">
      {selectedCategory && selectedCategory.length > 0 ? (
        selectedCategory.map((meal) => (
          <MealCards 
          key={meal.id} 
          {...meal} 
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
      </div>
    </div>
  );
};

export default recipePage;
