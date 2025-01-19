<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import type { Anime, AnimeStatus } from "$lib/types/anime.types";
    import type { Option } from "$lib/types/data.types";
    import { randomId } from "$lib/utils";
    import { updateFile } from "../../../routes/anime-list/utils";
    import DynamicSelect from "../building-blocks/DynamicSelect.svelte";
    import InputField from "../building-blocks/InputField.svelte";

    let {
        animeList = $bindable(),
        isDialogOpen = $bindable(),
        anime,
    }: {
        animeList: Anime[];
        isDialogOpen: boolean;
        anime: Anime | undefined;
    } = $props();
    let isEditing = $derived(!!anime);
    let newAnime = $state<Omit<Anime, "id">>({
        title: "",
        status: "plan_to_watch",
        episodes: 0,
        episodesWatched: 0,
        genre: [],
    });
    async function addAnime(): Promise<void> {
        if (!newAnime.title) return;

        if (isEditing && anime) {
            // Update existing anime
            animeList = animeList.map((a) =>
                a.id === anime.id ? { ...a, ...newAnime } : a,
            );
        } else {
            // Add new anime
            const newAnimeEntry: Anime = {
                id: randomId(),
                title: newAnime.title,
                status: newAnime.status,
                episodes: newAnime.episodes,
                episodesWatched: newAnime.episodesWatched,
                genre: newAnime.genre,
                startDate:
                    newAnime.status === "watching"
                        ? new Date().toISOString().split("T")[0]
                        : "",
            };
            animeList = [...animeList, newAnimeEntry];
        }

        isDialogOpen = false;
        const result: { success: boolean; message: string } =
            await updateFile(animeList);
        if (result.success) {
            resetForm();
            await invalidateAll();
        } else {
            console.error("Error saving anime list.");
        }
    }

    function resetForm() {
        newAnime.title = "";
        newAnime.status = "plan_to_watch";
        newAnime.episodes = 0;
        newAnime.episodesWatched = 0;
        newAnime.genre = [];
    }

    let uniqueGenres = [
        { label: "Action", value: "action" },
        { label: "Adventure", value: "adventure" },
        { label: "Comedy", value: "comedy" },
        { label: "Drama", value: "drama" },
        { label: "Fantasy", value: "fantasy" },
        { label: "Psychological", value: "psychological" },
        { label: "Slice of Life", value: "slice_of_life" },
        { label: "Supernatural", value: "supernatural" },
        { label: "Thriller", value: "thriller" },
    ];

    let selectedStatus = $state<Option[]>([]);
    let selectedGenre = $state<Option[]>([]);
    const statusOptions = [
        { label: "All Status", value: "all" },
        { label: "Completed", value: "completed" },
        { label: "Dropped", value: "dropped" },
        { label: "Plan to Watch", value: "plan_to_watch" },
        { label: "Watching", value: "watching" },
    ];
    $effect(() => {
        if (isEditing) {
            newAnime = anime as Anime;
            selectedGenre = uniqueGenres.filter((item) => {
                return anime?.genre.some((genre) =>
                    genre.toLowerCase().includes(item.value.toLowerCase()),
                );
            });
            selectedStatus = statusOptions.filter((item) => {
                return anime?.status
                    .toLowerCase()
                    .includes(item.value.toLowerCase());
            });
        }
    });
</script>

{#if isDialogOpen}
    <div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
        <div class="bg-white rounded-lg p-6 w-[425px] max-w-full mx-4">
            <h2 class="text-xl font-bold mb-4">
                {isEditing ? "Edit" : "Add New"} Anime
            </h2>
            <div class="grid gap-4">
                <InputField
                    type="text"
                    placeholder="Anime title"
                    bind:value={newAnime.title}
                    class="w-full p-2 border rounded"
                />
                <DynamicSelect
                    id="anime-status"
                    mode="single"
                    options={statusOptions}
                    bind:selectedValues={selectedStatus}
                    placeholder="Select a status"
                    onChange={(option) =>
                        (newAnime.status = option[0].value as AnimeStatus)}
                />

                <DynamicSelect
                    id="anime-genre"
                    mode="multi"
                    options={uniqueGenres}
                    bind:selectedValues={selectedGenre}
                    placeholder="Select a genre"
                    onChange={(option) =>
                        (newAnime.genre = option.map((i) =>
                            i.value.toString(),
                        ))}
                />
                <InputField
                    numberOnly
                    placeholder="Total episodes"
                    bind:value={newAnime.episodes}
                    class="w-full p-2 border rounded"
                />
                <InputField
                    numberOnly
                    placeholder="Episodes watched"
                    bind:value={newAnime.episodesWatched}
                    class="w-full p-2 border rounded"
                />
                <div class="flex gap-2 mt-4">
                    <button
                        onclick={addAnime}
                        class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        {isEditing ? "Update" : "Add"}
                    </button>
                    <button
                        onclick={() => (isDialogOpen = false)}
                        class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}
