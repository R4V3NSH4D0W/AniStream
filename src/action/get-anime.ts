// app/actions/get-anime.ts
import { ANIME } from "@consumet/extensions";

const zoroAnime = new ANIME.Zoro();

export type AnimeCategory = 
  "top-airing" | 
  "most-favorite" | 
  "most-popular" | 
  "movie" | 
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

export async function getAnimeInfo(id: string) {
  try {
    return await zoroAnime.fetchAnimeInfo(id);
  } catch (error) {
    console.error("Error fetching anime info:", error);
    return null;
  }
}

