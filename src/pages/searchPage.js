// components
import SearchBar from "../Components/SearchBar/SearchBar";
import CardList from "../Components/CardList/CardList";
import Header from "../Components/Header/Header";
import { MAL_KEY } from "../secret";

// import custom hooks
import { debounce } from "../Hooks/useDebouncer";
import { setInput } from "../redux/searchSlice";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";
import { fetchSearchList, organizeData } from "../Utils/utils";
import QueryContainer from "../Components/QueryContainer/QueryContainer";
import {
  concatenateSuggestion,
  setSuggestion,
} from "../redux/searchSuggestion";

export default function SearchPage() {
  let { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.dark);

  const input = useSelector((state) => state.searchInput.input);
  // const [searchBarSuggestionData, setSearchBarSuggestionData] = useState([]);
  const [cardListSuggestionData, setCardListSuggestionData] = useState([]);
  const [page, setPage] = useState({ currentPage: 1, hasNext: false });

  const cardLoader = useRef(null);
  const haveScroll = useRef(false);

  // a wrapper function that concatenate the new suggestion to the search bar
  function addSearchBarSuggestionData(newInput) {
    dispatch(concatenateSuggestion(newInput));
  }

  // a wrapper function that set the new suggestion of the search bar
  function setSearchBarSuggestionData(newInput) {
    dispatch(setSuggestion(newInput));
  }

  document.addEventListener("scroll", () => {
    haveScroll.current = true;
  });

  // this will consider the first render as well
  useEffect(() => {
    console.log("page rerender", page);
    if (id.length !== 0) {
      // without changing input you can prevent one fetch
      // dispatch(setInput(id)); // need to search why this is needed // needed because if you reload the link on that page when you erase the input the suggestion will stay the same
      fetchSearchList(id, page.currentPage).then((data) => {
        let temp = data.map((ele) => {
          return organizeData(ele);
        });
        addSearchBarSuggestionData(temp);
        if (page.currentPage === 1) {
          setCardListSuggestionData(temp);
        } else {
          setCardListSuggestionData([...cardListSuggestionData, ...temp]);
        }
      });
    } else {
      setSearchBarSuggestionData([]);
      setCardListSuggestionData([]);
    }
  }, [page]);

  // useEffect(() => {
  //   if (input.length !== 0) {
  //     fetchSearchList(input, 0).then((data) => {
  //       setSearchBarSuggestionData(
  //         data.map((ele) => {
  //           return organizeData(ele);
  //         })
  //       );
  //     });
  //   } else {
  //     setSearchBarSuggestionData([]);
  //   }
  // }, [input]);

  // function handleClickEleSearchBar(data) {
  //   for (let i = 0; i < searchBarSuggestionData.length; i++) {
  //     if (searchBarSuggestionData[i].title === data) {
  //       navigate(`/${searchBarSuggestionData[i].id}`, {
  //         state: { animeDetail: searchBarSuggestionData[i] },
  //       });
  //       break;
  //     }
  //   }
  // }

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && haveScroll.current) {
      console.log("page intersecting");
      setPage((prev) => {
        return { ...prev, currentPage: prev.currentPage + 1 };
      });
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (cardLoader.current) observer.observe(cardLoader.current);
  }, [handleObserver]);

  function handleClickCard(selectId) {
    for (let i = 0; i < cardListSuggestionData.length; i++) {
      if (cardListSuggestionData[i].id === selectId) {
        navigate(`/${selectId}`, {
          state: { animeDetail: cardListSuggestionData[i] },
        });
        break;
      }
    }
  }

  // function handleSubmitSearchBar(newInput) {
  //   dispatch(setInput(newInput)) // need to look more into why we need this
  //   console.log("submit called");
  //   if (newInput.length !== 0) {
  //     fetchSearchList(newInput, 0).then((data) => {
  //       let temp = data.map((ele) => {
  //         return organizeData(ele);
  //       });
  //       setSearchBarSuggestionData(temp);
  //       setCardListSuggestionData(temp);
  //     });
  //   } else {
  //     setSearchBarSuggestionData([]);
  //     setCardListSuggestionData([]);
  //   }
  //   navigate(`/search/${newInput}`);
  //   setPage(0);
  // }

  function handleSubmitSearchBar(newInput) {
    // dispatch(setInput(newInput)) // need to look more into why we need this
    setPage({ ...page, currentPage: 1 }); // this will trigger the useEffect to fetch data
    haveScroll.current = false;
    // if (newInput.length !== 0) {
    //   fetchSearchList(newInput, 0).then((data) => {
    //     let temp = data.map((ele) => {
    //       return organizeData(ele);
    //     });
    //     setSearchBarSuggestionData(temp);
    //     setCardListSuggestionData(temp);
    //   });
    // } else {
    //   setSearchBarSuggestionData([]);
    //   setCardListSuggestionData([]);
    // }
  }

  // function handleChange(newInput) {
  //   dispatch(setInput(newInput));
  // }

  // console.log(observer);

  return (
    <div className={`App ${isDark ? "App--Dark" : "App--Light"}`}>
      <Header />
      <QueryContainer initValue={id} onSubmit={handleSubmitSearchBar} />
      {/* <div className="Search__section">
        <div className="Search__container">
          <SearchBar
            initVal={id}
            dataArray={searchBarSuggestionData.map((data) => data.title)}
            onChange={debounce(handleChange, 500)}
            onClickEle={handleClickEleSearchBar}
            onSubmit={handleSubmitSearchBar}
          />
        </div>
      </div> */}
      <CardList datas={cardListSuggestionData} onClickCard={handleClickCard} />
      <div className="card--loader" ref={cardLoader}></div>
    </div>
  );
}
