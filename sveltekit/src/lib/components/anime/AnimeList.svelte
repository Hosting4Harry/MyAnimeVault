<script lang="ts">
    import { page } from "$app/stores"; // Corrected from "$app/state"
    import { addToast } from "$lib/store/toast-store";
    import type {
        Anime,
        AnimeStatus,
        FilterProps,
    } from "$lib/types/anime.types";
    import type { Option } from "$lib/types/data.types";
    import {
        ChevronDown,
        Plus,
        Pencil,
        Trash2,
        Clock,
        Trophy,
        Calendar,
        Ban,
        Grid,
        List,
        FileText,
    } from "lucide-svelte";
    import DynamicComponent from "../building-blocks/DynamicComponent.svelte";
    import FilterSection from "./FilterSection.svelte";
    import QuickBall from "./QuickBall.svelte";
    let {
        isDialogOpen = $bindable(),
        selectedAnime = $bindable(),
        revalidate = $bindable(),
        filter = $bindable(),
        filteredAnime,
    }: {
        isDialogOpen: boolean;
        revalidate: boolean;
        filter: FilterProps;
        selectedAnime: Anime | null;
        filteredAnime: Anime[];
    } = $props();

    const designs = {
        default: "default",
        card: "card",
        compact: "compact",
    } as const;

    let currentDesign = $state<keyof typeof designs>("default");
    let animeList = $state<Anime[]>(filteredAnime);

    function toggleDesign(design: keyof typeof designs) {
        currentDesign = design;
    }

    function openEditModal(anime: Anime) {
        selectedAnime = anime;
        isDialogOpen = true;
    }

    async function deleteAnime(id: number) {
        if (confirm("Are you sure you want to delete this anime?")) {
            try {
                const res = await fetch(`/api/anime-list?id=${id}`, {
                    method: "DELETE",
                });
                const response = await res.json();

                if (response.success) {
                    addToast({
                        type: "success",
                        message: "Deleted successfully",
                    });
                    revalidate = !revalidate;
                } else {
                    addToast({
                        type: "error",
                        message: response.message || "Something went wrong",
                    });
                }
            } catch (error) {
                console.error("Delete anime error:", error);
                addToast({
                    type: "error",
                    message: "Failed to delete anime",
                });
            }
        }
    }

    $effect(() => {
        animeList = filteredAnime;
    });
</script>

<div class="container mx-auto px-4 py-6">
    <QuickBall bind:currentDesign bind:isDialogOpen  bind:selectedAnime/>

    <DynamicComponent
        name={currentDesign}
        {animeList}
        {openEditModal}
        {deleteAnime}
        {filter}
    />
</div>
