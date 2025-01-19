<script lang="ts">
    import type {
        Anime,
        AnimeStatus,
        FilterProps,
    } from "$lib/types/anime.types";
    import type { Option } from "$lib/types/data.types";
    import DynamicSelect from "../building-blocks/DynamicSelect.svelte";
    import InputField from "../building-blocks/InputField.svelte";

    let {
        filter = $bindable(),
    }: { filter: FilterProps } = $props();

    let uniqueGenres = [
        { label: "All Genres", value: "all" },
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
        selectedGenre = uniqueGenres.filter((item) => {
            return filter.genre
                .toLowerCase()
                .includes(item.value.toLowerCase());
        });
        selectedStatus = statusOptions.filter((item) => {
            return filter.status
                .toLowerCase()
                .includes(item.value.toLowerCase());
        });
    });
</script>

<div
    class="flex flex-col gap-2 p-6 text-base font-medium text-gray-900 bg-white rounded-md border-b border-solid border-[#E5E7EB] md:max-w-[249px] min-w-[249px] max-h-fit"
>
    <div class="text-xl font-bold mb-4">Filters</div>
    <InputField
        bind:value={filter.searchQuery}
        placeholder="Search anime..."
        class="border-naro-300"
    />

    <DynamicSelect
        id="anime-status"
        mode="single"
        options={statusOptions}
        bind:selectedValues={selectedStatus}
        placeholder="Select a status"
        onChange={(option) => (filter.status = option[0].value as AnimeStatus)}
    />

    <DynamicSelect
        id="anime-genre"
        mode="single"
        options={uniqueGenres}
        bind:selectedValues={selectedGenre}
        placeholder="Select a genre"
        onChange={(option) => (filter.genre = option[0].value as string)}
    />
</div>
