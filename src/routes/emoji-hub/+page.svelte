<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let currentPage = $state(1);

	const totalPages = Math.ceil(data.totalEmojis / data.pageSize);

	let visibleEmojis = $derived(data.getEmojisByPage(currentPage));

	function nextPage() {
		if (currentPage < totalPages) currentPage++;
	}

	function prevPage() {
		if (currentPage > 1) currentPage--;
	}
</script>

<div class="container">
	<h1 class="mb-2 text-center text-3xl font-bold">Emoji Hub 😜</h1>
	<p class="mb-16 text-center text-gray-500">
		Render แบบ Client-Side (ดึงข้อมูลจาก emojihub.yurace.pro)
	</p>

	<p class="mb-6 text-center text-gray-500">
		ทั้งหมด {data.totalEmojis} ตัว | หน้า {currentPage} / {totalPages}
	</p>

	<div class="controls">
		<button onclick={prevPage} disabled={currentPage === 1}> &larr; ก่อนหน้า </button>

		<span class="page-info">หน้า {currentPage}</span>

		<button onclick={nextPage} disabled={currentPage === totalPages}> ถัดไป &rarr; </button>
	</div>

	<div class="grid-layout">
        {#each visibleEmojis as emoji}
            <div class="card animate-fade">
                <div class="emoji-icon">
                    {@html emoji.htmlCode[0]}
                </div>
                <div class="name">{emoji.name}</div>
            </div>
        {/each}
    </div>
</div>

<style>
    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
    }

    .controls {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
    }

    button {
        padding: 0.5rem 1rem;
        background-color: #3b82f6;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: opacity 0.2s;
    }

    button:disabled {
        background-color: #d1d5db;
        cursor: not-allowed;
    }

    button:hover:not(:disabled) {
        background-color: #2563eb;
    }

    .grid-layout {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 1rem;
    }

    .card {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 1rem;
        text-align: center;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }

    .emoji-icon {
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
    }

    .name {
        font-size: 0.8rem;
        color: #4b5563;
        text-transform: capitalize;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(5px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade {
        animation: fadeIn 0.3s ease-out;
    }
</style>