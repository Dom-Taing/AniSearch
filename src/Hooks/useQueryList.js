import React, {useState, useEffect} from "react"

// a custom hook to reuse logic for search bar and it's suggestion list
export function useQueryList() {
  const [input, setInput] = useState("");
  const [suggestionData, setSuggestion] = useState([]);

  useEffect(() => {
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
      // let URL = "https://graphql.anilist.co/";
      // let options = {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      //   body: JSON.stringify({
      //     query: query,
      //     variables: variables,
      //   }),
      // };
      // fetch(URL, options);
    } else {
      // there's no input to search
      setSuggestion([]);
    }
  }, [input]);

  return {setInput, suggestionData, setSuggestion}
}
