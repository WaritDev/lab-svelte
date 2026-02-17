<script lang="ts">
	import type { PageProps } from './$types';
	import { fade, fly } from 'svelte/transition';

	let { data }: PageProps = $props();

	const artists = $derived(data.artists ?? []);
	const totalArtists = $derived(artists.length);
</script>

<div class="mx-auto max-w-7xl px-6 py-12">
	<header class="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
		<div class="space-y-1 text-center md:text-left">
			<h1 class="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
				ศิลปินทั้งหมด
			</h1>
		</div>

		<a
			href="/artists/create"
			class="group inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300 active:scale-95"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform group-hover:rotate-90" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
			</svg>
			เพิ่มศิลปินใหม่
		</a>
	</header>

	{#if totalArtists === 0}
		<section in:fade class="flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-slate-200 bg-slate-50/50 py-32 text-center">
			<div class="mb-4 rounded-full bg-white p-6 shadow-sm">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
				</svg>
			</div>
			<h3 class="text-xl font-bold text-slate-800">ยังไม่มีข้อมูลศิลปิน</h3>
			<p class="mt-1 text-slate-500">เริ่มเพิ่มศิลปินคนแรกของคุณโดยการกดปุ่มด้านบน</p>
		</section>
	{:else}
		<section class="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
			{#each artists as artist, i (artist.id)}
				<div 
					in:fly={{ y: 20, delay: i * 50 }}
					class="group relative flex flex-col rounded-[2rem] border border-slate-100 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/10"
				>
					<div class="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-slate-100">
						{#if artist.image_path}
							<img
								src={artist.image_path}
								alt={artist.name}
								loading="lazy"
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
							/>
						{:else}
							<div class="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 text-slate-400">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
								</svg>
							</div>
						{/if}
						
						<a href="/artists/{artist.id}" class="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
							<span class="sr-only">ดูรายละเอียด {artist.name}</span>
						</a>
					</div>

					<div class="flex flex-col items-center p-4 text-center">
						<h2 class="w-full truncate text-lg font-black text-slate-800 transition-colors group-hover:text-blue-600">
							{artist.name}
						</h2>
						<span class="mt-1 inline-flex items-center rounded-full bg-slate-100 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
							Artist Profile
						</span>
					</div>
				</div>
			{/each}
		</section>

		<footer class="mt-20 flex flex-col items-center gap-4">
			<div class="h-px w-24 bg-slate-200"></div>
			<p class="text-sm font-medium text-slate-400">
				คุณได้ชมศิลปินทั้งหมดในระบบแล้ว
			</p>
		</footer>
	{/if}
</div>

<style>
	:global(body) {
		background-color: #f8fafc;
	}
</style>