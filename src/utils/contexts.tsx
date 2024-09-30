"use client"
import React, { createContext, useContext, useState } from "react";
import { userContextType, UserType } from "./types";

const userContext = createContext<userContextType | null>(null)

export const UserProvider = ({children}:{children:React.ReactNode}) => {
    const[user, setUser] = useState<UserType | null>(null)
    return (
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    )
}

export const useUserContext = ()=> {
    return useContext(userContext)
}