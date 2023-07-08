import React from "react";
import ThemeSelector from "../themeSelector/ThemeSelector";

import logoWhite from "./logo--White.png";
import logoBlack from "./logo--Black.png";

import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setInput } from "../../redux/searchSlice";

export default function Header() {
  const isDark = useSelector((state) => state.theme.dark);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function navigateHome() {
    dispatch(setInput(""));
    navigate("/");
  }
  return (
    <div className="header--wrapper">
      <div className={`header ${isDark ? "header--Dark" : "header--Light"}`}>
        <Link to={"/"} className="header__left" onClick={navigateHome}>
          <div className="header__left__ele header__logo">
            {isDark && <img src={logoWhite} />}
            {!isDark && <img src={logoBlack} />}
          </div>
          <div className="header__left__ele header__title">ANISearch</div>
        </Link>
        <div className="header__right">
          <div className="header__right__ele header__user">Login</div>
          <div className="header__right__ele header__theme">
            <ThemeSelector />
          </div>
        </div>
      </div>
    </div>
  );
}
