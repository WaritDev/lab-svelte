<script lang="ts">
    import type { PageProps } from './$types';
    const { data }: PageProps = $props();
    const { artist } = data;
</script>

<h1 class="text-2xl">Artist</h1>
<p>id: { artist.id }</p>
<p>name: {artist.name }</p>