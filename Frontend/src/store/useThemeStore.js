import {create} from 'zustand'
const useThemeStore=create((set)=>({
    darkMode:true,
    switchTheme:()=>set((state)=>({darkMode:!state.darkMode}))
}))
export default useThemeStore;