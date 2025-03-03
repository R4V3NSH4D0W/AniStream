// types/anime.d.ts

export interface AnimeInfo {
    id: string;
    title: string;
    malID: number;
    alID: number;
    japaneseTitle: string;
    description: string;
    episodes: AnimeEpisode[];
    hasDub: boolean;
    hasSub: boolean;
    image: string;
    recommendations: Recommendation[];
    relatedAnime: RelatedAnime[];
    subOrDub: 'sub' | 'dub' | 'both';
    totalEpisodes: number;
    type: string;
    url: string;
    malId?: number;
    genres?: string[];
    status?: MediaStatus;
    releaseDate?: string;
    jikanData: JikanData | null;
  }
  
  export interface AnimeEpisode {
    id: string;
    number: number;
    title: string;
    isFiller: boolean;
    url: string;
    description?: string;
    image?: string;
    airedDate?: string;
  }
  
  export interface JikanData {
    aired: Aired;
    airing: boolean;
    approved: boolean;
    background: string;
    broadcast: Broadcast;
    demographics: Demographic[];
    duration: string;
    episodes: number;
    explicit_genres: Genre[];
    favorites: number;
    genres: Genre[];
    images: ImageUrls;
    licensors: Licensor[];
    mal_id: number;
    members: number;
    popularity: number;
    producers: Producer[];
    rank: number;
    rating: string;
    score: number;
    scored_by: number;
    season: string;
    source: string;
    status: MediaStatus;
    studios: Studio[];
    synopsis: string;
    themes: Theme[];
    title: string;
    title_english: string;
    title_japanese: string;
    title_synonyms: string[];
    titles: Title[];
    trailer: Trailer;
    type: string;
    url: string;
    year: number;
  }
  
  interface Aired {
    from: string;
    to: string | null;
    prop: AiredProp;
    string: string;
  }
  
  interface AiredProp {
    from: DateProp;
    to: DateProp;
  }
  
  interface DateProp {
    day: number;
    month: number;
    year: number;
  }
  
  interface Broadcast {
    day: string;
    time: string;
    timezone: string;
    string: string;
  }
  
  interface Demographic {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }
  
  interface Genre {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }
  
  interface ImageUrls {
    jpg: ImageSizes;
    webp: ImageSizes;
  }
  
  interface ImageSizes {
    image_url: string;
    small_image_url?: string;
    large_image_url?: string;
  }
  
  interface Licensor {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }
  
  interface Producer {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }
  
  interface Studio {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }
  
  interface Theme {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }
  
  interface Title {
    type: string;
    title: string;
  }
  
  interface Trailer {
    youtube_id: string;
    url: string;
    embed_url: string;
    images: TrailerImages;
  }
  
  interface TrailerImages {
    image_url: string;
    small_image_url: string;
    medium_image_url: string;
    large_image_url: string;
    maximum_image_url: string;
  }
  
  interface Recommendation {
    id: string;
    title: string;
    image: string;
    votes?: number;
  }
  
  interface RelatedAnime {
    id: string;
    title: string;
    type: string;
    relationType: string;
  }
  
  type MediaStatus = 
    | 'Currently Airing'
    | 'Finished Airing'
    | 'Not yet aired'
    | 'Cancelled';
  
  export interface IEpisodeSource {
    sources: VideoSource[];
    tracks?: SubtitleTrack[];
    intro?: Timestamp;
    outro?: Timestamp;
  }
  
  interface VideoSource {
    url: string;
    isM3U8?: boolean;
    type?: string;
    quality?: string;
  }
  
  interface SubtitleTrack {
    label: string;
    file: string;
    kind?: 'subtitles' | 'captions' | 'descriptions';
    default?: boolean;
  }
  
  interface Timestamp {
    start: number;
    end: number;
  }

