import { json, type RequestHandler } from '@sveltejs/kit';
import { executeQuery } from '../dbConnect';

export const GET: RequestHandler = async ({ url }) => {
    let sql = `SELECT * FROM Animes WHERE 1=1`; // `1=1` makes appending conditions easier
    const values: any[] = [];
    
    // Extract query parameters
    const animeName = url.searchParams.get('name');
    const status = url.searchParams.get('status');
    const genreIds = url.searchParams.get('genreIds'); // Expected to be a comma-separated string

    // ✅ Filter by anime name (case-insensitive partial match)
    if (animeName) {
        sql += ` AND title LIKE ?`;
        values.push(`%${animeName}%`); // MySQL LIKE for partial match
    }

    // ✅ Filter by status
    if (status && status !== "all") {
        sql += ` AND status = ?`;
        values.push(status);
    }

    // ✅ Filter by genreIds (checking if any genre matches)
    if (genreIds) {
        const genreArray = genreIds.split(',').map(id => id.trim()); // Convert "1,2,3" to ["1", "2", "3"]
        const genreConditions = genreArray.map(() => `FIND_IN_SET(?, genreIds) > 0`).join(' OR ');
        sql += ` AND (${genreConditions})`;
        values.push(...genreArray);
    }

    try {
        const res = await executeQuery(sql, values);
        return json(res);
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false, message: "Something went wrong." }), { status: 500 });
    }
};


export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();

    try {
        let sql = "";
        let values: any[] = [];

        // ✅ Ensure date is in "YYYY-MM-DD" format or null
        const formatDate = (date: string | null) => date ? new Date(date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

        if (data.id === 0) {
            // Insert new anime entry
            sql = `INSERT INTO Animes (title, status, episodes, episodesWatched, startDate, completionDate, rating, genreIds)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            values = [
                data.title,
                data.status,
                data.episodes,
                data.episodesWatched,
                formatDate(data.startDate),      // ✅ Fixing date format
                formatDate(data.completionDate), // ✅ Fixing date format
                data.rating||0,
                data.genreIds,
            ];
        } else {
            // Update existing anime entry
            sql = `UPDATE Animes 
                   SET title = ?, status = ?, episodes = ?, episodesWatched = ?, startDate = ?, completionDate = ?, rating = ?, genreIds = ?
                   WHERE id = ?`;
            values = [
                data.title,
                data.status,
                data.episodes,
                data.episodesWatched,
                formatDate(data.startDate),      // ✅ Fixing date format
                formatDate(data.completionDate), // ✅ Fixing date format
                data.rating,
                data.genreIds,
                data.id,
            ];
        }
        await executeQuery(sql, values); // Assuming executeQuery runs a single query
        return json({ success: true, message: data.id === 0 ? "Anime added successfully." : "Anime updated successfully." });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false, message: "Something went wrong." }), { status: 500 });
    }
};


