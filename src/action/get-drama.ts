import {MOVIES} from '@consumet/extensions'
import { StreamingServers } from '@consumet/extensions';
  

const Drama = new MOVIES.FlixHQ();



  export async function getRecentTVShows() {
    try {
      const response = await Drama.fetchRecentTvShows()
      return {
        results: response,
      }
    } catch (error) {
      console.error(`Error fetching Movie data:`, error)
     return {
        results: [],
    }
  }
  }

  export async function getRecentMovie() {
    try {
      const response = await Drama.fetchRecentMovies()
      return {
        results: response,
      }
    } catch (error) {
      console.error(`Error fetching Movie data:`, error)
     return {
        results: [],
    }
  }
  }

  export async function getTrendingMovie() {
    try {
      const response = await Drama.fetchTrendingMovies()
      return {
        results: response,
      }
    } catch (error) {
      console.error(`Error fetching Movie data:`, error)
     return {
        results: [],
    }
  }
  }

export async function getMovieInfo(id: string) {
    try {
    
      return await Drama.fetchMediaInfo(id);
    } catch (error) {
      console.error("Error fetching movie info:", error);
      return null;
    }
  }

export async function getEpisdoeServers(episodeId: string,mediaId: string) {
    try {
 
      return await Drama.fetchEpisodeServers(episodeId,mediaId);
    } catch (error) {
      console.error("Error fetching movie links:", error);
      return [];
    }
  }

  export async function getEpisodeSources(episodeId: string,mediaId: string,server?: StreamingServers|undefined) {
    try {
 
      return await Drama.fetchEpisodeSources(episodeId,mediaId,server);
    } catch (error) {
      console.error("Error fetching movie links:", error);
      return [];
    }
  }
