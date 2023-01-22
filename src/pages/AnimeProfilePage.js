// import components
import SearchBar from "../Components/SearchBar/SearchBar";
import Card from "../Components/Card/Card";
import ThemeSelector from "../Components/themeSelector/themeSelector";
import { MAL_KEY } from "../secret";

// import custom hooks
import { debounce } from "../Hooks/useDebouncer";
import { useQueryList } from "../Hooks/useQueryList";
import { useQueryAnime } from "../Hooks/useQueryAnime";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {useSelector} from "react-redux"

import "./style.scss";

const query = `
`;

export default function AnimeProfilePage() {
  let { id } = useParams();

  const {setInput, suggestionData, setSuggestion} = useQueryList();
  const {selectData, setSelectId} = useQueryAnime();

  const navigate = useNavigate();
  const isDark = useSelector((state) => state.theme.dark)

  useEffect(() => {
    console.log("URL id", id);
    setSelectId(id);
  }, [id]);

  useEffect(() => {
    setInput(selectData ? selectData.title : "")
  }, [selectData])

  function handleClickEle(data) {
    setInput(data);
    for (let i = 0; i < suggestionData.length; i++) {
      if (suggestionData[i].title === data) {
        setSelectId(suggestionData[i].id);
        navigate(`/${suggestionData[i].id}`);
        break;
      }
    }
  }

  function handleSubmit(data) {
    navigate(`/search/${data}`)
  }

  function handleChange(newInput) {
    setInput(newInput);
  }

  return (
    <div className={`App ${isDark ? "App--Dark" : "App--Light"}`}>
      <ThemeSelector />
      <div className="Search__section">
        <div className="Search__container">
          <SearchBar
            initVal={id && selectData ? selectData.title : ""}
            dataArray={suggestionData.map((data) => data.title)}
            onChange={debounce(handleChange, 500)}
            onClickEle={handleClickEle}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
      {selectData && (
        <Card
          title={selectData.title}
          image={selectData.images.jpg.large_image_url}
          synopsis={selectData.synopsis}
          genres={selectData.genres.map((item) => item.name)}
          trailer={selectData.trailer.url}
          sources={selectData.streaming}
        />
      )}
    </div>
  );
}
