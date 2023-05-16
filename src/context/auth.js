import { create } from 'zustand'

// create store
const useAuth = create((set) => ({
    auth: '',
    setAuth: (newAuth) => set({auth: newAuth})
}))
export default useAuth