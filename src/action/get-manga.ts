import {MANGA } from "@consumet/extensions";

const manga = new MANGA.MangaDex();

export async function getRecentlyAdded(page:number= 1) {
    try{
        const response = await manga.fetchRecentlyAdded(page);
        return {
            results: response.results,
           currentPage:response.currentPage,
        };
    }catch{
        console.error("Failed to fetch recently added manga");
        return null;
    }
    
}

export async function isWorking(){
    return  manga.isWorking;
}

export async function getPopularManga(page:number=1){
    try{
        const response = await manga.fetchPopular(page);
        return {
            results: response.results,
            currentPage:response.currentPage,
        };
    }catch{
        console.error("Failed to fetch popular manga");
        return null;
    }
}

export async function getLatestUpdates(page:number=1){
    try{
        const response = await manga.fetchLatestUpdates(page);
        return {
            results: response.results,
            currentPage:response.currentPage,
        };
    }catch{
        console.error("Failed to fetch top manga");
        return null;
    }
}

export async function searchManga(query:string){
    if(!query)
    {
        return null;
    }
    try{
        const response = await manga.search(query);
        return response.results;
    }catch{
        console.error("Failed to fetch Search Result");
        return null;
    }
}

export async function getMangaDetail(id:string){
    try{
        const response = await manga.fetchMangaInfo(id);
        return response;
    }catch{
        console.error("failed to fetch Manga Information");
        return null;
    }
}

export async function getChapters(id:string){
    try{
        const response = await manga.fetchChapterPages(id);
        return response;
    }catch{
        console.error("Failed to fetch chapters");
        return null;
    }
    
}