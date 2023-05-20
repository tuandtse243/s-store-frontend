import { create } from 'zustand'
import { persist } from "zustand/middleware";

export const useCart = create(
    persist(
        (set, get) => ({
            cart: [],
            setCart: (cartItem) => set({cart: cartItem})
        }),
        {
            name: 'cart',
        }
    )
)