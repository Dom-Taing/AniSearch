import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";
import MainPage from "./pages/mainPage";
import AnimeProfilePage from "./pages/AnimeProfilePage"

export default function MainRouter () {
  return<Router>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/:id" element={<AnimeProfilePage />} />
    </Routes>
  </Router>
}