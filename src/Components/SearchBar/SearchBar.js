import { useRef } from "react";
import React, { useState } from "react";
import { useOutsideAlerter } from "../../Hooks/useOutsideAlerter";
import "./SearchBar.scss";

export default function SearchBar({ dataArray, onChange, onClickEle }) {
  const [display, setDisplay] = useState(false);
  const [inputDisplay, setInputDisplay] = useState("");
  const wrapperRef = useRef(null);

  useOutsideAlerter(
    wrapperRef,
    () => {
      setDisplay(false);
    },
    () => {
      setDisplay(true);
    }
  );

  return (
    <div className="Search" ref={wrapperRef}>
      <form className="Search__form">
        <i className="fa fa-search"></i>
        <input
          className="Search__input"
          type="search"
          placeholder="Search Your anime"
          onChange={(e) => {
            onChange(e.target.value);
            setInputDisplay(e.target.value);
          }}
          value={inputDisplay}
        />
      </form>
      {display && (
        <ul className="Suggestion__list">
          {dataArray.map((data, index) => {
            return (
              <li
                className="Suggestion__ele"
                key={index}
                onClick={() => {
                  onClickEle(data);
                  setInputDisplay(data);
                  setDisplay(false);
                }}
              >
                <div className="Suggestion__ele__icon">
                  <i className="fa fa-search"></i>
                </div>
                <div className="Suggestion__ele__title">
                  <p className="Suggestion__ele__text">{data}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
