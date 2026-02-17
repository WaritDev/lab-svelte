import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import apiClient from '$lib/server/api-clients.server'

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();

        try {
            const response = await apiClient.post('/artists', formData);
            
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