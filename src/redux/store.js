import { configureStore } from '@reduxjs/toolkit'
import themeReducer from "./themeSlice"
import searchInputReducer from "./searchSlice"
import searchSuggestionReducer from './searchSuggestion'

export default configureStore({
  reducer: {
    theme: themeReducer,
    searchInput: searchInputReducer,
    searchSuggestion: searchSuggestionReducer
  },
})