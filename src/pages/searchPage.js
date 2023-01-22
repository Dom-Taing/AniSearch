// components
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

export default function MainPage() {
  let { id } = useParams();

  const {setInput, suggestionData, setSuggestion} = useQueryList();
  const {selectData, setSelectId} = useQueryAnime();

  const navigate = useNavigate();
  const isDark = useSelector((state) => state.theme.dark)

  useEffect(() => {
    console.log("URL id", id);
    setSelectId(id);
  }, [id]);

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

  // function handleSubmit(data) {
  //   setInput(data);
  //   let URL = `https://api.jikan.moe/v4/anime?q=${data}&nsfw`;
  //   fetch(URL)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     // console.log(data);
  //     let temp = data.data.filter((ele) => ele.approved);
  //     temp = temp.sort((a, b) => a.popularity - b.popularity);
  //     setSuggestion(
  //       temp.map((ele) => {
  //         return { title: ele.title, id: ele.mal_id };
  //       })
  //     );
  //   });
  // }

  function handleChange(newInput) {
    setInput(newInput);
  }

  // let backgroundImage;
  // if (isDark) {
  //   backgroundImage = `linear-gradient( rgba(30,27,38, 0.95), rgba(30,27,38, 0.95)), url(https://images6.alphacoders.com/104/thumb-1920-1042578.png)`
  // } else {
  //   backgroundImage = `linear-gradient( rgba(200,200,200, 0.95), rgba(200,200,200, 0.95)), url(https://ae01.alicdn.com/kf/H780a714db5ac42c39d17d156c90c6f189/Anime-Demon-Slayer-Kimetsu-no-Yaiba-Wall-Murals-Kochou-Shinobu-Wallpaper-Custom-3D-Wallpaper-Bedroom-Cosplay.jpg_640x640.jpg)`
  // }

  // let App_style = {
  //   minHeight: "100vh",
  //   margin: "0",
  //   backgroundSize: "cover",
  //   backgroundRepeat: "no-repeat",
  //   backgroundPosition: "center",
  //   backgroundImage: backgroundImage,
  // };

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
