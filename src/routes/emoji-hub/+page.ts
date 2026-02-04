import type { PageLoad } from './$types';

export const ssr = false;

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('https://emojihub.yurace.pro/api/all');

	if (!response.ok) {
		throw new Error('Could not fetch emojis');
	}

	const allEmojis = await response.json();
	const PAGE_SIZE = 15;
	
	const getEmojisByPage = (page: number) => {
        const startIndex = (page - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        
        return allEmojis.slice(startIndex, endIndex);
    };

	return {
        getEmojisByPage,
        totalEmojis: allEmojis.length,
        pageSize: PAGE_SIZE
    };
};