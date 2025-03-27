<script lang="ts">
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

<div class="bg-white rounded-lg shadow overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Progress</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each animeList as anime (anime.id)}
                <tr class="hover:bg-gray-50 border-b">
                    <td class="px-6 py-4">
                        <div class="flex flex-col">
                            <span class="font-semibold">{anime.title}</span>
                            <span class="text-sm text-gray-500">Rating: {anime.rating || 'N/A'}</span>
                        </div>
                    </td>
                    <td class="px-6 py-4">
                        <span class={`px-2 py-1 text-xs rounded-full ${getStatusColor(anime.status)}`}>
                            {anime.status.replace('_', ' ')}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                        <div class="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                                class="bg-blue-600 h-2.5 rounded-full" 
                                style="width: {(anime.episodesWatched / anime.episodes) * 100}%"
                            ></div>
                        </div>
                        <span class="text-xs text-gray-500">
                            {anime.episodesWatched}/{anime.episodes}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-right">
                        <div class="flex justify-end space-x-2">
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
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>