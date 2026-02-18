import { redirect } from '@sveltejs/kit'; 
import type { PageServerLoad } from './$types';
import apiClient, { withAuth } from '$lib/server/api-clients.server' 

export const load: PageServerLoad = async ({ cookies }) => {

    const token = cookies.get('token');
    
    if (!token) {
        throw redirect(303, '/login');
    }
    try {
        const response = await apiClient.get('/artists', withAuth(token)); 
        if (response.status === 200) {
            return {
                artists: response.data.data,
                pagination: response.data.meta
            };
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        if (err.response?.status === 401 || err.response?.status === 403) {
            cookies.delete('token', { path: '/' });
            throw redirect(303, '/login');
        }
        
        throw err;
    }
}