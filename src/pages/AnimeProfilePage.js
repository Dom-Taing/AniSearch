// import components
import SearchBar from "../Components/SearchBar/SearchBar";
import AnimeProfile from "../Components/Card/AnimeProfile";
import Header from "../Components/Header/Header"
import { MAL_KEY } from "../secret";

// import custom hooks
import { debounce } from "../Hooks/useDebouncer";
import { useQueryList } from "../Hooks/useQueryList";
import { useQueryAnime } from "../Hooks/useQueryAnime";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";
import { setInput } from "../redux/searchSlice";
import { fetchAnimeDetail, organizeData, fetchSearchList } from "../Utils/utils";
import QueryContainer from "../Components/QueryContainer/QueryContainer";
const query = `
`;

export default function AnimeProfilePage() {
  let { id } = useParams();
  const location = useLocation();

  const input = useSelector((state) => state.searchInput.input);
  // const [suggestionData, setSuggestionData] = useState([]);

  const [animeDetail, setAnimeDetail] = useState(
    location.state ? location.state.animeDetail : undefined
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.dark);

  useEffect(() => {
    console.log("location data", location)
    if (!location.state) {
      fetchAnimeDetail(id).then((data) => {
        setAnimeDetail(organizeData(data));
        dispatch(setInput(data.title))
      });
    }
  }, []);

  // useEffect(() => {
  //   if (input.length !== 0) {
  //     fetchSearchList(input, 0).then((data) => {
  //       setSuggestionData(
  //         data.map((ele) => {
  //           return organizeData(ele);
  //         })
  //       );
  //     });
  //   } else {
  //     setSuggestionData([])
  //   }
  // }, [input]);

  // function handleClickEle(data) {
  //   console.log("click ele")
  //   for (let i = 0; i < suggestionData.length; i++) {
  //     if (suggestionData[i].title === data) {
  //       dispatch(setInput(data));
  //       setAnimeDetail(suggestionData[i])
  //       navigate(`/${suggestionData[i].id}`);
  //       break;
  //     }
  //   }
  // }

  function handleClickEle(data) {
    setAnimeDetail(data)
  }

  // function handleSubmit(data) {
  //   navigate(`/search/${data}`);
  // }

  // function handleChange(newInput) {
  //   dispatch(setInput(newInput));
  // }

  return (
    <div className={`App ${isDark ? "App--Dark" : "App--Light"}`}>
      <Header />
      <QueryContainer initValue={id && animeDetail ? animeDetail.title : ""} onClickEle={handleClickEle}/>
      {/* <div className="Search__section">
        <div className="Search__container">
          <SearchBar
            initVal={id && animeDetail ? animeDetail.title : ""}
            dataArray={suggestionData.map((data) => data.title)}
            onChange={debounce(handleChange, 500)}
            onClickEle={handleClickEle}
            onSubmit={handleSubmit}
          />
        </div>
      </div> */}
      {animeDetail && <AnimeProfile animeDetail={animeDetail} />}
    </div>
  );
}
