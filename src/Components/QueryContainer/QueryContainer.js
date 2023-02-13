import React, { useLayoutEffect, useRef } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar";
import Filter from "../Filter/Filter";

import "./QueryContainer.scss";
import {setSuggestion} from "../../redux/searchSuggestion";
import { setInput } from "../../redux/searchSlice";
import { debounce } from "../../Hooks/useDebouncer";

import { fetchSearchList, organizeData } from "../../Utils/utils";

export default function QueryContainer({initValue = "", onSubmit = () => {}, onClickEle = () => {}}) {
  const input = useSelector((state) => state.searchInput.input);
  const suggestionData = useSelector((state) => state.searchSuggestion.suggestion);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const firstRender = useRef(true);

  function setSuggestionData(newValue) {
    dispatch(setSuggestion(newValue))
  }

  // prevent the other useEffect from running on the first render
  useLayoutEffect(() => {
    if (firstRender.current) {
        firstRender.current = false
    }
  })

  // this will also run on mount
  useEffect(() => {
    if (firstRender.current) {
        return
    }
    if (input.length !== 0) {
      fetchSearchList(input, 0).then((data) => {
        setSuggestionData(
          data.map((ele) => {
            return organizeData(ele);
          })
        );
      });
    } else {
      setSuggestionData([])
    }
  }, [input]);

  function handleClickEle(data) {
    for (let i = 0; i < suggestionData.length; i++) {
      if (suggestionData[i].title === data) {
        dispatch(setInput(data));
        // for anime detail page we need to set the anime detail as well
        onClickEle(suggestionData[i])
        navigate(`/${suggestionData[i].id}`, {state: {animeDetail: suggestionData[i]}});
        break;
      }
    }
  }

  function handleSubmit(newInput) {
    // function to be called before navigating
    navigate(`/search/${newInput}`)
    onSubmit(newInput);
  }

  function handleChange(newInput) {
    dispatch(setInput(newInput));
  }

  return (
    <div className="Search__section">
      <div className="Search__container">
        <SearchBar
          // initVal={id && selectData ? selectData.title : ""}
          initVal={initValue}
          dataArray={suggestionData.map((data) => data.title)}
          onChange={debounce(handleChange, 500)}
          onClickEle={handleClickEle}
          onSubmit={handleSubmit}
        />
      </div>
      {/* <Filter /> */}
    </div>
  );
}
