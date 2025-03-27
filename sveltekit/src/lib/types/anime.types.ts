export type AnimeStatus =
    | "all"
    | "watching"
    | "completed"
    | "plan_to_watch"
    | "dropped";

export interface Anime {
    id: number;
    title: string;
    status: AnimeStatus;
    rating?: number;
    episodes: number;
    episodesWatched: number;
    genreIds: string;
    startDate?: string;
    completionDate?: string;
    updatedAt?: string;
}

export interface FilterProps {
    status: AnimeStatus;
    searchQuery: string;
    genre: string;
}

export type ComponentProps = {
    name: string;
    animeList: Anime[];
    openEditModal: (anime: Anime) => void;
    deleteAnime: (id: number) => Promise<void>;
    isLoading: boolean;
};