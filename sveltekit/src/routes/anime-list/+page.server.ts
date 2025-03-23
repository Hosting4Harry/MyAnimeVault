import { query } from '../api/dbConnect';

export const load = async () => {
    try {
        const animes = await query('SELECT * FROM Animes');
        
        const genres = await query('SELECT id as value, title as label FROM genres');
        return { animes, genres };
    } catch (error) {
        console.error('Error reading the anime list:', error);
        return { animes: [] }; // Return an empty array or handle the error as needed
    }
};
