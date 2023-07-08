export async function fetchSearchList(input, page) {
  console.log("fetch searchlist called");
  const URL = `https://api.jikan.moe/v4/anime?letter=${input}&sfw&order_by=popularity&sort=asc&page=${page}`;
  let fetchResult = await fetch(URL);
  let fetchJson = await fetchResult.json();
  let data = fetchJson.data.filter((ele) => ele.approved);
  // data = data.sort((a, b) => a.popularity - b.popularity);
  return data;
}

export async function fetchAnimeDetail(id) {
  console.log("fetch one called");
  let URL = `https://api.jikan.moe/v4/anime/${id}/full`;
  let fetchResult = await fetch(URL);
  let fetchJson = await fetchResult.json();
  return fetchJson.data;
}

export function organizeData(data) {
  return {
    title: data.title ? data.title : "",
    id: data.mal_id ? data.mal_id : -1,
    image: data.images ? data.images.jpg.large_image_url : "",
    synopsis: data.synopsis ? data.synopsis : "",
    genres: data.genres ? data.genres.map((item) => item.name) : [],
    trailer: data.trailer ? data.trailer.url : "",
    sources: data.streaming ? data.streaming : [],
  };
}

export function organizeAniListData(data) {
  let trailer = "";
  if (data.trailer && data.trailer.site === "youtube") {
    trailer = `https://www.youtube.com/watch?v=${data.trailer.id}`;
  }
  let sources = data.externalLinks.filter((ele) => ele.type === "STREAMING");
  sources = sources.map((ele) => {
    return { name: ele.site, url: ele.url };
  });

  return {
    title: data.title ? data.title.romaji : "",
    id: data.idMal ? data.idMal : -1,
    image: data.coverImage ? data.coverImage.extraLarge : "",
    synopsis: data.description ? data.description : "",
    genres: data.genres ? data.genres : [],
    trailer: trailer,
    sources: sources,
  };
}
