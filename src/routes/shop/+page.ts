import type { PageLoad } from './$types';

export const ssr = false;
export const load: PageLoad = async ({ data }) => {
    const { rate } = data;

    const calculateFinalPrice = (price: number) => {
        const discount = price * rate;
        return price - discount;
    };

    return {
        ...data,
        calculateFinalPrice
    };
}