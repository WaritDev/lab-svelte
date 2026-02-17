<script lang="ts">
	import type { PageProps, SubmitFunction } from './$types';
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';

	let { data }: PageProps = $props();
	
	const artist = $derived(data.artist);
	let isDeleting = $state(false);

	const handleDelete: SubmitFunction = ({ cancel }) => {
		if (!confirm(`คุณแน่ใจหรือไม่ที่จะลบ "${artist.name}"?`)) {
			return cancel();
		}

		isDeleting = true;
		return async ({ update }) => {
			await update();
			isDeleting = false;
		};
	};
</script>

	<div class="mx-auto max-w-5xl">
		
		<a href="/artists" class="group mb-10 inline-flex items-center gap-3 text-slate-400 transition-colors hover:text-slate-900">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
			</svg>
			<span class="text-sm font-bold uppercase tracking-[0.1em]">All Artists</span>
		</a>

		<main in:fade={{ duration: 300 }} class="overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white md:flex">
			
			<div class="relative h-96 w-full shrink-0 bg-slate-50 md:h-auto md:w-[400px]">
				{#if artist.image_path}
					<img 
						src={artist.image_path} 
						alt={artist.name} 
						class="h-full w-full object-cover" 
					/>
				{:else}
					<div class="flex h-full w-full items-center justify-center text-slate-200">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
						</svg>
					</div>
				{/if}
			</div>

			<div class="flex flex-col justify-center p-12 md:p-16 w-full">
				<header class="mb-8">
					<div class="mb-3 flex items-center gap-3">
						<span class="rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
							Artist ID: {artist.id}
						</span>
					</div>
					<h1 class="text-5xl font-black tracking-tight text-slate-900 md:text-6xl">
						{artist.name}
					</h1>
				</header>

				<div class="space-y-6">
					<div class="border-l-2 border-slate-100 pl-6 py-1">
						<p class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Resource Path</p>
						<p class="mt-1 break-all text-sm font-medium text-slate-600 leading-relaxed">
							{artist.image_path || 'No source provided'}
						</p>
					</div>
				</div>

				<footer class="mt-12 flex flex-wrap items-center gap-4">
					<a 
						href="/artists/{artist.id}/edit" 
						class="inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 px-8 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-95"
					>
						Edit Profile
					</a>

					<form 
						action="?/delete" 
						method="POST" 
						use:enhance={handleDelete}
					>
						<button 
							type="submit" 
							disabled={isDeleting}
							class="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-8 text-sm font-bold text-red-600 transition-all hover:bg-red-50 disabled:opacity-50 active:scale-95"
						>
							{#if isDeleting}
								<svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Removing...
							{:else}
								Delete Artist
							{/if}
						</button>
					</form>
				</footer>
			</div>
		</main>
	</div>