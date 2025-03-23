import type { Anime } from "$lib/types/anime.types";

export const updateFile = async (animeList: Anime[]|Anime) => {
    console.log(animeList)
    try {
        const response = await fetch("/api/anime-list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(animeList),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Network error:", error);
    }
}