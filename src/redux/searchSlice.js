import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
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
export const { setInput } = searchSlice.actions

export default searchSlice.reducer