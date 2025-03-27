<script lang="ts">
  import type { Component } from "svelte";

  type ComponentProps = {
    name: string;
    animeList: any;
    openEditModal: any;
    deleteAnime: any;
    filter: any;
  };
  let { name, animeList, openEditModal, deleteAnime, filter }: ComponentProps =
    $props();

  async function getComponent(component: string): Promise<Component<any>> {
    try {
      switch (component) {
        case "compact":
          return (
            await import("$lib/components/anime2/AnimeListCompact.svelte")
          ).default;
        case "card":
          return (await import("$lib/components/anime2/AnimeListCard.svelte"))
            .default;
        default:
          return (
            await import("$lib/components/anime2/AnimeListDefault.svelte")
          ).default;
      }
    } catch (error) {
      console.error("Error loading component:", error);
      return (await import("$lib/icons/SettingsIcon.svelte")).default;
    }
  }

  const Comp = $derived(getComponent(name));
</script>

{#await Comp}
  <!-- Optional loading state -->
{:then DynamicCompo}
  <DynamicCompo {animeList} {openEditModal} {deleteAnime} {filter} />
{:catch error}
  <!-- Optional error handling -->
{/await}
