<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getEcho } from '$lib/broadcasting/echo';

	let monitoredGenres = [
		{ id: 132, name: 'Pop' },
		{ id: 116, name: 'Rap/Hip Hop' },
		{ id: 152, name: 'Rock' },
		{ id: 110, name: 'Jazz' },
		{ id: 464, name: 'Metal' },
		{ id: 119, name: 'Thai Country' }
	];

	let dashboardState: Record<number, any> = {};

	monitoredGenres.forEach((genre) => {
		dashboardState[genre.id] = {
			name: genre.name,
			isConnected: false,
			error: null,
			syncData: null
		};
	});

	const eventName = '.genre-sync-updated';

	onMount(() => {
		const echo = getEcho();

		if (echo) {
			monitoredGenres.forEach((genre) => {
				const channelName = `genre.${genre.id}`;
				const channel = echo.private(channelName);

				channel.subscribed(() => {
					dashboardState[genre.id].isConnected = true;
					dashboardState = { ...dashboardState };
				});

				channel.listen(eventName, (e: any) => {
					console.log(`[Genre ${genre.id}] Update:`, e);
					dashboardState[genre.id].syncData = e;
					dashboardState = { ...dashboardState };
				});

				channel.error((error: any) => {
					console.error(`[Genre ${genre.id}] Auth Error:`, error);
					dashboardState[genre.id].error = 'Auth Failed';
					dashboardState = { ...dashboardState };
				});
			});
		}
	});

	onDestroy(() => {
		const echo = getEcho();
		if (echo) {
			monitoredGenres.forEach((genre) => {
				echo.leave(`genre.${genre.id}`);
			});
		}
	});
</script>

<div class="p-6 max-w-6xl mx-auto">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">📡 Task Schedule Monitor</h1>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each Object.entries(dashboardState) as [id, state] (id)}
            <div class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                <div class="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                    <span class="font-bold text-gray-700">{state.name} <span class="text-xs text-gray-400 font-normal">({id})</span></span>
                    
                    {#if state.error}
                        <span class="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">❌ {state.error}</span>
                    {:else if state.isConnected}
                        <span class="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Connected
                        </span>
                    {:else}
                        <span class="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full animate-pulse">🟡 Connecting...</span>
                    {/if}
                </div>

                <div class="p-4">
                    {#if state.syncData}
                        <div class="space-y-3">
                            <div class="flex justify-between items-center text-sm">
                                <span class="text-gray-500">สถานะ:</span>
                                {#if state.syncData.state.is_paused}
                                    <span class="text-orange-600 font-semibold">⏸️ Paused</span>
                                {:else if state.syncData.state.is_exhausted}
                                    <span class="text-red-600 font-semibold">🛑 Exhausted</span>
                                {:else}
                                    <span class="text-blue-600 font-semibold">🟢 Active</span>
                                {/if}
                            </div>
                            
                            <div>
                                <div class="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>ความคืบหน้าการดึงข้อมูล</span>
                                    <span>{state.syncData.state.current_index} / {state.syncData.state.max_limit}</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                                         style="width: {Math.min(100, (state.syncData.state.current_index / state.syncData.state.max_limit) * 100)}%">
                                    </div>
                                </div>
                            </div>

                            <div class="mt-4 p-3 bg-green-50 rounded border border-green-100 text-sm">
                                <div class="text-green-800 font-medium">✨ ซิงค์ล่าสุด</div>
                                <div class="text-green-600 mt-1">ได้มาเพิ่ม: <strong>{state.syncData.fetchCount}</strong> เพลง</div>
                            </div>
                        </div>
                    {:else}
                        <div class="h-32 flex items-center justify-center text-gray-400 text-sm flex-col gap-2">
                            <svg class="w-6 h-6 animate-spin text-gray-300" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            รอ Task Schedule ทำงาน...
                        </div>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</div>