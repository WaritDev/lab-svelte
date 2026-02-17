import type { PageServerLoad } from './$types';
import apiClient from '$lib/server/api-clients.server';

export const load: PageServerLoad = async () => {
    try {
        const response = await apiClient.get(`/artists`);
        
        let artists_list = [];
        if (response.status === 200) {
            artists_list = response.data.data;
        }

        return {
            artists: artists_list
        };
    } catch (error) {
        console.error('Error fetching all artists:', error);
        return { artists: [] };
    }
}