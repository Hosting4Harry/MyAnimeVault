<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import { page } from "$app/state";
    import { validateForm } from "$lib";
    import { addToast } from "$lib/store/toast-store";
    import type { Anime, AnimeStatus } from "$lib/types/anime.types";
    import type { Option } from "$lib/types/data.types";
    import DynamicSelect from "../building-blocks/DynamicSelect.svelte";
    import InputField from "../building-blocks/InputField.svelte";
    import StarRating from "../building-blocks/StarRating.svelte";

    let {
        isDialogOpen = $bindable(),
        revalidate = $bindable(),
        selectedAnime,
    }: {
        isDialogOpen: boolean;
        revalidate: boolean;
        selectedAnime: Anime | null;
    } = $props();

    let anime = $state<Anime>({
        id: 0,
        title: "",
        episodes: 0,
        episodesWatched: 0,
        genreIds: "",
        status: "plan_to_watch" as AnimeStatus,
        completionDate: new Date().toISOString(),
        rating: 0,
        startDate: new Date().toISOString(),
    });
    let formElement = $state<HTMLFormElement>();
    let isEditing = $derived(+anime.id !== 0);
    let uniqueGenres = $derived.by<Option[]>(() => {
        return page?.data?.genres || [];
    });

    let selectedStatus = $state<Option[]>([
        { label: "Plan to Watch", value: "plan_to_watch" },
    ]);

    let selectedGenre = $state<Option[]>([]);

    async function addAnime(e: Event): Promise<void> {
        e.preventDefault();
        if (!validateForm(formElement as HTMLFormElement)) return;

        try {
            const response = await fetch("/api/anime-list", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(anime),
            });
            const res = await response.json();
            if (res?.success) {
                addToast({
                    type: "success",
                    message: `Anime ${isEditing ? "updated" : "added"} successfully`,
                });
                await invalidateAll();
                resetForm();
                isDialogOpen = false;
                revalidate = !revalidate;
            } else {
                addToast({
                    type: "error",
                    message: res?.message || "Something went wrong",
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    function resetForm() {
        anime = {
            id: 0,
            title: "",
            episodes: 0,
            episodesWatched: 0,
            genreIds: "",
            status: "plan_to_watch" as AnimeStatus,
            completionDate: new Date().toISOString(),
            rating: 0,
            startDate: new Date().toISOString(),
        };
        selectedStatus = [{ label: "Plan to Watch", value: "plan_to_watch" }];
        selectedGenre = [];
    }

    const statusOptions = [
        { label: "Completed", value: "completed" },
        { label: "Dropped", value: "dropped" },
        { label: "Plan to Watch", value: "plan_to_watch" },
        { label: "Watching", value: "watching" },
    ];

    // Only run this effect when selectedAnime changes, not on every render
    $effect(() => {
        if (selectedAnime) {
            anime = JSON.parse(JSON.stringify(selectedAnime));

            // Set the selected status
            selectedStatus = statusOptions.filter(
                (item) => item.value === selectedAnime.status,
            );

            // Set the selected genres
            if (uniqueGenres && selectedAnime.genreIds) {
                selectedGenre = uniqueGenres.filter((item) =>
                    selectedAnime.genreIds
                        .split(",")
                        .map(Number)
                        .includes(item.value as number),
                );
            }
        }
    });
</script>

{#if isDialogOpen}
    <div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
        <form
            bind:this={formElement}
            onsubmit={addAnime}
            class="bg-white rounded-lg p-6 w-[500px] max-w-full mx-4"
        >
            <h2 class="text-xl font-bold mb-4">
                {isEditing ? "Edit" : "Add New"} Anime
            </h2>
            <div class="grid grid-cols-2 gap-4">
                <div class="col-span-2">
                    <label
                        for="user-name"
                        class="block text-sm mb-1 font-medium text-gray-700"
                        >Anime title:</label
                    >
                    <InputField
                        type="text"
                        placeholder="Anime title"
                        bind:value={anime.title}
                        class="w-full !p-2.5 border rounded"
                        required
                        label="Title"
                        maxlength={200}
                    />
                </div>

                <div>
                    <label
                        for="user-name"
                        class="block text-sm mb-1 font-medium text-gray-700"
                        >Status:</label
                    >
                    <DynamicSelect
                        id="anime-status"
                        mode="single"
                        options={statusOptions}
                        bind:selectedValues={selectedStatus}
                        placeholder="Select a status"
                        onChange={(option) => {
                            if (option && option[0]) {
                                anime.status = option[0].value as AnimeStatus;
                            }
                        }}
                    />
                </div>
                <div>
                    <label
                        for="anime-genreIds"
                        class="block text-sm mb-1 font-medium text-gray-700"
                        >Genres:</label
                    >
                    <DynamicSelect
                        id="anime-genreIds"
                        mode="multi"
                        options={uniqueGenres}
                        bind:selectedValues={selectedGenre}
                        placeholder="Select a genreIds"
                        onChange={(options) => {
                            if (options.length > 0) {
                                anime.genreIds = options
                                    .map((item) => item.value as number)
                                    .join(",");
                            }
                        }}
                    />
                </div>
                <div>
                    <label
                        for="episodes"
                        class="block text-sm mb-1 font-medium text-gray-700"
                        >Total Episode:</label
                    >
                    <InputField
                        id="episodes"
                        numberOnly
                        placeholder="Total episodes"
                        bind:value={anime.episodes}
                        class="w-full !p-2.5 border rounded"
                    />
                </div>
                <div>
                    <label
                        for="watched-episodes"
                        class="block text-sm mb-1 font-medium text-gray-700"
                        >Episodes Watched:</label
                    >
                    <InputField
                        id="watched-episodes"
                        numberOnly
                        placeholder="Episodes watched"
                        bind:value={anime.episodesWatched}
                        class="w-full !p-2.5 border rounded"
                    />
                </div>
                <div class="col-span-2 flex items-center justify-start gap-2">
                    <label
                        for="ratings"
                        class="block text-sm mb-1 font-medium text-gray-700"
                        >Ratings:</label
                    >
                    <StarRating bind:rating={anime.rating} />
                </div>
            </div>
            <div class="flex gap-2 mt-4">
                <button
                    type="submit"
                    class="flex-1 bg-neutral-800 hover:bg-neutral-950 text-white px-4 py-2 rounded"
                >
                    {isEditing ? "Update" : "Add"}
                </button>
                <button
                    onclick={() => {
                        isDialogOpen = false;
                        resetForm();
                    }}
                    class="flex-1 border border-neutral-800 hover:border-neutral-950 bg-white text-neutral-950 px-4 py-2 rounded"
                >
                    Cancel
                </button>
            </div>
        </form>
    </div>
{/if}
