// import components
import SearchBar from "../Components/SearchBar/SearchBar";
import ThemeSelector from "../Components/themeSelector/themeSelector";

// import custom hooks
import { debounce } from "../Hooks/useDebouncer";
import { setInput } from "../redux/searchSlice";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";
import { fetchSearchList, organizeData } from "../Utils/utils";

const query = `
`;

export default function HomePage() {
  // const {setInput, suggestionData, setSuggestion} = useQueryList();

  const input = useSelector((state) => state.searchInput.input);
  const isDark = useSelector((state) => state.theme.dark);
  const [suggestionData, setSuggestionData] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
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
        navigate(`/${suggestionData[i].id}`, {state: {animeDetail: suggestionData[i]}});
        break;
      }
    }
  }

  function handleSubmit(data) {
    navigate(`/search/${data}`)
  }

  function handleChange(newInput) {
    dispatch(setInput(newInput));
  }

  return (
    <div className={`App ${isDark ? "App--Dark" : "App--Light"}`}>
      <ThemeSelector />
      <div className="Search__section">
        <div className="Search__container">
          <SearchBar
            // initVal={id && selectData ? selectData.title : ""}
            initVal=""
            dataArray={suggestionData.map((data) => data.title)}
            onChange={debounce(handleChange, 500)}
            onClickEle={handleClickEle}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
      {/* {selectData && (
        <Card
          title={selectData.title}
          image={selectData.images.jpg.large_image_url}
          synopsis={selectData.synopsis}
          genres={selectData.genres.map((item) => item.name)}
          trailer={selectData.trailer.url}
          sources={selectData.streaming}
        />
      )} */}
    </div>
  );
}
