import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const id = params.id;
    console.log('SSR id:', id);

    // call api
    const artists = [
        { id: '1', name: 'Artist 1' },
        { id: '2', name: 'Artist 2' },
        { id: '3', name: 'Artist 3' }
    ]
    return { id: id , artists };
}