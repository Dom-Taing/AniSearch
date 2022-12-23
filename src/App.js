import SearchBar from "./Components/SearchBar/SearchBar";
import Card from "./Components/Card/Card";
import React, { useEffect, useState } from "react";

import { debounce } from "./Hooks/useDebouncer";

import "./style.scss";

export default function App() {
  const [input, setInput] = useState("");
  const [suggestionData, setSuggestion] = useState([]);

  const [selectId, setSelectId] = useState(0);
  const [selectData, setSelectData] = useState(undefined);

  useEffect(() => {
    // console.log(input);
    if (input.length !== 0) {
      let URL = `https://api.jikan.moe/v4/anime?q=${input}&sfw`;
      fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          let temp = data.data.filter((ele) => ele.approved);
          temp = temp.sort((a, b) => a.popularity - b.popularity);
          setSuggestion(
            temp.map((ele) => {
              return { title: ele.title, id: ele.mal_id };
            })
          );
        });
    } else {
      setSuggestion([]);
    }
  }, [input]);

  useEffect(() => {
    console.log(selectId);
    let URL = `https://api.jikan.moe/v4/anime/${selectId}/full`;
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSelectData(data.data);
      });
  }, [selectId]);

  function handleClickEle(data) {
    setInput(data);
    for (let i = 0; i < suggestionData.length; i++) {
      if (suggestionData[i].title === data) {
        setSelectId(suggestionData[i].id);
        break;
      }
    }
  }

  // useEffect(() => {
  //   console.log(suggestionData);
  // }, [suggestionData]);

  function handleChange(newInput) {
    setInput(newInput);
    // debounce(setInput, 500);
  }

  return (
    <div className="App">
      {/* <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2> */}
      <SearchBar
        input={input}
        dataArray={suggestionData.map((data) => data.title)}
        onChange={debounce(handleChange, 500)}
        // onClickEle={(data) => {
        //   setInput(data);
        // }}
        onClickEle={handleClickEle}
      />
      {selectData && (
        <Card
          title={selectData.title}
          image={selectData.images.jpg.image_url}
          synopsis={selectData.synopsis}
          genres={selectData.genres.map((item) => item.name)}
          trailer={selectData.trailer.url}
          sources={selectData.streaming}
        />
      )}
    </div>
  );
}
