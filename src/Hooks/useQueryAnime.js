import React, { useState, useEffect } from "react";

export function useQueryAnime() {
  const [selectId, setSelectId] = useState(null);
  const [selectData, setSelectData] = useState(undefined);
  useEffect(() => {
    if (selectId) {
      let URL = `https://api.jikan.moe/v4/anime/${selectId}/full`;
      fetch(URL)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setSelectData(data.data);
          if (id) {
            setInput(data.data.title);
          }
        });
      // let URL = `https://api.myanimelist.net/v2/anime/${selectId}`;
      // fetch(URL, {
      //   method: "GET",
      //   headers: {
      //     "X-MAL-CLIENT-ID": MAL_KEY,
      //     "Access-Control-Allow-Origin": '*'
      //   }
      // })
      // .then((res) => res.json())
      // .then((data) => {
      //   console.log(data)
      // })
    }
  }, [selectId]);

  return { setSelectId, selectData };
}
