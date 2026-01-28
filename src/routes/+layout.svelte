<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<nav>
	<ul class="flex justify-between">
		<li>
			<a href="/">Home</a>
		</li>
		<li>
			<a href="/about">About</a>
		</li>
		<li>
			<a href="/artists">Artists</a>
		</li>
	</ul>
</nav>

<main class="mt-4 mx-8">
	{@render children()}
</main>