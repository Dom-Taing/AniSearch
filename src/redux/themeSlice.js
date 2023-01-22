import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    dark: false,
  },
  reducers: {
    toggle: (state) =>  {
        state.dark = !state.dark
    }
  },
})

// Action creators are generated for each case reducer function
export const { toggle } = themeSlice.actions

export default themeSlice.reducer