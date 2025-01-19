<script lang="ts">
    import { page } from "$app/state";
    import type {
        Anime,
        AnimeStatus,
        FilterProps,
    } from "$lib/types/anime.types";
    import AddAnimeModal from "./AddAnimeModal.svelte";
    import AnimeSection from "./AnimeSection.svelte";
    import FilterSection from "./FilterSection.svelte";

    let animeList = $state<Anime[]>(page.data.animes);
    let isDialogOpen = $state(false);
    let selectedAnime = $state<Anime | undefined>(undefined);

    let filter = $state<FilterProps>({
        status: "all" as AnimeStatus,
        searchQuery: "",
        genre: "all",
    });

    // Reactive value for filtered anime list
    const filteredAnime = $derived.by(() => {
        return [...animeList].filter((anime) => {
            const matchesStatus =
                filter.status === "all" || anime.status === filter.status;
            const matchesSearch = anime.title
                .toLowerCase()
                .includes(filter.searchQuery.toLowerCase());
            const matchesGenre =
                filter.genre === "all" || anime.genre.includes(filter.genre);
            return matchesStatus && matchesSearch && matchesGenre;
        });
    });
</script>

<div class="flex flex-col md:flex-row gap-6">
    <!-- Sidebar Filters -->
    <FilterSection bind:filter />
    <!-- Main Content -->
    <AnimeSection
        bind:animeList
        {filteredAnime}
        bind:selectedAnime
        bind:isDialogOpen
    />

    <!-- Add Button -->
    <button
        onclick={() => (isDialogOpen = true)}
        class="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-colors"
    >
        +
    </button>
</div>
<!-- Add Anime Dialog -->
<AddAnimeModal bind:animeList bind:isDialogOpen anime={selectedAnime} />
