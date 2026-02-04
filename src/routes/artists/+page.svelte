<script lang="ts">
    import type { PageProps } from './$types';
    const { data } : PageProps = $props();
    const { artists } = data;
</script>

<h1 class="text-2xl font-bold mb-6">รายชื่อศิลปิน</h1>

<ul>
    {#each artists as artist}
        <li class="mb-4 border p-4 rounded shadow-sm">
            <h2 class="text-xl font-bold">
                <a href={`/artists/${artist.id}`}>{artist.name}</a>
            </h2>
        </li>
    {/each}
</ul>