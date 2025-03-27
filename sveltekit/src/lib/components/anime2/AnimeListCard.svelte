<script lang="ts">
    // Card Grid Design
    import type { Anime } from "$lib/types/anime.types";
    import { Pencil, Trash2 } from "lucide-svelte";


    let { 
        
        animeList, 
        openEditModal, 
        deleteAnime, 
        filter 
    } = $props();

    function getStatusColor(status: string) {
        const colors = {
            watching: "bg-sky-100 text-sky-800",
            completed: "bg-emerald-100 text-emerald-800",
            dropped: "bg-rose-100 text-rose-800",
            plan_to_watch: "bg-amber-100 text-amber-800"
        };
        return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
    }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each animeList as anime (anime.id)}
        <div class="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h3 class="text-lg font-semibold">{anime.title}</h3>
                    <p class="text-sm text-gray-500">Rating: {anime.rating || 'N/A'}</p>
                </div>
                <span class={`px-2 py-1 text-xs rounded-full ${getStatusColor(anime.status)}`}>
                    {anime.status.replace('_', ' ')}
                </span>
            </div>
            
            <div class="mb-3">
                <div class="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                    <div 
                        class="bg-blue-600 h-2.5 rounded-full" 
                        style="width: {(anime.episodesWatched / anime.episodes) * 100}%"
                    ></div>
                </div>
                <div class="flex justify-between text-xs text-gray-500">
                    <span>Progress</span>
                    <span>{anime.episodesWatched}/{anime.episodes}</span>
                </div>
            </div>

            <div class="flex justify-between items-center">
                <div>
                    <p class="text-sm text-gray-500">Started: {anime.startDate || 'N/A'}</p>
                </div>
                <div class="flex space-x-2">
                    <button 
                        class="text-indigo-600 hover:text-indigo-800"
                        onclick={() => openEditModal(anime)}
                    >
                        <Pencil size={20} />
                    </button>
                    <button 
                        class="text-red-600 hover:text-red-800"
                        onclick={() => deleteAnime(anime.id)}
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>
        </div>
    {/each}
</div>