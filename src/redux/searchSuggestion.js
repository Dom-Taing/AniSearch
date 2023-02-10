import { createSlice } from "@reduxjs/toolkit";

export const searchSuggestionSlice = createSlice({
  name: "searchSuggestion",
  initialState: {
    suggestion: [],
  },
  reducers: {
    setSuggestion: (state, action) => {
      const new_value = action.payload;
      state.suggestion = new_value;
    },
    concatenateSuggestion: (state, action) => {
      const new_value = action.payload;
      state.suggestion = [...state.suggestion, ...new_value];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSuggestion } = searchSuggestionSlice.actions;
export const { concatenateSuggestion } = searchSuggestionSlice.actions;

export default searchSuggestionSlice.reducer;
