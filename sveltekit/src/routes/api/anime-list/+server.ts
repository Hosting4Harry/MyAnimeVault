import { json, type RequestHandler } from '@sveltejs/kit';
import { executeQuery } from '../dbConnect';

export const GET: RequestHandler = async ({ url }) => {
    let sql = `SELECT * FROM Animes WHERE 1=1`;
    const values: any[] = [];

    // Extract query parameters
    const animeName = url.searchParams.get('name');
    const status = url.searchParams.get('status');
    const genreIds = url.searchParams.get('genreIds');

    if (animeName) {
        sql += ` AND title LIKE ?`;
        values.push(`%${animeName}%`);
    }

    if (status && status !== "all") {
        sql += ` AND status = ?`;
        values.push(status);
    }

    if (genreIds) {
        const genreArray = genreIds.split(',').map(id => id.trim());
        const genreConditions = genreArray.map(() => `FIND_IN_SET(?, genreIds) > 0`).join(' OR ');
        sql += ` AND (${genreConditions})`;
        values.push(...genreArray);
    }

    sql += ` ORDER BY updatedAt DESC`;
    try {
        const res = await executeQuery(sql, values);
        return json({
            success: true,
            message: "Anime list fetched successfully.",
            data: res,
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false, message: "Something went wrong.", data: [] }), { status: 500 });
    }
};


export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();

    try {
        let sql = "";
        let values: any[] = [];
        const today = new Date().toISOString().split('T')[0];

        const formatDate = (date: string | null) => date ? new Date(date).toISOString().split('T')[0] : null;

        // Auto-set dates based on status
        let startDate = formatDate(data.startDate);
        let completionDate = formatDate(data.completionDate);

        if (data.status === "completed" && !completionDate) {
            completionDate = today;
        }
        if (data.status !== "completed" && completionDate) {
            completionDate = null
        }

        if (data.status === "watching" && !startDate) {
            startDate = today;
        }

        if (data.id === 0) {
            // Check if the anime already exists
            const checkTitleSQL = `SELECT COUNT(*) as count FROM Animes WHERE title = ?`;
            const checkResult: any = await executeQuery(checkTitleSQL, [data.title]);

            if (checkResult[0].count > 0) {
                return json({ success: false, message: "Anime already exists." });
            }

            sql = `INSERT INTO Animes (title, status, episodes, episodesWatched, startDate, completionDate, rating, genreIds)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            values = [
                data.title,
                data.status,
                data.episodes,
                data.episodesWatched,
                startDate,
                completionDate,
                data.rating || 0,
                data.genreIds,
            ];
        } else {
            sql = `UPDATE Animes 
                   SET title = ?, status = ?, episodes = ?, episodesWatched = ?, startDate = ?, completionDate = ?, rating = ?, genreIds = ?, updatedAt = ?
                   WHERE id = ?`;
            values = [
                data.title,
                data.status,
                data.episodes,
                data.episodesWatched,
                startDate,
                completionDate,
                data.rating,
                data.genreIds,
                new Date().toISOString().replace('T', ' ').replace('Z', ''),
                data.id,
            ];
        }

        await executeQuery(sql, values); // Assuming executeQuery runs a single query
        return json({ success: true, message: data.id === 0 ? "Anime added successfully." : "Anime updated successfully." });

    } catch (error) {
        console.error(error);
        return json({ success: false, message: "Something went wrong." });
    }
};


export const DELETE: RequestHandler = async ({ url }) => {
    const id = url.searchParams.get("id");

    if (!id) {
        return json({ success: false, message: "Anime ID is required." }, { status: 400 });
    }

    try {
        const checkSQL = `SELECT COUNT(*) as count FROM Animes WHERE id = ?`;
        const checkResult: any = await executeQuery(checkSQL, [id]);

        if (checkResult[0].count === 0) {
            return json({ success: false, message: "Anime not found." }, { status: 404 });
        }

        const deleteSQL = `DELETE FROM Animes WHERE id = ?`;
        await executeQuery(deleteSQL, [id]);

        return json({ success: true, message: "Anime deleted successfully." });

    } catch (error) {
        console.error("Error deleting anime:", error);
        return new Response(JSON.stringify({ success: false, message: "Something went wrong." }), { status: 500 });
    }
};
