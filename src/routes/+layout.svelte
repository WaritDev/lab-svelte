<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';

	let { children } = $props();

	const isActive = (path: string) =>
		path === '/' ? $page.url.pathname === '/' : $page.url.pathname.startsWith(path);

	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/artists', label: 'Artists' },
		{ href: '/emoji-hub', label: 'Emoji Hub' },
		{ href: '/shop', label: 'Shop' },
		{ href: '/admin', label: 'Admin' }
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="bg-gray-100 border-b shadow-sm">
	<div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
		<a
			href="/"
			class="font-bold text-lg hover:text-blue-600 {isActive('/') ? 'text-blue-600' : ''}"
		>
			Artist And Emoji
		</a>

		<ul class="flex items-center gap-6 text-sm">
			{#each navItems.slice(1) as item}
				<li>
					<a
						href={item.href}
						class="px-3 py-2 rounded hover:text-blue-600 hover:bg-white
						{isActive(item.href) ? 'font-semibold text-blue-600 bg-white' : ''}"
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<main class="max-w-6xl mx-auto mt-6 px-6">
	{@render children()}
</main>

<footer class="text-center text-sm text-gray-500 mt-12 mb-6">
	Copyright © 2026
</footer>