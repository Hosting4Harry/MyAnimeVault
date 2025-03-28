<script lang="ts">
    import { Plus, X, List, Grid, FileText } from "lucide-svelte";
    import type { Anime } from "$lib/types/anime.types";
    import { page } from "$app/state";
    import { goto } from "$app/navigation";

    let {
        currentDesign = $bindable(),
        isDialogOpen = $bindable(),
        selectedAnime = $bindable(),
    }: {
        currentDesign: string;
        isDialogOpen: boolean;
        selectedAnime: Anime | null;
    } = $props();

    let isExpanded = $state(false);

    function toggleDesign(design: string) {
        currentDesign = design;
        goto(page.url.pathname + "?design=" + design);
        isExpanded = false; // Close menu after selection
    }

    function openDialog() {
        selectedAnime = {
            id: 0,
            title: "",
            status: "plan_to_watch",
            episodes: 0,
            episodesWatched: 0,
            genreIds: "",
            
        };
        isDialogOpen = true;
    }
</script>

<!-- Floating Action Button -->
<div
    role="none"
    class="fixed bottom-6 right-6 bg-gray-500 text-black p-4 rounded-full shadow-lg cursor-pointer transition-transform transform hover:scale-110"
    onclick={() => (isExpanded = !isExpanded)}
>
    {#if isExpanded}
        <X size="24" />
    {:else}
        <Plus size="24" />
    {/if}
</div>

<!-- Quick Ball Buttons -->
<div
    class="fixed bottom-[90px] right-[29px] flex flex-col items-center gap-2 transition-all"
>
    {#if isExpanded}
        <button
            class="bg-gray-500 text-black p-3 rounded-full shadow-md transition-all transform translate-y-0 opacity-100 duration-300 hover:scale-110"
            onclick={openDialog}
        >
            <Plus />
        </button>
        <button
            class="bg-gray-500 text-black p-3 rounded-full shadow-md transition-all transform translate-y-0 opacity-100 duration-300 hover:scale-110"
            onclick={() => toggleDesign("default")}
        >
            <List
                class="text-current {currentDesign === 'default'
                    ? 'text-indigo-500'
                    : 'text-current'}"
            />
        </button>
        <button
            class="bg-gray-500 text-black p-3 rounded-full shadow-md transition-all transform translate-y-0 opacity-100 duration-300 hover:scale-110"
            onclick={() => toggleDesign("card")}
        >
            <Grid
                class="text-current {currentDesign === 'card'
                    ? 'text-indigo-500'
                    : 'text-current'}"
            />
        </button>
        <button
            class="bg-gray-500 text-black p-3 rounded-full shadow-md transition-all transform translate-y-0 opacity-100 duration-300 hover:scale-110"
            onclick={() => toggleDesign("compact")}
        >
            <FileText
                class="text-current {currentDesign === 'compact'
                    ? 'text-indigo-500'
                    : 'text-current'}"
            />
        </button>
    {/if}
</div>
