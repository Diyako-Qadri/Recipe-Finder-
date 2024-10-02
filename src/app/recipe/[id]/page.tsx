'use client';
import { RecipeType } from '@/utils/types';
import { useEffect, useState } from 'react';

const reciepePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [selectedRecepie, setSelectedRecepie] = useState<RecipeType | null>(
    null
  );

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();

        console.log(data.meals[0].strMeal);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipes();
  }, []);
  return (
    <div>
      <p>Hello from recepie page, id number is {id}</p>
      {selectedRecepie &&
        selectedRecepie.map((meal: RecipeType) => <div>{meal.strMeal}</div>)}
    </div>
  );
};

export default reciepePage;
