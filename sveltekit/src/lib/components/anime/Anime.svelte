<script lang="ts">
    import type {
        Anime,
        AnimeStatus,
        FilterProps,
    } from "$lib/types/anime.types";
    import { LoaderCircle } from "lucide-svelte";
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
    let isLoading = $state(false);

    const fetchData = async () => {
        try {
            isLoading = true;
            const queryParams = new URLSearchParams();

            if (filter.searchQuery)
                queryParams.append("name", filter.searchQuery);
            if (filter.status) queryParams.append("status", filter.status);
            if (filter.genre) queryParams.append("genreIds", filter?.genre);

            console.log(queryParams.toString());
            const res = await fetch(
                `/api/anime-list?${queryParams.toString()}`,
            );
            const response = await res.json();
            filteredAnime = response.data;
            isLoading = false;
        } catch (error) {
            console.error("Error fetching filtered anime:", error);
            isLoading = false;
        }
    };
    $effect(() => {
        fetchData();
    });
    $inspect(filter);
</script>

<FilterSection bind:filter />
{#if isLoading}
    <div class="flex justify-center text-left text-gray-500 items-center">
        <i class="animate-spin"><LoaderCircle /></i>
    </div>
{:else}
    <!-- Main Content -->
    <AnimeList
        {filteredAnime}
        bind:selectedAnime
        bind:isDialogOpen
        bind:revalidate
    />
{/if}

<!-- Add Anime Dialog -->
<AddAnimeModal bind:isDialogOpen {selectedAnime} bind:revalidate />
