import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {

    // จำลองการเตรียมข้อมูล
    const artists_list = [
        { id: 1, name: 'Bodyslam' },
        { id: 2, name: 'Tilly Bird' },
        { id: 3, name: 'Three Man Down' }
    ];
    
    // ส่งข้อมูลออกไปให้ +page.svelte ผ่านการ return
    // ข้อมูลจะถูกแพ็คใส่กล่องชื่อว่า `data`
    return {
		        artists: artists_list
    };
}