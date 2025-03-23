import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    if (event.url.pathname === "/") {
        throw redirect(303, '/anime-list');
    }
    const response = await resolve(event);

    return response;
};

