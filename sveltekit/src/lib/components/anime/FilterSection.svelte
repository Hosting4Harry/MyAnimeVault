<script lang="ts">
    import { page } from "$app/state";
    import type {
        Anime,
        AnimeStatus,
        FilterProps,
    } from "$lib/types/anime.types";
    import type { Option } from "$lib/types/data.types";
    import DynamicSelect from "../building-blocks/DynamicSelect.svelte";
    import InputField from "../building-blocks/InputField.svelte";

    let { filter = $bindable() }: { filter: FilterProps } = $props();

    let uniqueGenres = $derived.by(() => {
        return [{ label: "All Genres", value: "" }, ...page.data.genres];
    });

    let selectedStatus = $state<Option[]>([
        { label: "All Status", value: "all" },
    ]);
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
            return filter.genre.split(",").includes(String(item.value));
        });
        selectedStatus = statusOptions.filter((item) => {
            return filter.status
                .split(",")
                .includes(String(item.value));
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
