<script lang="ts">
	import "../app.css";
	import Header from "$lib/components/layout/Header.svelte";
	import Toasts from "$lib/components/toast/Toasts.svelte";
	let { children } = $props();
</script>

<Header />
{@render children()}

<div>
	<Toasts position="bottom-left" />
</div>
