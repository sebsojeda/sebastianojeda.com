<script lang="ts">
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import Footer from './footer.svelte';
	import Header from './header.svelte';

	import '@fontsource-variable/inter';
	import '@fontsource-variable/roboto-mono';
	import '../app.css';

	injectSpeedInsights();
	inject({ mode: dev ? 'development' : 'production' });
</script>

<div class="flex flex-col h-full px-4 mx-auto max-w-prose scroll-smooth">
	<Header />

	<main class="grow">
		<slot />
	</main>

	<Footer />
</div>
