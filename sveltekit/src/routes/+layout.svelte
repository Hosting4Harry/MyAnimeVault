<script lang="ts">
	import { onMount } from "svelte";
	import "../app.css";
	import { goto } from "$app/navigation";
    import Header from "$lib/components/layout/Header.svelte";
	let { children } = $props();

</script>

<Header />
{@render children()}
