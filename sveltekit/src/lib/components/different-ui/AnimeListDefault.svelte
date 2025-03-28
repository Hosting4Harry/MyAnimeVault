<script lang="ts">
    import { Loader, Loader2, LoaderCircle, Pencil, Trash2 } from "lucide-svelte";
    import type { ComponentProps } from "$lib/types/anime.types";
    import { convertDate, convertDateTime } from "$lib/utils/date-utils";
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

<div class="bg-gray-800 rounded-lg shadow overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-800">
            <tr>
                <th
                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                    >Actions</th
                >
                <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >Title</th
                >
                <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >Status</th
                >
                <th
                    class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                    >Progress</th
                >
                <th
                    class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                    >Start Date</th
                >
                <th
                    class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                    >End Date</th
                >
            </tr>
        </thead>
        <tbody>
            {#if animeList.length === 0}
                <tr>
                    <td colspan="7" class="text-center text-gray-500"
                        >No anime found</td
                    >
                </tr>
            {:else}
                {#each animeList as anime (anime.id)}
                    <tr class="border-b hover:shadow-inset transition hover:scale-100">
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
                        <td class="px-6 py-4">
                            <div class="flex flex-col">
                                <span class="font-medium">{anime.title}</span>
                                <span class="text-sm text-gray-500"
                                    >Rating: {anime.rating || "N/A"}</span
                                >
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <span
                                class={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(anime.status)}`}
                            >
                                {anime.status.replaceAll("_", " ")}
                            </span>
                        </td>
                        <td class="px-6 py-4 text-center max-w-20 min-w-20 group relative">
                            <span class="text-xs text-gray-500 group-hover:block hidden absolute top-4 left-1/2 -translate-x-1/2">
                                {anime.episodesWatched}/{anime.episodes}
                            </span>
                            <div class="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    class="bg-gray-500 h-2.5 rounded-full"
                                    style="width: {Math.min(
                                        100,
                                        (anime.episodesWatched /
                                            anime.episodes) *
                                            100,
                                    )}%"
                                ></div>
                            </div>
                        </td>
                        <td class="px-6 py-4 text-center max-w-20 min-w-20">
                            <span class="text-xs text-gray-500">
                                {convertDate(anime.startDate)}
                            </span>
                        </td>
                        <td class="px-6 py-4 text-center max-w-20 min-w-20">
                            <span class="text-xs text-gray-500"
                                >{convertDate(anime.completionDate)}</span
                            >
                        </td>
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>
</div>
