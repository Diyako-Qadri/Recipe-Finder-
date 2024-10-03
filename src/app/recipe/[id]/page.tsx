'use client';

import { RecipeType } from '@/utils/types';
import { useEffect, useState } from 'react';
import { fetchRecipes } from '@/utils/functions';



const recipePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(
    null
  );

  useEffect(() => {
    const fetchdata = async()=>{
        const data = await fetchRecipes({endpoints: `lookup.php?i=${id}`})
        console.log(data)
        setSelectedRecipe(data.meals)
    }
    fetchdata()
  }, []);

  
  return (
    <div>
      <p>Hello from Recipepage, id number is {id}</p>
      {selectedRecipe&&
        selectedRecipe.map((meal: RecipeType) => <div>{meal.strMeal}</div>)}
    </div>
  );
};

export default recipePage;
