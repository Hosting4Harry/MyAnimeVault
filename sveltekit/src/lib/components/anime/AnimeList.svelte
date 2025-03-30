<script lang="ts">
    import { page } from "$app/state";
    import { addToast } from "$lib/store/toast-store";
    import type { Anime } from "$lib/types/anime.types";
    import DynamicComponent from "../building-blocks/DynamicComponent.svelte";
    let {
        isDialogOpen = $bindable(),
        selectedAnime = $bindable(),
        revalidate = $bindable(),
        filteredAnime,
        currentDesign
    }: {
        isDialogOpen: boolean;
        revalidate: boolean;
        selectedAnime: Anime | null;
        filteredAnime: Anime[];
        currentDesign: string;
    } = $props();

    let animeList = $state<Anime[]>(filteredAnime);



    function openEditModal(anime: Anime) {
        selectedAnime = JSON.parse(JSON.stringify(anime));
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

<div class="mx-auto px-4 py-6">

    <DynamicComponent
        name={currentDesign}
        {animeList}
        {openEditModal}
        {deleteAnime}
    />
</div>
