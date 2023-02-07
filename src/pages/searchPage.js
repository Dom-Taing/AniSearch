// components
import SearchBar from "../Components/SearchBar/SearchBar";
import CardList from "../Components/CardList/CardList";
import ThemeSelector from "../Components/themeSelector/themeSelector";
import { MAL_KEY } from "../secret";

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

export default function SearchPage() {
  let { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.dark);

  const input = useSelector((state) => state.searchInput.input);
  const [searchBarSuggestionData, setSearchBarSuggestionData] = useState([]);
  const [cardListSuggestionData, setCardListSuggestionData] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (id.length !== 0) {
      dispatch(setInput(id));
      fetchSearchList(id, 0).then((data) => {
        let temp = data.map((ele) => {
          return organizeData(ele);
        });
        setSearchBarSuggestionData(temp);
        setCardListSuggestionData(temp);
      });
    } else {
      setSearchBarSuggestionData([]);
      setCardListSuggestionData([]);
    }
  }, []);

  useEffect(() => {
    if (input.length !== 0) {
      fetchSearchList(input, 0).then((data) => {
        setSearchBarSuggestionData(
          data.map((ele) => {
            return organizeData(ele);
          })
        );
      });
    } else {
      setSearchBarSuggestionData([]);
    }
  }, [input]);

  function handleClickEleSearchBar(data) {
    for (let i = 0; i < searchBarSuggestionData.length; i++) {
      if (searchBarSuggestionData[i].title === data) {
        navigate(`/${searchBarSuggestionData[i].id}`, {
          state: { animeDetail: suggestionData[i] },
        });
        break;
      }
    }
  }

  function handleClickCard(id) {
    for (let i = 0; i < cardListSuggestionData.length; i++) {
      if (cardListSuggestionData[i].id === id) {
        navigate(`/${cardListSuggestionData[i].id}`, {
          state: { animeDetail: cardListSuggestionData[i] },
        });
        break;
      }
    }
    // navigate(`/${id}`);
  }

  function handleSubmitSearchBar(newInput) {
    setInput(newInput);
    console.log("submit called");
    if (newInput.length !== 0) {
      fetchSearchList(newInput, 0).then((data) => {
        let temp = data.map((ele) => {
          return organizeData(ele);
        });
        setSearchBarSuggestionData(temp);
        setCardListSuggestionData(temp);
      });
    } else {
      setSearchBarSuggestionData([]);
      setCardListSuggestionData([]);
    }
    navigate(`/search/${newInput}`);
  }

  function handleChange(newInput) {
    dispatch(setInput(newInput));
  }

  const observer = new IntersectionObserver((entries) => {
    const first = entries[0];
    if (first.isIntersecting) {
      setPage(page + 1);
    }
  });

  // console.log(observer);

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
      <CardList
        datas={cardListSuggestionData}
        onClickCard={handleClickCard}
        observer={observer}
      />
    </div>
  );
}
