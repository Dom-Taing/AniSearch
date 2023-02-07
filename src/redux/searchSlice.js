import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
  name: 'searchInput',
  initialState: {
    input: "",
  },
  reducers: {
    setInput: (state, action) =>  {
        const new_value = action.payload
        state.input = new_value
    }
  },
})

// Action creators are generated for each case reducer function
export const { setInput } = themeSlice.actions

export default themeSlice.reducer