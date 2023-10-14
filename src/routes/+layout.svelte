<script lang="ts">
	import '@fontsource-variable/inter';
	import '@fontsource-variable/roboto-mono';

	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	import Footer from './footer.svelte';
	import Header from './header.svelte';

	import '../app.css';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<div class="flex flex-col h-full px-4 mx-auto max-w-prose">
	<Header />

	<main class="grow">
		<slot />
	</main>

	<Footer />
</div>
