<script lang="ts">
    import type { PageServerData } from './$types';

    export let data: PageServerData;
    const { id } = data;
    const { artists } = data;

    function handleClick() {
        console.log('Artist ID:', id);
    }
</script>

<h1 class="text-3xl font-bold">Artists</h1>
<p>id: {id}</p>
<ul>
    {#each artists as artist}
        <li>{artist.name}</li>
    {/each}
</ul>

<button on:click={handleClick} class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
    Log Artist ID
</button>