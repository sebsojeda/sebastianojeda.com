<script lang="ts">
	import { browser, dev } from '$app/environment';
	import { page } from '$app/stores';
	import { webVitals } from '$lib/vitals';
	import { inject } from '@vercel/analytics';
	import Footer from './footer.svelte';
	import Header from './header.svelte';

	import '@fontsource-variable/inter';
	import '@fontsource-variable/roboto-mono';
	import '../app.css';

	let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

	$: if (browser && analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId
		});
	}

	inject({ mode: dev ? 'development' : 'production' });
</script>

<div class="flex flex-col h-full px-4 mx-auto max-w-prose">
	<Header />

	<main class="grow">
		<slot />
	</main>

	<Footer />
</div>
