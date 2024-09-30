export type UserType = {
    name: string,
    category: string,
    savedRecipes: string[]
}

export type userContextType = {
    user: UserType | null,
    setUser: (user: UserType)=> void
}