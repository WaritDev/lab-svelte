import type { PageServerLoad } from './$types';
import apiClient from '$lib/server/api-clients.server';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions} from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const id = params.id; 
    try {
        const response = await apiClient.get(`/artists/${id}`);
        let artist = null;
        if (response.status === 200) {
            artist = response.data.data;
        }
        else {
            if (response.status === 404) {
                return {
                    status: 404,
                    error: new Error(`Artist ID ${id} not found`)
                };
            }
        }
        return {
            artist
        };
    } catch (error) {
        console.error('Error fetching artist:', error);
    }
};

export const actions: Actions = {
    delete: async ({ params }) => {
        const { id } = params;

        try {
            await apiClient.delete(`/artists/${id}`);
        } catch (err) {
            console.error(err);
            return fail(500, { message: 'ลบไม่สำเร็จ' });
        }

        throw redirect(303, '/artists');
    }
};