import { create } from 'zustand'
import { persist } from "zustand/middleware";

// create store
export const useAuth = create(
  persist(  
    (set) => ({
    auth: null,
    setAuth: (newAuth) => set({auth: newAuth})
    }),
    {
        name: "auth",
    }
  )
)

export const useIsAuthenticated = create(
  persist(  
    (set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (newIsAuthenticated) => set({isAuthenticated: newIsAuthenticated})
    }),
    {
        name: "isAuthenticated",
    }
  )
)