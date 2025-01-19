import type { Anime } from '$lib/types/anime.types';
import { randomId } from '$lib/utils';
import { promises as fs } from 'fs';
import path from 'path';

export const load = async () => {
    try {
        const filePath = path.join(process.cwd(), 'static', 'animeList.json');
        const data = await fs.readFile(filePath, 'utf-8');
        const response = JSON.parse(data);
        return { animes: response.animes || dummyData };
    } catch (error) {
        console.error('Error reading the anime list:', error);
        return { props: { animes: dummyData } }; // Return an empty array or handle the error as needed
    }
};


// export const load: PageServerLoad = async () => {
//     // const response = await fetch('/animeList.json');
//     // const animeList = await response.json();
//     // console.log(animeList)
//     return {
//         animes: dummyData
//     }
// }
const dummyData: Anime[] = [
    {
        id: randomId(),
        title: "Attack on Titan",
        status: "completed",
        episodes: 75,
        episodesWatched: 75,
        genre: ["action", "drama", "fantasy"],
        completionDate: "2023-12-20",
        rating: 9.5,
    },
    {
        id: randomId(),
        title: "Demon Slayer",
        status: "watching",
        episodes: 26,
        episodesWatched: 15,
        genre: ["action", "supernatural"],
        startDate: "2024-01-01",
    },
    {
        id: randomId(),
        title: "Death Note",
        status: "completed",
        episodes: 37,
        episodesWatched: 37,
        genre: ["thriller", "supernatural", "psychological"],
        completionDate: "2023-11-15",
        rating: 9.0,
    },
    {
        id: randomId(),
        title: "One Piece",
        status: "watching",
        episodes: 1100,
        episodesWatched: 850,
        genre: ["adventure", "action", "comedy"],
        startDate: "2023-06-01",
    },
    {
        id: randomId(),
        title: "Spy x Family",
        status: "plan_to_watch",
        episodes: 25,
        episodesWatched: 0,
        genre: ["comedy", "action", "slice_of_life"],
    }
]
