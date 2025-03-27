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
            return filter.status.split(",").includes(String(item.value));
        });
    });
</script>

<div
    class="flex flex-wrap gap-2 text-base font-medium text-gray-900 rounded-md w-full max-h-fit"
>
    <InputField
        bind:value={filter.searchQuery}
        placeholder="Search anime..."
        class="border-naro-300 !py-2.5 !min-w-[270px]"
    />

    <DynamicSelect
        id="anime-status"
        mode="single"
        options={statusOptions}
        bind:selectedValues={selectedStatus}
        customClass="!min-w-[270px]"
        placeholder="Select a status"
        onChange={(option) => (filter.status = option[0].value as AnimeStatus)}
    />

    <DynamicSelect
        id="anime-genre"
        mode="single"
        customClass="!min-w-[270px]"
        options={uniqueGenres}
        bind:selectedValues={selectedGenre}
        placeholder="Select a genre"
        onChange={(option) => (filter.genre = option[0].value as string)}
    />
</div>
