<script lang="ts">
    import type {
        Anime,
        AnimeStatus,
        FilterProps,
    } from "$lib/types/anime.types";
    import AddAnimeModal from "./AddAnimeModal.svelte";
    import AnimeList from "./AnimeList.svelte";
    import FilterSection from "./FilterSection.svelte";
    let { revalidate = $bindable() }: { revalidate: boolean } = $props();
    let isDialogOpen = $state(false);
    let selectedAnime = $state<Anime | null>(null);

    let filter = $state<FilterProps>({
        status: "all" as AnimeStatus,
        searchQuery: "",
        genre: "",
    });

    // Reactive value for filtered anime list
    let filteredAnime = $state([] as Anime[]);

    const fetchData = async () => {
        try {
            const queryParams = new URLSearchParams();

            if (filter.searchQuery)
                queryParams.append("name", filter.searchQuery);
            if (filter.status) queryParams.append("status", filter.status);
            if (filter.genre?.length)
                queryParams.append("genreIds", filter?.genre);

            const res = await fetch(
                `/api/anime-list?${queryParams.toString()}`,
            );
            const data = await res.json();
            filteredAnime = data; // Update store value
        } catch (error) {
            console.error("Error fetching filtered anime:", error);
        }
    };
    $effect(() => {
        fetchData();
    });
</script>

<div class="flex flex-col md:flex-row gap-6">
    <!-- Sidebar Filters -->
    <FilterSection bind:filter />

    <!-- Main Content -->
    <AnimeList {filteredAnime} bind:selectedAnime bind:isDialogOpen bind:revalidate/>
    <!-- Add Button -->
    <button
        onclick={() => {
            selectedAnime = null;
            isDialogOpen = true;
        }}
        class="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white h-14 w-14 rounded-full shadow-lg flex md:hidden items-center justify-center transition-colors"
    >
        +
    </button>
</div>
<!-- Add Anime Dialog -->
<AddAnimeModal bind:isDialogOpen {selectedAnime} bind:revalidate/>
