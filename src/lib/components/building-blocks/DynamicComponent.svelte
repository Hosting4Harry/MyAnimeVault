<script lang="ts">
  import type { Anime } from "$lib/types/anime.types";
  import type { Component } from "svelte";

  type ComponentProps = {
    name: string;
    animeList: Anime[];
    openEditModal: (anime: Anime) => void;
    deleteAnime: (id: number) => Promise<void>;
  };
  let { name, animeList, openEditModal, deleteAnime }: ComponentProps =
    $props();

  async function getComponent(component: string): Promise<Component<any>> {
    try {
      switch (component) {
        case "compact":
          return (
            await import("$lib/components/different-ui/AnimeListCompact.svelte")
          ).default;
        case "card":
          return (
            await import("$lib/components/different-ui/AnimeListCard.svelte")
          ).default;
        default:
          return (
            await import("$lib/components/different-ui/AnimeListDefault.svelte")
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
  <DynamicCompo {animeList} {openEditModal} {deleteAnime} />
{:catch error}
  <!-- Optional error handling -->
{/await}
