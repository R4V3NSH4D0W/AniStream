// app/actions/get-anime.ts
import { ANIME } from "@consumet/extensions";

const zoroAnime = new ANIME.Zoro();

export type AnimeCategory = 
  "top-airing" | 
  "most-favorite" | 
  "most-popular" | 
  "movie" | 
  "latest-completed"|
  "recently-added";

export async function fetchAnimeList(
  category: AnimeCategory,
  page: number = 1
) {
  try {
    let response;
    switch (category) {
      case "top-airing":
        response = await zoroAnime.fetchTopAiring(page);
        break;
      case "most-favorite":
        response = await zoroAnime.fetchMostFavorite(page);
        break;
      case "most-popular":
        response = await zoroAnime.fetchMostPopular(page);
        break;
      case "movie":
        response = await zoroAnime.fetchMovie(page);
        break;
      case "recently-added":
        response = await zoroAnime.fetchRecentlyAdded(page);
        break;
        case "latest-completed":
        response = await zoroAnime.fetchLatestCompleted(page);
        break
      default:
        throw new Error("Invalid anime category");
    }

    return {
      results: response.results,
      hasNextPage: response.hasNextPage,
      currentPage: page
    };
  } catch (error) {
    console.error(`Error fetching ${category} data:`, error);
    return { 
      results: [], 
      hasNextPage: false, 
      currentPage: page 
    };
  }
}

export async function getSpotLight() {
  try {
    const spotlight = await zoroAnime.fetchSpotlight();
    return Array.isArray(spotlight.results) ? spotlight.results : [];
  } catch (error) {
    console.error("Error fetching spotlight data:", error);
    return [];
  }
}


export async function getGernres() {
    try{
        return await zoroAnime.fetchGenres();
    }catch(error){
        console.error("Error fetching Genre",error)
        return null;
    }
    
}

export async function getSchedule(date?:string){
    try{
        const response= await zoroAnime.fetchSchedule(date);
        return response.results;
    }catch(error){
        console.error("Error fetching Genre",error)
        return null;
    }

}

export async function getAnimeInfo(id: string) {
  try {
    const animeInfo = await zoroAnime.fetchAnimeInfo(id);
    const malId = animeInfo?.malID || animeInfo?.alID;
    let jikanData = null;

    if (malId) {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${malId}`);
        jikanData = await response.json();
      } catch (jikanError) {
        console.error("Error fetching anime info from Jikan:", jikanError);
      }
    }
    return {
      ...animeInfo,
      jikanData: jikanData?.data || null,
    };
  } catch (error) {
    console.error("Error fetching anime info:", error);
    return null;
  }
}
