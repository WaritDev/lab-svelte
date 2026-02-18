import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import apiClient, { withAuth } from '$lib/server/api-clients.server'
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals, cookies }) => {
    const token = cookies.get('token');
    if (!token) {
        throw redirect(303, '/login');
    }

    const user = locals.user;
    if (user && user.role !== 'ADMIN') {
        throw redirect(303, '/artists');
    }
};

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const token = cookies.get('token');
        if (!token) {
            throw redirect(303, '/login');
        }
        try {
            const response = await apiClient.post('/artists', formData, withAuth(token));
            
            const newArtistId = response.data.data.id;
            
            throw redirect(303, `/artists/${newArtistId}`);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.status === 303) throw error;

            if (error.response?.status === 422) {
                const data = Object.fromEntries(formData);
                delete data.image;

                return fail(422, {
                    errors: error.response.data.errors,
                    data: data 
                });
            }
            console.log(error);
            return fail(500, { message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
        }
    }
};