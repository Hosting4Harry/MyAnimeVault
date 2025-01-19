import type { RequestHandler } from '@sveltejs/kit';
import { promises as fs } from 'fs';
import path from 'path';



export const POST: RequestHandler = async ({ request }) => {
    const animeList = await request.json();
    
    try {
        const filePath = path.join(process.cwd(), 'static', 'animeList.json');
        const animesJSON = {
            animes: animeList
        }
        await fs.writeFile(filePath, JSON.stringify(animesJSON, null, 2));
        return new Response('Anime list updated!', { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ success: false, message: "Something went wrong." }), { status: 500 });
    }
};
