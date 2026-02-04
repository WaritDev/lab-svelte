import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const id = params.id; 

    const mockData = [
        { id: 1, name: 'Bodyslam' },
        { id: 2, name: 'Tilly Bird' },
        { id: 3, name: 'Three Man Down' }
    ];

    const artist = mockData.find(a => a.id === Number(id)); 

    if (!artist) {
        throw error(404, 'ไม่พบข้อมูลศิลปินนี้ในระบบ')
    }

    return {
        artist
    };
};