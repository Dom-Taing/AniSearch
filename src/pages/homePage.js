// import components
import SearchBar from "../Components/SearchBar/SearchBar";
import Header from "../Components/Header/Header";

// import custom hooks
import { debounce } from "../Hooks/useDebouncer";
import { setInput } from "../redux/searchSlice";

import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";
import {
  fetchSearchList,
  organizeAniListData,
  organizeData,
} from "../Utils/utils";
import QueryContainer from "../Components/QueryContainer/QueryContainer";
import Carousels from "../Components/Carousels/Carousels";
import { useInfiniteScroll } from "../Hooks/useInfiniteScroll";

const query = `
  query getFrontPage($thisSeasonPage: Int, $season: MediaSeason, $seasonYear: Int, $thisSeasonSort: [MediaSort], $topAnimePage: Int, $topAnimeSort: [MediaSort], $perPage: Int, $type: MediaType) {
    thisSeason: Page(page: $thisSeasonPage, perPage: $perPage) {
      pageInfo {
        currentPage
        hasNextPage
        perPage
      }
      media(season: $season, seasonYear: $seasonYear, type: $type, sort: $thisSeasonSort) {
        id
        idMal
        title {
          romaji
          english
        }
        coverImage {
          extraLarge
        }
        description
        genres
        trailer {
          site
          id
        }
        externalLinks {
          url
          type
          site
        }
      }
    }
    topAnime: Page(page: $topAnimePage, perPage: $perPage) {
      pageInfo {
        currentPage
        hasNextPage
        perPage
      }
      media(sort: $topAnimeSort, type: $type) {
        id
        idMal
        title {
          romaji
          english
        }
        coverImage {
          extraLarge
        }
        description
        genres
        trailer {
          site
          id
        }
        externalLinks {
          url
          type
          site
        }
      }
    }
  }
`;

let variables = {
  thisSeasonPage: 1,
  season: getCurrSeasonData().season,
  seasonYear: getCurrSeasonData().seasonYear,
  thisSeasonSort: "POPULARITY_DESC",
  topAnimePage: 1,
  topAnimeSort: "POPULARITY_DESC",
  perPage: 20,
  type: "ANIME",
};

function getCurrSeasonData() {
  let currDate = new Date();
  let month = currDate.getMonth();
  let year = currDate.getFullYear();
  let season;
  if (0 <= month && month <= 2) {
    season = "WINTER";
  } else if (3 <= month && month <= 5) {
    season = "SPRING";
  } else if (6 <= month && month <= 8) {
    season = "SUMMER";
  } else {
    season = "FALL";
  }
  return { season: season, seasonYear: year };
}

export default function HomePage() {
  const input = useSelector((state) => state.searchInput.input);
  const isDark = useSelector((state) => state.theme.dark);

  const [thisSeasonData, setThisSeasonData] = useState([]);
  const [topAnimeData, setTopAnimeData] = useState([]);
  const [recentlyUpdatedData, setRecentlyUpdated] = useState([]);

  const { items, lastItemsRef, containerRef } = useInfiniteScroll(
    fetcher,
    combiner
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function fetcher(page) {
    const res = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: { ...variables, thisSeasonPage: page, topAnimePage: page },
      }),
    });
    const data = await res.json();
    let thisSeason = data.data.thisSeason.media.map((ele) => {
      return organizeAniListData(ele);
    });
    let topAnime = data.data.topAnime.media.map((ele) => {
      return organizeAniListData(ele);
    });
    return { thisSeason, topAnime };
  }

  function combiner(prev, curr) {
    return {
      thisSeason: prev.thisSeason
        ? [...prev.thisSeason, ...curr.thisSeason]
        : [...curr.thisSeason],
      topAnime: prev.topAnime
        ? [...prev.topAnime, ...curr.topAnime]
        : [...curr.topAnime],
    };
  }

  useEffect(() => {
    // fetch("https://api.jikan.moe/v4/seasons/now")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     let temp = data.data.map((ele) => {
    //       return organizeData(ele);
    //     });
    //     // console.log(temp);
    //     setThisSeasonData(temp);
    //   });
    // fetch("https://api.jikan.moe/v4/top/anime")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     let temp = data.data.map((ele) => {
    //       return organizeData(ele);
    //     });
    //     setTopAnimeData(temp);
    //   });
    // fetch("https://api.jikan.moe/v4/watch/episodes")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("data", data);

    //     let temp = data.data.map((ele) => {
    //       return organizeData(ele.entry);
    //     });
    //     // let temp = data.data.map((ele) => {

    //     // })
    //     setRecentlyUpdated(temp);
    //   });
    fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        let thisSeason = data.data.thisSeason.media.map((ele) => {
          return organizeAniListData(ele);
        });
        let topAnime = data.data.topAnime.media.map((ele) => {
          return organizeAniListData(ele);
        });
        setThisSeasonData(thisSeason);
        setTopAnimeData(topAnime);
        console.log("Anilist Data", data);
        console.log("this Season", thisSeason);
        console.log("top Anime", topAnime);
      });
    console.log(variables);
  }, []);

  function handleClickCarouselCard(data) {
    navigate(`/${data.id}`, {
      state: { animeDetail: data },
    });
  }

  return (
    <div className={`App ${isDark ? "App--Dark" : "App--Light"}`}>
      <Header />
      <QueryContainer />
      <div className="CarouselsList">
        {/* {items.thisSeason && ( */}
        <Carousels
          dataList={items.thisSeason}
          title="This Season"
          onClickCard={handleClickCarouselCard}
          containerRef={containerRef}
          lastEle={lastItemsRef}
          // lastEle={(el) => (lastItemRef.current[0] = el)}
        />
        {/* )} */}
        {/* {items.topAnime && ( */}
        <Carousels
          dataList={items.topAnime}
          title="Top Anime"
          onClickCard={handleClickCarouselCard}
          // lastEle={lastItemRef}
          // lastEle={(el) => (lastItemRef.current[1] = el)}
        />
        {/* )} */}
        {/* <Carousels
          dataList={thisSeasonData}
          title="This Season"
          onClickCard={handleClickCarouselCard}
        />
        <Carousels
          dataList={topAnimeData}
          title="Top Anime"
          onClickCard={handleClickCarouselCard}
        /> */}
        {/* <Carousels
          dataList={recentlyUpdatedData}
          title="Recently Updated"
          onClickCard={handleClickCarouselCard}
        /> */}
      </div>
    </div>
  );
}
