import { configureStore } from '@reduxjs/toolkit'
import themeReducer from "./themeSlice"
import searchInputReducer from "./searchSlice"

export default configureStore({
  reducer: {
    theme: themeReducer,
    searchInput: searchInputReducer
  },
})