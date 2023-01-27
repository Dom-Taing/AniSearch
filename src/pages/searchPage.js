// components
import SearchBar from "../Components/SearchBar/SearchBar";
import CardList from "../Components/CardList/CardList";
import ThemeSelector from "../Components/themeSelector/themeSelector";
import { MAL_KEY } from "../secret";

// import custom hooks
import { debounce } from "../Hooks/useDebouncer";
import { useQueryList } from "../Hooks/useQueryList";
import { useQueryAnime } from "../Hooks/useQueryAnime";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";

const query = `
`;

export default function SearchPage() {
  let { id } = useParams();

  const navigate = useNavigate();
  const isDark = useSelector((state) => state.theme.dark);

  const [input, setInput] = useState(id);
  const [searchBarSuggestionData, setSearchBarSuggestionData] = useState([]);
  const [cardListSuggestionData, setCardListSuggestionData] = useState([]);

  useEffect(() => {
    if (id.length !== 0) {
      let URL = `https://api.jikan.moe/v4/anime?letter=${input}&sfw&order_by=popularity&sort=asc`;
      fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          let temp = data.data.filter((ele) => ele.approved);
          temp = temp.sort((a, b) => a.popularity - b.popularity);
          setSearchBarSuggestionData(
            temp.map((ele) => {
              return { title: ele.title, id: ele.mal_id };
            })
          );
          setCardListSuggestionData(
            temp.map((ele) => {
              return {
                title: ele.title,
                id: ele.mal_id,
                image: ele.images.jpg.large_image_url,
                synopsis: ele.synopsis,
                genres: ele.genres.map((item) => item.name),
                trailer: ele.trailer.url,
                sources: ele.streaming,
              };
            })
          );
        });
    } else {
      setSearchBarSuggestionData([]);
      setCardListSuggestionData([]);
    }
  }, []);

  useEffect(() => {
    if (input.length !== 0) {
      let URL = `https://api.jikan.moe/v4/anime?letter=${input}&sfw&order_by=popularity&sort=asc`;
      fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          let temp = data.data.filter((ele) => ele.approved);
          temp = temp.sort((a, b) => a.popularity - b.popularity);
          setSearchBarSuggestionData(
            temp.map((ele) => {
              return { title: ele.title, id: ele.mal_id };
            })
          );
        });
    } else {
      // there's no input to search
      setSearchBarSuggestionData([]);
    }
  }, [input]);

  function handleClickEleSearchBar(data) {
    for (let i = 0; i < searchBarSuggestionData.length; i++) {
      if (searchBarSuggestionData[i].title === data) {
        // setSelectId(suggestionData[i].id);
        navigate(`/${searchBarSuggestionData[i].id}`);
        break;
      }
    }
  }

  function handleClickCard(id) {
    navigate(`/${id}`);
  }

  function handleSubmitSearchBar(data) {
    setInput(data);
    console.log("submit called");
    if (data.length !== 0) {
      let URL = `https://api.jikan.moe/v4/anime?letter=${data}&sfw&order_by=popularity&sort=asc`;
      fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          let temp = data.data.filter((ele) => ele.approved);
          temp = temp.sort((a, b) => a.popularity - b.popularity);
          setSearchBarSuggestionData(
            temp.map((ele) => {
              return { title: ele.title, id: ele.mal_id };
            })
          );
          setCardListSuggestionData(
            temp.map((ele) => {
              return {
                title: ele.title,
                id: ele.mal_id,
                image: ele.images.jpg.large_image_url,
                synopsis: ele.synopsis,
                genres: ele.genres.map((item) => item.name),
                trailer: ele.trailer.url,
                sources: ele.streaming,
              };
            })
          );
        });
    } else {
      setSearchBarSuggestionData([]);
      setCardListSuggestionData([]);
    }
    navigate(`/search/${data}`);
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
            initVal={id}
            dataArray={searchBarSuggestionData.map((data) => data.title)}
            onChange={debounce(handleChange, 500)}
            onClickEle={handleClickEleSearchBar}
            onSubmit={handleSubmitSearchBar}
          />
        </div>
      </div>
      <CardList datas={cardListSuggestionData} onClickCard={handleClickCard}/>
    </div>
  );
}
