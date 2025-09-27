<script lang="ts">
	import { browser, dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { onMount } from 'svelte';
	import Footer from './footer.svelte';
	import Header from './header.svelte';

	import '@fontsource-variable/inter';
	import '@fontsource-variable/roboto-mono';
	import '../app.css';

	inject({ mode: dev ? 'development' : 'production' });

	onMount(() => {
		// Scroll to the element with the ID from the hash
		if (browser && location.hash) {
			const id = location.hash.slice(1);
			const el = document.getElementById(id);
			if (el) {
				el.scrollIntoView();
			}
		}
	});
</script>

<div class="flex flex-col h-full px-4 mx-auto max-w-prose scroll-smooth">
	<Header />

	<main class="grow">
		<slot />
	</main>

	<Footer />
</div>
