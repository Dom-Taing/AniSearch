import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../../redux/themeSlice";

import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function ThemeSelector() {
  const isDark = useSelector((state) => state.theme.dark);
  const dispatch = useDispatch();

  const toggleDarkMode = (checked) => {
    dispatch(toggle());
  };

  return (
    <DarkModeSwitch
      style={{ marginBottom: "2rem", position: "absolute", right: "127px", top: "40px" }}
      checked={isDark}
      onChange={toggleDarkMode}
      size={31}
    />
  );
}
