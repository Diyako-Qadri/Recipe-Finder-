export type UserType = {
    name: string,
    category: string,
    savedRecipes: string[]
}

export type userContextType = {
    user: UserType | null,
    setUser: (user: UserType| null)=> void
}

export type RecipeType = {
    map(arg0: (meal: RecipeType) => import("react").JSX.Element): import("react").ReactNode
    strMeal: string,
    idMeal: string,
    strMealThumb: string,
    strArea?: string,
    strInstructions?: string
}
export type RecepieFetchTypes = {
    parameter : string
}