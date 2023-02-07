export async function fetchSearchList(input, page) {
  console.log("fetch searchlist called");
  const URL = `https://api.jikan.moe/v4/anime?letter=${input}&sfw&order_by=popularity&sort=asc&page=${page}`;
  let fetchResult = await fetch(URL);
  let fetchJson = await fetchResult.json();
  let data = fetchJson.data.filter((ele) => ele.approved);
  data = data.sort((a, b) => a.popularity - b.popularity);
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
    title: data.title,
    id: data.mal_id,
    image: data.images.jpg.large_image_url,
    synopsis: data.synopsis,
    genres: data.genres.map((item) => item.name),
    trailer: data.trailer.url,
    sources: data.streaming ? data.streaming : [],
  };
}
