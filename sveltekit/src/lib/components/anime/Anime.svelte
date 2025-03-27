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

<div class="flex flex-col gap-6 w-full">
    <div class="flex flex-wrap justify-between items-center mb-6">
        <h3 class="text-2xl font-bold text-gray-800">My Anime List</h3>
        <div>
            <FilterSection bind:filter />
        </div>
    </div>

    <!-- Main Content -->
    <AnimeList
        {filteredAnime}
        bind:selectedAnime
        bind:isDialogOpen
        bind:revalidate
    />

</div>
<!-- Add Anime Dialog -->
<AddAnimeModal bind:isDialogOpen {selectedAnime} bind:revalidate />
