<script lang="ts">
	import '@fontsource-variable/inter';
	import '@fontsource-variable/roboto-mono';

	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	import Header from './header.svelte';
	import Footer from './footer.svelte';

	import '../app.css';

	inject({ mode: dev ? 'development' : 'production' });

    export const prerender = true;
</script>

<div class="flex flex-col h-full max-w-prose mx-auto px-4">
	<Header />

	<main class="grow">
		<slot />
	</main>

	<Footer />
</div>
