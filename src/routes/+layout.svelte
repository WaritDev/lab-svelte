<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import MainMenu from '$lib/components/main-menu.svelte'

	let { children } = $props();
	
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<MainMenu brand="My Brand"></MainMenu>

<div class="h-[200vh] bg-gradient-to-b from-slate-50 to-slate-200 p-10">
    {@render children()}
</div>