import React from "react";
import ThemeSelector from "../themeSelector/ThemeSelector";

import logoWhite from "./logo--White.png";
import logoBlack from "./logo--Black.png";

import "./Header.scss";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const isDark = useSelector((state) => state.theme.dark);
  const navigate = useNavigate()
  return (
    <div className="header--wrapper">
      <div className={`header ${isDark ? "header--Dark" : "header--Light"}`}>
        <div className="header__left" onClick={() => {navigate("/")}}>
          <div className="header__left__ele header__logo">
            {isDark && <img src={logoWhite} />}
            {!isDark && <img src={logoBlack} />}
          </div>
          <div className="header__left__ele header__title">ANISearch</div>
        </div>
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
