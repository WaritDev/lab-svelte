import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { env } from '$env/dynamic/public';

declare global {
    interface Window {
        Pusher: typeof Pusher;
    }
}

if (typeof window !== 'undefined') {
    window.Pusher = Pusher;
}

let echoInstance: Echo<'reverb'> | null = null;

export const getEcho = (): Echo<'reverb'> | null => {
    if (typeof window === 'undefined') return null;

    if (!echoInstance) {
        echoInstance = new Echo({
            broadcaster: 'reverb',
            key: env.PUBLIC_REVERB_APP_KEY as string,
            wsHost: env.PUBLIC_REVERB_HOST as string,
            wsPort: Number(env.PUBLIC_REVERB_PORT) || 6001,
            wssPort: Number(env.PUBLIC_REVERB_PORT) || 6001,
            forceTLS: (env.PUBLIC_REVERB_SCHEME ?? 'https') === 'https',
            enabledTransports: ['ws', 'wss'],
            disableStats: true,
            authEndpoint: '/api/broadcasting/auth',
			auth: {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                }
			}
        });
    }

    return echoInstance;
};