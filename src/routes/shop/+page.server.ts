import { env } from '$env/dynamic/private';

export const load = async () => {
    return {
        rate: Number(env.SECRET_DISCOUNT_RATE) 
    };
};