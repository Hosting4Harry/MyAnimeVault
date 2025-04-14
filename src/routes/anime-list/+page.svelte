<script lang="ts">
    import Anime from "$lib/components/anime/Anime.svelte";
    import SectionWrapper from "$lib/components/building-blocks/SectionWrapper.svelte";
    let revalidate = $state(false);
</script>

<SectionWrapper>
    {#key revalidate}
        <Anime bind:revalidate/>
    {/key}
</SectionWrapper>
