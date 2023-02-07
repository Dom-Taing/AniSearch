import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";
import HomePage from "./pages/homePage";
import AnimeProfilePage from "./pages/AnimeProfilePage"
import SearchPage from "./pages/searchPage"

export default function MainRouter () {
  return<Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:id" element={<AnimeProfilePage />} />
      <Route path="/search/:id" element={<SearchPage />} />
    </Routes>
  </Router>
}