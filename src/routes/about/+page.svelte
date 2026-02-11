<script>
    import {globalCounter} from '$lib/stores/counter.svelte';
</script>

<h1 class="text-3xl font-bold">About Page</h1>

<div>
    <button on:click={() => globalCounter.increment()} class="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        Update Global Count: {globalCounter.count}
    </button>
</div>