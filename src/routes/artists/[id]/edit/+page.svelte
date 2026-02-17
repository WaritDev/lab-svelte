<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData, ActionData, SubmitFunction } from './$types';
    import { fade, fly } from 'svelte/transition';

    let { data, form }: { data: PageData, form: ActionData } = $props();
    
    // svelte-ignore state_referenced_locally
    let previewUrl = $state<string | null>(data.artist.image_path);
    let isSubmitting = $state(false);
    
    const handleFileChange = (e: Event) => {
        const input = e.target as HTMLInputElement;
        if (input.files?.[0]) {
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
            previewUrl = URL.createObjectURL(input.files[0]);
        }
    };
    
    const handleSubmit: SubmitFunction = () => {
        isSubmitting = true;
        return async ({ update }) => {
            await update();
            isSubmitting = false;
        };
    };
</script>

    <div class="mx-auto max-w-xl" in:fly={{ y: 20, duration: 500 }}>
        
        <header class="mb-10 flex items-center justify-between">
            <div>
                <h1 class="text-3xl font-black tracking-tight text-slate-900">Edit Artist</h1>
            </div>
            <a href="/artists/{data.artist.id}" class="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors">
                Cancel
            </a>
        </header>

        <main class="rounded-[2.5rem] border border-slate-100 bg-white p-10 md:p-12">
            <form 
                method="POST" 
                enctype="multipart/form-data" 
                use:enhance={handleSubmit} 
                class="space-y-8"
            >
                <div class="space-y-2">
                    <label for="name" class="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                        Artist Name
                    </label>
                    <input 
                        type="text" 
                        name="name"
                        id="name"
                        placeholder="ระบุชื่อศิลปิน"
                        disabled={isSubmitting}
                        value={form?.data?.name ?? data.artist.name}
                        class="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-slate-900 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50/50 disabled:opacity-50"
                    />
                    {#if form?.errors?.name}
                        <p class="text-xs font-medium text-red-500 mt-2 ml-1" in:fade>{form.errors.name[0]}</p>
                    {/if}
                </div>

                <div class="space-y-4">
                    <label for="image" class="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                        Profile Image
                    </label>
                    
                    <div class="flex items-center gap-6">
                        <div class="relative h-28 w-28 shrink-0 overflow-hidden rounded-[2rem] border border-slate-100 bg-slate-50 shadow-inner">
                            {#if previewUrl}
                                <img src={previewUrl} alt="Preview" class="h-full w-full object-cover" />
                            {:else}
                                <div class="flex h-full w-full items-center justify-center text-slate-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            {/if}
                        </div>

                        <div class="flex flex-col gap-2">
                            <input 
                                type="file" 
                                name="image"
                                id="image"
                                accept="image/*"
                                onchange={handleFileChange}
                                disabled={isSubmitting}
                                class="block w-full text-xs text-slate-400
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-xl file:border-0
                                    file:text-xs file:font-bold
                                    file:bg-slate-900 file:text-white
                                    hover:file:bg-blue-600 file:transition-colors
                                    file:cursor-pointer disabled:opacity-50"
                            />
                        </div>
                    </div>
                    
                    {#if form?.errors?.image}
                        <p class="text-xs font-medium text-red-500 mt-2 ml-1" in:fade>{form.errors.image[0]}</p>
                    {/if}
                </div>

                <div class="pt-4">
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        class="relative w-full overflow-hidden rounded-2xl bg-slate-900 py-4 font-bold text-white transition-all hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200 active:scale-[0.98] disabled:bg-slate-200"
                    >
                        {#if isSubmitting}
                            <div class="flex items-center justify-center gap-2">
                                <svg class="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving Changes...
                            </div>
                        {:else}
                            Update Artist Profile
                        {/if}
                    </button>
                </div>
            </form>
        </main>
    </div>