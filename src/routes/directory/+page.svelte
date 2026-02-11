<script lang="ts">
    import type { PageProps } from './$types';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    let { data }: PageProps = $props();

    const departments = ['All', 'Engineering', 'Marketing', 'Management'];

    function updateFilter(key: string, value: string) {
        const newUrl = new URL($page.url);
        
        if (value && value !== 'All') {
            newUrl.searchParams.set(key, value);
        } else {
            newUrl.searchParams.delete(key);
        }

        goto(newUrl, {
            keepFocus: true,
            replaceState: true,
            noScroll: true
        });
    }
</script>

<div class="min-h-screen bg-slate-50 p-8 font-sans">
    <div class="max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold text-slate-800 mb-6">Employee Directory</h1>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8 space-y-4">
            
            <div>
                <label for="search" class="block text-sm font-medium text-slate-700 mb-1">ค้นหาชื่อ</label>
                <input 
                    type="text"
                    id="search"
                    value={data.filters.q}
                    oninput={(e) => updateFilter('q', e.currentTarget.value)}
                    placeholder="พิมพ์ชื่อพนักงาน..."
                    class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            <div>
                <span class="block text-sm font-medium text-slate-700 mb-2">แผนก</span>
                <div class="flex flex-wrap gap-2">
                    {#each departments as d}
                        <button 
                            onclick={() => updateFilter('dept', d)}
                            class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors
                                   {data.filters.dept === d 
                                        ? 'bg-blue-600 text-white shadow-md' 
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
                        >
                            {d}
                        </button>
                    {/each}
                </div>
            </div>
        </div>

        <div class="space-y-3">
            {#if data.employees.length === 0}
                <div class="text-center py-10 text-slate-400">
                    ไม่พบข้อมูลที่ตรงกับเงื่อนไข
                </div>
            {:else}
                {#each data.employees as emp (emp.id)}
                    <div class="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200 shadow-sm hover:border-blue-300 transition-colors animate-fade">
                        <div>
                            <h3 class="font-bold text-slate-800">{emp.name}</h3>
                            <p class="text-sm text-slate-500">{emp.role}</p>
                        </div>
                        <span class="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">
                            {emp.dept}
                        </span>
                    </div>
                {/each}
            {/if}
        </div>
        
    </div>
</div>

<style>
    @keyframes fade {
        from { opacity: 0; transform: translateY(5px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade {
        animation: fade 0.3s ease-out;
    }
</style>