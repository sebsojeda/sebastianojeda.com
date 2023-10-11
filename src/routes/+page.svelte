<script lang="ts">
	import type { PageData } from './$types';
	import * as config from '$lib/config';
	import { formatDate } from '$lib/formatDate';

	export let data: PageData;
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
    <meta property="og:image" content="" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={config.title} />
	<meta name="twitter:description" content={config.description} />
	<meta name="twitter:site" content={`@${config.twitter}`} />
	<meta name="twitter:image" content="" />
	<meta name="twitter:creator" content={`@${config.twitter}`} />
</svelte:head>

<header class="font-mono pb-3 text-xs flex items-end justify-between text-zinc-500">
	<span>title</span>
	<span>date</span>
</header>
<ul class="font-mono">
	{#each data.posts as post}
		<li class="border-t border-t-zinc-200 dark:border-t-zinc-700">
			<a
				class="hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-2 py-2"
				title={post.title}
				href={post.slug}
			>
				<span class="text-sm grow truncate">{post.title}</span>
				<span class="text-zinc-500 text-xs whitespace-nowrap">{formatDate(post.date)}</span>
			</a>
		</li>
	{/each}
</ul>
