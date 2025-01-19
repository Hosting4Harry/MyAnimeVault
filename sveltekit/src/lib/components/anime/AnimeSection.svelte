<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import EditIcon from "$lib/icons/EditIcon.svelte";
    import RemoveIcon from "$lib/icons/RemoveIcon.svelte";
    import type { Anime, AnimeStatus } from "$lib/types/anime.types";
    import { updateFile } from "../../../routes/anime-list/utils";

    let {
        isDialogOpen = $bindable(),
        selectedAnime = $bindable(),
        animeList = $bindable(),
        filteredAnime,
    }: {
        isDialogOpen: boolean;
        selectedAnime: Anime | undefined;
        animeList: Anime[];
        filteredAnime: Anime[];
    } = $props();

    async function updateAnime(
        id: string,
        updates: Partial<Anime>,
    ): Promise<void> {
        animeList = animeList.map((anime) =>
            anime.id === id ? { ...anime, ...updates } : anime,
        );
        const result: { success: boolean; message: string } =
            await updateFile(animeList);
        if (result.success) {
            alert("Updated successfully");
            await invalidateAll();
        } else {
            console.error("Error saving anime list.");
        }
    }

    async function deleteAnime(id: string): Promise<void> {
        const res = window.confirm(
            "Are you sure you want to delete the anime?",
        );
        if (res) {
            animeList = animeList.filter((anime) => anime.id !== id);

            try {
                const result: { success: boolean; message: string } =
                    await updateFile(animeList);
                if (result.success) {
                    alert("Deleted anime successfully");
                    await invalidateAll();
                } else {
                    console.error("Error saving anime list:", result.message);
                }
            } catch (error) {
                console.error(
                    "An error occurred while updating the file:",
                    error,
                );
            }
        }
    }

    function updateEpisodes(id: string, watched: number): void {
        const anime = animeList.find((a) => a.id === id);
        if (!anime) return;

        let updates: Partial<Anime> = { episodesWatched: watched };

        if (watched === anime.episodes && anime.episodes > 0) {
            updates.status = "completed";
            updates.completionDate = new Date().toISOString().split("T")[0];
        }

        updateAnime(id, updates);
    }

    function getStatusIcon(status: AnimeStatus): string {
        switch (status) {
            case "watching":
                return "⏰";
            case "completed":
                return "🏆";
            case "plan_to_watch":
                return "📅";
            case "dropped":
                return "⛔";
            default:
                return "";
        }
    }
</script>

<div class="rounded-md flex flex-col items-start w-full">
    <div class="grid grid-cols-1 w-full gap-4">
        {#each filteredAnime as anime (anime.id)}
            <div
                class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
                <div class="flex justify-between items-start">
                    <div>
                        <div class="flex items-center gap-2 mb-2">
                            <span>{getStatusIcon(anime.status)}</span>
                            <h3 class="text-xl font-semibold">
                                {anime.title}
                            </h3>
                        </div>
                        <div class="flex gap-2 flex-wrap mb-2">
                            {#each anime.genre as g}
                                <span
                                    class="px-2 py-1 bg-gray-100 rounded-full text-sm"
                                    >{g}</span
                                >
                            {/each}
                        </div>
                        <div
                            class="text-sm text-gray-600 flex items-center gap-4"
                        >
                            {#if anime.episodes > 0}
                                <span
                                    >Episodes: {anime.episodesWatched}/{anime.episodes}</span
                                >
                            {/if}
                            {#if anime.rating}
                                <span class="flex items-center gap-1">
                                    ⭐ {anime.rating}/10
                                </span>
                            {/if}
                        </div>
                    </div>
                    <div class="flex gap-2">
                        {#if anime.status === "watching"}
                            <div class="flex gap-2 items-center">
                                <button
                                    onclick={() =>
                                        updateEpisodes(
                                            anime.id,
                                            anime.episodesWatched + 1,
                                        )}
                                    class="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center transition-colors"
                                >
                                    +
                                </button>

                                <!-- Remove Episode Button -->
                                <button
                                    onclick={() =>
                                        updateEpisodes(
                                            anime.id,
                                            Math.max(
                                                anime.episodesWatched - 1,
                                                0,
                                            ),
                                        )}
                                    class="bg-yellow-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center transition-colors"
                                >
                                    -
                                </button>
                            </div>
                        {/if}
                        <button
                            onclick={() => {
                                selectedAnime = anime;
                                isDialogOpen = true;
                            }}
                            class="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center transition-colors"
                        >
                            <i class="h-4 w-4 flex items-center">
                                <EditIcon fillColor="currentColor" /></i
                            >
                        </button>
                        <button
                            onclick={() => deleteAnime(anime.id)}
                            class="bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center transition-colors"
                        >
                            <RemoveIcon fillColor="currentColor" />
                        </button>
                    </div>
                </div>

                {#if anime.status === "completed" && anime.completionDate}
                    <div class="mt-2 text-sm text-gray-500">
                        Completed on {anime.completionDate}
                    </div>
                {/if}
                {#if anime.status === "watching" && anime.startDate}
                    <div class="mt-2 text-sm text-gray-500">
                        Started on {anime.startDate}
                    </div>
                {/if}
            </div>
        {/each}

        {#if filteredAnime.length === 0}
            <div class="text-center text-gray-500 py-8">
                No anime found matching your filters
            </div>
        {/if}
    </div>
</div>
