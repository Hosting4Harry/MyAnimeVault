export type AnimeStatus =
    | "all"
    | "watching"
    | "completed"
    | "plan_to_watch"
    | "dropped";

export interface Anime {
    id: string;
    title: string;
    status: AnimeStatus;
    rating?: number;
    episodes: number;
    episodesWatched: number;
    genre: string[];
    startDate?: string;
    completionDate?: string;
    notes?: string;
}

export interface FilterProps {
    status: AnimeStatus;
    searchQuery: string;
    genre: string;
}