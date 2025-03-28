<script lang="ts">
    import { page } from "$app/state";
    import type {
        AnimeStatus,
        FilterProps,
    } from "$lib/types/anime.types";
    import type { Option } from "$lib/types/data.types";
    import { debounce } from "$lib/utils";
    import { Search, ChevronDown } from "lucide-svelte";
    import { onMount } from "svelte";

    let { filter = $bindable() }: { filter: FilterProps } = $props();
    let searchValue = $state("");
    let isStatusDropdownOpen = $state(false);
    let isGenreDropdownOpen = $state(false);

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



    const debouncedSearch = debounce(
        (e: Event) =>
            (filter.searchQuery = (e.target as HTMLInputElement).value),
        300,
    );

    function handleStatusChange(option: Option) {
        selectedStatus = [option];
        filter.status = option.value as AnimeStatus;
        isStatusDropdownOpen = false;
    }

    function handleGenreChange(option: Option) {
        selectedGenre = [option];
        filter.genre = option.value as string;
        isGenreDropdownOpen = false;
    }

</script>

<div class="bg-gray-900 text-white min-h-[120px]">
    <div class="max-w-4xl mx-auto space-y-4">
        <div class="relative">
            <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
                <Search class="text-gray-400" size={20} />
            </div>
            <input
                type="text"
                placeholder="Search anime..."
                bind:value={searchValue}
                oninput={debouncedSearch}
                class="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
        </div>

        <div class="flex space-x-4">
            <div class="relative w-1/2">
                <button
                    onclick={() =>
                        (isStatusDropdownOpen = !isStatusDropdownOpen)}
                    class="w-full flex justify-between items-center px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-all"
                >
                    <span>{selectedStatus[0].label}</span>
                    <ChevronDown
                        class={`transform transition-transform ${isStatusDropdownOpen ? "rotate-180" : ""}`}
                        size={20}
                    />
                </button>
                {#if isStatusDropdownOpen}
                    <ul
                        class="absolute z-10 w-full bg-gray-800 border border-gray-700 rounded-lg mt-2 shadow-lg overflow-hidden"
                    >
                        {#each statusOptions as option}
                            <li
                                role="none"
                                onclick={() => handleStatusChange(option)}
                                class="px-4 py-3 hover:bg-gray-700 cursor-pointer transition-colors"
                            >
                                {option.label}
                            </li>
                        {/each}
                    </ul>
                {/if}
            </div>

            <div class="relative w-1/2">
                <button
                    onclick={() => (isGenreDropdownOpen = !isGenreDropdownOpen)}
                    class="w-full flex justify-between items-center px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-all"
                >
                    <span>{selectedGenre[0]?.label || "Select Genre"}</span>
                    <ChevronDown
                        class={`transform transition-transform ${isGenreDropdownOpen ? "rotate-180" : ""}`}
                        size={20}
                    />
                </button>
                {#if isGenreDropdownOpen}
                    <ul
                        class="absolute z-10 w-full bg-gray-800 border border-gray-700 rounded-lg mt-2 shadow-lg overflow-hidden max-h-60 overflow-y-auto"
                    >
                        {#each uniqueGenres as option}
                            <li
                                role="none"
                                onclick={() => handleGenreChange(option)}
                                class="px-4 py-3 hover:bg-gray-700 cursor-pointer transition-colors"
                            >
                                {option.label}
                            </li>
                        {/each}
                    </ul>
                {/if}
            </div>
        </div>
    </div>
</div>
