<script lang="ts">
    import type { ComponentProps } from "$lib/types/anime.types";
    import { convertDate } from "$lib/utils/date-utils";
    import { Loader, Pencil, Trash2 } from "lucide-svelte";

    let { animeList, openEditModal, deleteAnime }: ComponentProps =
        $props();

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

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {#if animeList.length === 0}
        <div class="text-left text-gray-500">No anime found</div>
    {:else}
        {#each animeList as anime (anime.id)}
            <div
                class="rounded-lg shadow-3xl p-4 hover:shadow-md transition col-span-1 min-w-[348px] sm:min-w-[250px] md:min-w-[348px] flex flex-col h-full bg-gray-800 text-[#f3f4f6]"
            >
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h3 class="text-lg font-medium">{anime.title}</h3>
                        <p class="text-sm text-gray-500">
                            Rating: {anime?.rating || "N/A"}
                        </p>
                    </div>
                    <span
                        class={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(anime.status)}`}
                    >
                        {anime.status.replaceAll("_", " ")}
                    </span>
                </div>

                <div class="flex-grow"></div>
                <!-- Pushes the rest to the bottom -->

                <!-- Progress Bar -->
                <div class="mb-3 mt-auto">
                    <div class="w-full bg-neutral-200 rounded-full h-2.5 mb-1">
                        <div
                            class="bg-gray-500 h-2.5 rounded-full"
                            style="width: {Math.min(
                                100,
                                (anime.episodesWatched / anime.episodes) * 100,
                            )}%"
                        ></div>
                    </div>
                    <div class="flex justify-between text-xs text-gray-500">
                        <span>Progress</span>
                        <span>{anime.episodesWatched}/{anime.episodes}</span>
                    </div>
                </div>

                <!-- Date and Buttons -->
                <div class="flex justify-between items-center mt-auto">
                    <p class="text-sm text-gray-500">
                        Started: {convertDate(anime.startDate) || "N/A"}
                    </p>
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
    {/if}
</div>
