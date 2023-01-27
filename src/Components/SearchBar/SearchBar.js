import { useEffect, useRef } from "react";
import React, { useState } from "react";
import { useOutsideAlerter } from "../../Hooks/useOutsideAlerter";
import "./SearchBar.scss";

export default function SearchBar({
  initVal,
  dataArray,
  onChange,
  onClickEle,
  onSubmit,
}) {
  const [display, setDisplay] = useState(false);
  // const [inputDisplay, setInputDisplay] = useState("");
  const [inputDisplay, setInputDisplay] = useState("");
  const [yourInput, setYourInput] = useState("");
  const [selectIndex, setSelectIndex] = useState(0);
  const wrapperRef = useRef(null);

  const selectionRef = useRef([]);

  useEffect(() => {
    if (initVal) {
      setInputDisplay(initVal);
      setYourInput(initVal)
    }
  }, [initVal]);

  useOutsideAlerter(
    wrapperRef,
    () => {
      setDisplay(false);
    },
    () => {
      setDisplay(true);
    }
  );

  // creating an array of size dataArray for the ref
  useEffect(() => {
    selectionRef.current = selectionRef.current.slice(0, dataArray.length);
  }, [dataArray]);

  function handleKeyDown(e) {
    e = e || window.event;
    let tempIndex = selectIndex;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      tempIndex = (tempIndex + 1) % (dataArray.length + 1);
      setSelectIndex(tempIndex);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (tempIndex === 0) {
        tempIndex = dataArray.length + 1;
      }
      tempIndex = (tempIndex - 1) % (dataArray.length + 1);
      setSelectIndex(tempIndex);
    }

    if (tempIndex === 0) {
      setInputDisplay(yourInput);
    } else {
      setInputDisplay(dataArray[tempIndex - 1]);
      console.log(selectionRef.current[tempIndex - 1]);
      selectionRef.current[tempIndex - 1].scrollIntoViewIfNeeded(false);
    }
  }

  function handleChange(e) {
    onChange(e.target.value);
    setInputDisplay(e.target.value);
    setYourInput(e.target.value);
    setSelectIndex(0);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // onClickEle(inputDisplay);
    // setYourInput(inputDisplay);
    // setSelectIndex(0);
    // setDisplay(false);
    if (selectIndex === 0) {
      onSubmit(yourInput);
      setDisplay(false);
    } else {
      onClickEle(inputDisplay);
      setYourInput(inputDisplay);
      setSelectIndex(0);
      setDisplay(false);
    }
  }

  return (
    <div
      className="Search"
      ref={wrapperRef}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onSubmit={handleSubmit}
    >
      <form className="Search__form">
        <i className="fa fa-search"></i>
        <input
          className="Search__input"
          type="search"
          placeholder="Search Your anime"
          onChange={handleChange}
          value={inputDisplay}
        />
      </form>
      {display && (
        <ul className="Suggestion__list">
          {dataArray.map((data, index) => {
            return (
              <li
                className={`Suggestion__ele ${
                  selectIndex - 1 === index ? "Suggestion__ele--focus" : ""
                }`}
                // className="Suggestion__ele"
                key={index}
                tabIndex={0}
                onFocus={() => {
                  setInputDisplay(data);
                  setSelectIndex(index + 1);
                }}
                onClick={() => {
                  onClickEle(data);
                  setInputDisplay(data);
                  setYourInput(data);
                  setSelectIndex(0);
                  setDisplay(false);
                }}
                ref={(el) => (selectionRef.current[index] = el)}
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
