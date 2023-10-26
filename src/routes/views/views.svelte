<script lang="ts">
	import { onMount } from 'svelte';

	export let slug: string;

	let views: number | null = null;
	onMount(async () => {
		const res = await fetch(`/views?slug=${slug}`);
		views = (await res.json()).views;
	});
</script>

{#if views}<span>{views} views</span>{/if}
