<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let views: number | null = null;

	onMount(async () => {
		const res = await fetch(`/views?slug=${$page.params.slug}`);
		views = (await res.json()).views;
	});
</script>

{#if views}<span>{views} views</span>{/if}
