<script lang="ts">
    import { theme } from '$lib/stores/theme.svelte';
</script>

<button 
    on:click={() => theme.toggle()}
    class="relative inline-flex items-center justify-center p-2 rounded-full transition-all duration-300
            bg-slate-100 text-slate-600 hover:bg-slate-200
            dark:bg-slate-800 dark:text-yellow-400 dark:hover:bg-slate-700
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
    aria-label="Toggle Dark Mode"
>
    <svg class="w-5 h-5 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
    </svg>

    <svg class="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 24.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
    </svg>
    
    <span class="ml-2 text-sm font-medium hidden sm:block">
        {theme.isDark ? 'Dark' : 'Light'}
    </span>
</button>