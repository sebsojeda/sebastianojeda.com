<script lang="ts">
	import { onMount } from 'svelte';

	export let slug: string;
	export let views: number;

	onMount(async () => {
		const res = await fetch(`/views?slug=${slug}`);
		views = (await res.json()).views;
	});
</script>

<span>{views} views</span>
