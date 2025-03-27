<script lang="ts">
    import { Pencil, Trash2 } from "lucide-svelte";
    import type { ComponentProps } from "$lib/types/anime.types";

    let { animeList, openEditModal, deleteAnime }: ComponentProps = $props();

    function getStatusColor(status: string) {
        const colors = {
            watching: "bg-sky-100 text-sky-800",
            completed: "bg-emerald-100 text-emerald-800",
            dropped: "bg-rose-100 text-rose-800",
            plan_to_watch: "bg-amber-100 text-amber-800",
        };
        return (
            colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
        );
    }
</script>

<div class="space-y-2 w-full min-w-[300px] md:min-w-[1296px]">
    {#if animeList.length === 0}
        <div class="text-center text-gray-500">No anime found</div>
    {:else}
        {#each animeList as anime (anime.id)}
            <div
                class="bg-white rounded-lg shadow p-3 flex items-center justify-between hover:bg-gray-50 transition"
        >
            <div class="flex-1 mr-4">
                <div class="flex items-center space-x-2">
                    <h3 class="text-base font-semibold">{anime.title}</h3>
                    <span
                        class={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(anime.status)}`}
                    >
                        {anime.status.replace("_", " ")}
                    </span>
                </div>
                <div
                    class="flex items-center space-x-2 text-sm text-gray-500 mt-1"
                >
                    <span>Rating: {anime.rating || "N/A"}</span>
                    <span>•</span>
                    <span>
                        Progress: {anime.episodesWatched}/{anime.episodes}
                    </span>
                </div>
            </div>
            <div class="flex space-x-2">
                <button
                    class="text-indigo-600 hover:text-indigo-800"
                    onclick={() => openEditModal(anime)}
                >
                    <Pencil size={18} />
                </button>
                <button
                    class="text-red-600 hover:text-red-800"
                    onclick={() => deleteAnime(anime.id)}
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
        {/each}
    {/if}
</div>
