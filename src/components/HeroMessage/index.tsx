"use client"
import { useUserContext } from "@/utils/contexts";
import { userContextType } from "@/utils/types";

const HeroMessage = () => {
    const {user} = useUserContext() as userContextType;

    return (
        <div className="w-full pt-20 ">
          <h2>welcome to world's recipe, Find delisius dishes and enjoy</h2>

        </div>
    )
};

export default HeroMessage
