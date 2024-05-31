<script lang="ts">
	import * as config from '$lib/config';
	import { formatDate } from '$lib/formatDate';
	import type { PageData } from './$types';

	export let data: PageData;

	let sortBy = '';
	let sortOrder = '';
	function sortPosts(by: string) {
		const options = ['', 'asc', 'desc'];
		sortOrder = options[by === sortBy ? (options.indexOf(sortOrder) + 1) % options.length : 1];
		sortBy = by;
		data.posts = data.posts.sort((a, b) => {
			if (sortBy === 'title') {
				if (sortOrder === 'asc') return a.metadata.title.localeCompare(b.metadata.title);
				if (sortOrder === 'desc') return b.metadata.title.localeCompare(a.metadata.title);
			}
			if (sortBy === 'date') {
				if (sortOrder === 'asc')
					return new Date(a.metadata.date).getTime() - new Date(b.metadata.date).getTime();
				if (sortOrder === 'desc') {
					sortOrder = ''; // default is desc
					return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
				}
			}
			return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
		});
	}
</script>

<svelte:head>
	<title>{config.title}'s Blog</title>
	<meta name="description" content={config.description} />
	<meta name="robots" content="index, follow" />
	<meta property="og:title" content={`${config.title}'s Blog`} />
	<meta property="og:description" content={config.description} />
	<meta property="og:url" content={config.url} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Sebastian Ojeda" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:image" content={`${config.url}/og?title=${config.title}'s Blog`} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={config.title} />
	<meta name="twitter:description" content={config.description} />
	<meta name="twitter:site" content={`@${config.twitter}`} />
	<meta name="twitter:image" content={`${config.url}/og?title=${config.title}'s Blog`} />
	<meta name="twitter:creator" content={`@${config.twitter}`} />
</svelte:head>

<header class="flex items-end justify-between pb-3 font-mono text-xs text-zinc-500">
	<button on:click={() => sortPosts('title')}>
		{#if sortBy === 'title' && sortOrder === 'asc'}
			<span class="text-zinc-400">title &uparrow;</span>
		{:else if sortBy === 'title' && sortOrder === 'desc'}
			<span class="text-zinc-400">title &downarrow;</span>
		{:else}
			<span>title</span>
		{/if}
	</button>
	<button on:click={() => sortPosts('date')}>
		{#if sortBy === 'date' && sortOrder === 'asc'}
			<span class="text-zinc-400">&uparrow; date</span>
		{:else}
			<span>date</span>
		{/if}
	</button>
</header>
<ul class="font-mono">
	{#each data.posts as post}
		<li class="border-t border-t-zinc-200 dark:border-t-zinc-700">
			<a
				class="flex items-center gap-2 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800"
				title={post.metadata.title}
				href={post.slug}
			>
				<span class="text-sm truncate grow">{post.metadata.title}</span>
				<span class="text-xs text-zinc-500 whitespace-nowrap">{formatDate(post.metadata.date)}</span
				>
			</a>
		</li>
	{/each}
</ul>
