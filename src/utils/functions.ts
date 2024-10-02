import { RecepieFetchTypes } from "./types";

export const fetchRecipes = async ({endpoints}: RecepieFetchTypes) => {
    try {
       {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/${endpoints}`
        );
        const data = await response.json();
        return(data)
      }
    } catch (error) {
      console.log(error);
    }
  };