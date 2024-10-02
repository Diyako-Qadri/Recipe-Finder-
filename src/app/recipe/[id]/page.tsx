'use client';
import { RecipeType } from '@/utils/types';
import { useEffect, useState } from 'react';
import { fetchRecipes } from '@/utils/functions';
const reciepePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [selectedRecepie, setSelectedRecepie] = useState<RecipeType | null>(
    null
  );

  useEffect(() => {
    const fetchdata = async()=>{
        const data = await fetchRecipes({endpoints: `lookup.php?i=${id}`})
        console.log(data)
    }
    fetchdata()
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
