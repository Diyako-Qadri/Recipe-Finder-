"use client";
import { fetchRecipes } from "@/utils/functions";
import { useEffect, useState, useRef } from "react";
import { useUserContext } from "@/utils/contexts";
import { CategoryType, userContextType } from "@/utils/types";
import Link from "next/link";

const Category = () => {
  const { user } = useUserContext() as userContextType;
  const [category, setCategory] = useState<CategoryType[] | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]); 


  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRecipes({ endpoints: `categories.php` });
      console.log(data.categories);
      setCategory(data.categories);
    };
    fetchData();
  }, []);


  useEffect(() => {
    if (category && cardsRef.current.length) {
      cardsRef.current.forEach((card) => {
        if (card) {
          let randomAniDelay = Math.random() * 0.5;
          card.style.animation = `fadeIn 1s ${randomAniDelay}s ease forwards`;
        }
      });
    }
  }, [category]);

  return (
    <div>
     
      <div className="grid m-auto s:grid-cols-2 lg:grid-cols-3 items-center justify-items-center s:p-2 h-full p-0 md:p-8 gap-0 s:gap-4 md:gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)] max-w-[1280px]">
        {category &&
          category.map((meal: CategoryType, index) => (
            <div
              ref={(el) => {
                if (el) {
                  cardsRef.current[index] = el;
                }
              }}
              className="relative md:boxShadow category-cards categoryBg s:rounded-xl w-full h-full p-4"
              key={meal.idCategory}
            >
              <Link href={`/category/${meal.strCategory}`}>
                <span className="absolute bg-[#4e9a5d] text-xl text-white left-0 px-3 rounded-r-lg mt-2">
                  {meal.strCategory}
                </span>
                <img
                  src={meal.strCategoryThumb}
                  alt="category"
                  height="auto"
                  width="100%"
                />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Category;