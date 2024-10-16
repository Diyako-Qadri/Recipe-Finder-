'use client';

import { RecipeType, userContextType } from '@/utils/types';
import { useEffect, useState } from 'react';
import { fetchRecipes } from '@/utils/functions';
import ingredientLogo from '../../../../public/ingredient.png';
import {useUserContext} from "@/utils/contexts";
import Image from 'next/image';
import { IoIosHeartEmpty } from 'react-icons/io';
import { IoIosHeart } from "react-icons/io";


const RecipePage = ({ params }: { params: { id: string } }) => {

  const { id } = params;
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);
  const [ingredientsWithMeasures, setIngredientsWithMeasures] = useState<{ ingredient: string; measure: string }[] | null>(null);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const { user, setUser } = useUserContext() as userContextType;
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRecipes({ endpoints: `lookup.php?i=${id}` });
      if (data.meals && data.meals.length > 0) {
        const meal = data.meals[0];

        const ingredientKeys = Object.keys(meal).filter(key =>
          key.includes('strIngredient')
        );
        const measureKeys = Object.keys(meal).filter(key =>
          key.includes('strMeasure')
        );

        const ingredientValues = ingredientKeys
          .map(key => meal[key])
          .filter(value => value && value.trim() !== '');

        const measureValues = measureKeys
          .map(key => meal[key])
          .filter(value => value && value.trim() !== '');

        const combined = ingredientValues.map((ingredient, index) => ({
          ingredient,
          measure: measureValues[index] || '',
        }));

        console.log(data.meals[0]);
        setSelectedRecipe(meal);
        setIngredientsWithMeasures(combined);

        if (user?.savedRecipes && user.savedRecipes.includes(id)) {
          setLiked(true); 
        } else {
          setLiked(false); 
        }
      }
    };
    fetchData();
  }, [id, user]);

  useEffect(() => {
    if (user && user.savedRecipes) {
      setLiked(user.savedRecipes.includes(id));
    }
  }, [user, id]);
  const embedUrl = (url: string): string => {
    return url.replace('watch?v=', 'embed/');
  };

  const handleClick = () => {
    if (user) {
      if (user.savedRecipes.includes(id)) {
        const unlikedRecipe = user.savedRecipes.filter(item => item !== id);
        user.savedRecipes = unlikedRecipe;
        setUser({ ...user });
        setLiked(false);
      } else {
        user.savedRecipes = [...user.savedRecipes, id];
        setUser({ ...user });
        console.log('working...');
        console.log(user.savedRecipes);
        setLiked(true);
      }
    }
  };


  return (
    <div className="flex flex-col top-10  justify-center items-center">
      {selectedRecipe && (
        <div className="flex flex-col  w-full pb-7 md:w-[88%] max-w-[1280px] items-center justify-center md:my-8 boxShadow rounded-lg">
          <div className=""></div>
          <img
            className=" md:rounded-br-none md:rounded-tl-none top-20 fixed z-[-10]  w-full mb-1  md:hidden "
            src={selectedRecipe.strMealThumb}
            alt={selectedRecipe.strMeal}
            height="auto"
            width="50%"
          />
          <div className="top-[300px] pb-10  md:max-w-[1280px] absolute md:block bg-whiteSahdow WhiteboxShadow md:bg-none  md:top-16">
            <div className="flex bg-whiteSahdow WhiteboxShadow s:box-shadow-none flex-col relative items-center md:items-stretch md:flex-row w-full justify-evenly p-0">
              <div className="hidden  md:flex flex-col items-center mx-auto p-8 max-w-[550px] w-[80%] justify-evenly">
                <h3 className="text-[#5a5555] py-4 text-[34px] text-center font-semibold">
                  {selectedRecipe.strMeal}
                </h3>
                <div className="flex flex-col items-center">
                  <button
                    onClick={handleClick}
                    className=" hidden md:block px-6 p-1 text-[34px] text-white transition-all ease-in-out duration-500 bg-red-400 hover:bg-red-500 rounded-tl-[10px] rounded-[10px]"
                  >
                    {liked ? <IoIosHeart /> : <IoIosHeartEmpty />}
                  </button>
                  {ingredientsWithMeasures && (
                    <div className="hidden border-b-[1px] py-2 border-[black] my-4 items-center gap-2 md:flex">
                      <Image src={ingredientLogo} alt="ahad" width={20} />
                      <span className="text-lg font-bold mr-1">
                        {ingredientsWithMeasures.length}
                      </span>
                      Ingredients
                    </div>
                  )}
                  <ul className="hidden md:flex gap-2  flex-wrap">
                    {typeof selectedRecipe.strTags == 'string'
                      ? selectedRecipe.strTags
                          .split(',')
                          .map((tag: string, index: number) => (
                            <li
                              className="text-[#4e9a5d] border-[1px] border-[#c3bebe] py-[2px] px-2 rounded-2xl"
                              key={index}
                            >
                              {tag.trim()}
                            </li>
                          ))
                      : selectedRecipe.strTags &&
                        Array.isArray(selectedRecipe.strTags) &&
                        selectedRecipe.strTags.map((tag, index) => (
                          <li key={index}>{tag}</li>
                        ))}
                  </ul>
                </div>
              </div>

              <img
                className="rounded-xl md:rounded-br-none md:rounded-tl-none top-20 hidden md:flex w-full mb-1 md:mb-0 md:w-[50%] max-w-[600px]"
                src={selectedRecipe.strMealThumb}
                alt={selectedRecipe.strMeal}
                height="auto"
                width="50%"
              />
              <h3 className="text-[#5a5555] md:hidden py-4 text-[34px] text-center font-semibold">
                {selectedRecipe.strMeal}
              </h3>
              <button
                onClick={handleClick}
                className="block md:hidden left-0 px-6 mb-6 p-1 text-[34px] text-white bg-red-400  rounded-[6px] "
              >
                {liked ? <IoIosHeart /> : <IoIosHeartEmpty />}
              </button>

              <ul className="md:hidden flex gap-2  flex-wrap">
                {typeof selectedRecipe.strTags === 'string'
                  ? selectedRecipe.strTags
                      .split(',')
                      .map((tag: string, index: number) => (
                        <li
                          className="text-[#4e9a5d] border-[1px] border-[#c3bebe] py-1 px-2 rounded-2xl"
                          key={index}
                        >
                          {tag.trim()}
                        </li>
                      ))
                  : selectedRecipe.strTags &&
                    Array.isArray(selectedRecipe.strTags) &&
                    selectedRecipe.strTags.map((tag, index) => (
                      <li key={index}>{tag}</li>
                    ))}
              </ul>
              {ingredientsWithMeasures && (
                <div className="flex border-b-[1px] py-2 border-[black] mt-4 mb-1 items-center gap-2 md:hidden">
                  <Image src={ingredientLogo} alt="ahad" width={20} />
                  <span className="text-lg font-bold mr-1">
                    {ingredientsWithMeasures.length}
                  </span>
                  Ingredients
                </div>
              )}
            </div>
            <div className="flex flex-col bg-white items-center lg:flex-row justify-around p-3 gap-6">
              <div className="block w-full z-10 lg:w-[30%] max-w-[600px]">
                <ul className="gap-3">
                  {ingredientsWithMeasures &&
                    ingredientsWithMeasures.map((item, index) => (
                      <li
                        className="my-5 flex justify-evenly gap-1 w-full"
                        key={index}
                      >
                        <div className="w-full flex flex-row-reverse">
                          <span className="bg-gray-200 py-[4px] text-end px-2 rounded-l-3xl">
                            {item.measure}
                          </span>
                        </div>
                        <div className="w-full flex flex-rowa items-center ">
                          <span className="text-start">{item.ingredient}</span>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="p-5 lg:w-[50%] items-center flex flex-col">
                <h4 className="text-xl border-b-[1px] pb-2 mb-4 border-black w-[100%]">
                  Instructions:
                </h4>
                <p
                  className={`text-[20px] font-normal transition-[max-height] duration-400 ease-in-out text-[#404046] overflow-hidden`}
                >
                  {showInstructions
                    ? selectedRecipe.strInstructions
                    : selectedRecipe.strInstructions?.slice(0, 400) + '...'}
                </p>
                <button
                  onClick={() => setShowInstructions(!showInstructions)}
                  className="py-2 px-6 bg-[#fec30adb] rounded-[25px] my-8"
                >
                  {!showInstructions ? 'Show more' : 'Show less'}
                </button>
              </div>
            </div>
            <div className='flex justify-center items-center w-full '>
              <div className="relative w-full max-w-[990px] bg-white">
                {selectedRecipe.strYoutube && (
                  <iframe
                    width="90%"
                    height="395"
                    className="block bg-no-repeat bg-contain mx-auto rounded-lg"
                    src={embedUrl(selectedRecipe.strYoutube)}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipePage;
