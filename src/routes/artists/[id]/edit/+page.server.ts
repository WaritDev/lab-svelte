import { fail, error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import apiClient, { withAuth } from '$lib/server/api-clients.server';
import { AxiosError } from 'axios';

export const load: PageServerLoad = async ({ params, cookies }) => {
    const id = params.id; 
    const token = cookies.get('token');

    if (!token) {
        throw redirect(303, '/login');
    }

    try {
        const response = await apiClient.get(`/artists/${id}`, withAuth(token));
        return {
            artist: response.data.data
        };
    } catch (err) {
        console.error(err);
        throw error(404, 'ไม่พบข้อมูลศิลปิน');
    }
};

export const actions: Actions = {
    default: async ({ request, params, cookies }) => {
        const formData = await request.formData();
        const id = params.id;
        const token = cookies.get('token');
        
        if (!token) {
            throw redirect(303, '/login');
        }

        formData.append('_method', 'PUT');
        
        try {
            await apiClient.post(`/artists/${id}`, formData, withAuth(token));
        } catch (err) {
            if (err instanceof AxiosError && err.response?.status === 422) {
                const data = Object.fromEntries(formData);
                delete data.image; 
                
                return fail(422, {
                    errors: err.response.data.errors,
                    data: data 
                });
            }
            throw error(500, 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
        
        throw redirect(303, `/artists/${id}`);
    }
};