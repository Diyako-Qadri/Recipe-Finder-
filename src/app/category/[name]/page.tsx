'use client';
import { MealCardTypes } from '@/utils/types';
import { useEffect, useState } from 'react';
import { fetchRecipes } from '@/utils/functions';
import MealCards from '@/components/MealCards';

const recipePage = ({ params }: { params: { name: string } }) => {
  const { name } = params;
  const [selectedCategory, setSelectedCategory] = useState<
    MealCardTypes[] | null
  >(null);
  const [categoryDescription, setCategoryDescription] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchdata = async () => {
      const data = await fetchRecipes({ endpoints: `filter.php?c=${name}` });

      const recipes = data.meals.map((meal: any) => ({
        name: meal.strMeal,
        id: meal.idMeal,
        image: meal.strMealThumb,
      }));
      console.log(data);
      setSelectedCategory(recipes);
    };
    const fetchCategoryInfo = async () => {
      const data = await fetchRecipes({ endpoints: `categories.php` });
      for (let i = 0; i <= 14; i++) {
        const category = data.categories[i]?.strCategory;
        if (category === name) {
          setCategoryDescription(data.categories[i].strCategoryDescription);
        }
      }
    };
    fetchdata();
    fetchCategoryInfo();
  }, [name]);

  return (
    <div className="w-full flex flex-col items-center pt-[7rem]">
      {categoryDescription && (
        <div className="text-center p-5 max-w-[1080px]">
          <div className='text-xl'>
            {categoryDescription.replace(/[\[\]\d]/g, '')}
          </div>
          <p className='py-5 text-xl'>
            Here are some recipes for delicious {name.toLowerCase()} dishes.
          </p>
        </div>
      )}
      <div className="grid m-auto w-full  s:grid-cols-2 lg:grid-cols-3 items-center justify-items-center h-full p-8 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)] max-w-[1280px]">
        {selectedCategory && selectedCategory.length > 0 ? (
          selectedCategory.map(meal => <MealCards key={meal.id} {...meal} />)
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default recipePage;
