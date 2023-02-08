// components
import SearchBar from "../Components/SearchBar/SearchBar";
import CardList from "../Components/CardList/CardList";
import ThemeSelector from "../Components/themeSelector/themeSelector";
import { MAL_KEY } from "../secret";

// import custom hooks
import { debounce } from "../Hooks/useDebouncer";
import { setInput } from "../redux/searchSlice";

import React, { useCallback, useEffect, useRef, useState } from "react";
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

  const cardLoader = useRef(null);

  // this will consider the first render as well
  useEffect(() => {
    if (id.length !== 0) {
      dispatch(setInput(id)); // need to search why this is needed
      fetchSearchList(id, page).then((data) => {
        let temp = data.map((ele) => {
          return organizeData(ele);
        });
        setSearchBarSuggestionData([...searchBarSuggestionData, ...temp]);
        setCardListSuggestionData([...cardListSuggestionData, ...temp]);
      });
    } else {
      setSearchBarSuggestionData([]);
      setCardListSuggestionData([]);
    }
  }, [page]);

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
          state: { animeDetail: searchBarSuggestionData[i] },
        });
        break;
      }
    }
  }

  const handleObserver = useCallback((entries) => {
    const target = entries[0]
    if (target.isIntersecting) {
      setPage((prev) => prev + 1)
    }
  }, [])

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (cardLoader.current) observer.observe(cardLoader.current);
  }, [handleObserver]);



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
    dispatch(setInput(newInput)) // need to look more into why we need this
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
    setPage(0);
  }

  function handleChange(newInput) {
    dispatch(setInput(newInput));
  }

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
      />
      <div ref={cardLoader}></div>
    </div>
  );
}
