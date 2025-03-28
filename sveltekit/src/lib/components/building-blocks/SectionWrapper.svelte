<script lang="ts">
    let { children,id }:{children:any,id?:string} = $props();
</script>

<section class="py-12" {id}>
    <div
        class="2xl:container px-4 md:px-10 2xl:px-[72px] mx-auto flex flex-col gap-y-12"
    >
    {@render children()}
</div>
</section>
