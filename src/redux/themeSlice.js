import { createSlice } from '@reduxjs/toolkit'

function getThemeFromLocalStorage() {
  const saved = localStorage.getItem("theme");
  const initialValue = JSON.parse(saved);
  return initialValue || false;
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    dark: getThemeFromLocalStorage(),
  },
  reducers: {
    toggle: (state) =>  {
        const new_value = !state.dark
        state.dark = new_value
        localStorage.setItem("theme", JSON.stringify(new_value));
    }
  },
})

// Action creators are generated for each case reducer function
export const { toggle } = themeSlice.actions

export default themeSlice.reducer