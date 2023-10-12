<script lang="ts">
	import * as config from '$lib/config';
	import type { PageData } from './$types';
	import { formatDate } from '$lib/formatDate';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.metadata.title}</title>
	<meta name="description" content={data.metadata.description} />
	<meta name="robots" content="index, follow" />
	<meta property="og:title" content={data.metadata.title} />
	<meta property="og:description" content={data.metadata.description} />
	<meta property="og:url" content={`${config.url}/${data.slug}`} />
	<meta property="og:type" content="article" />
	<meta property="og:site_name" content="Sebastian Ojeda" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:image" content={`${config.url}/og?title=${data.metadata.title}`} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={data.metadata.title} />
	<meta name="twitter:description" content={data.metadata.description} />
	<meta name="twitter:site" content={`@${config.twitter}`} />
	<meta name="twitter:image" content={`${config.url}/og?title=${data.metadata.title}`} />
	<meta name="twitter:creator" content={`@${config.twitter}`} />
</svelte:head>

<header class="pb-6 md:pb-8">
	<h1 class="font-bold text-2xl">{data.metadata.title}</h1>
	<div class="font-mono text-xs text-zinc-500">
		<span>{formatDate(data.metadata.date)}</span>
	</div>
</header>

<article class="prose prose-zinc dark:prose-invert">
	<svelte:component this={data.component} />
</article>
