<script lang="ts">
	import * as config from '$lib/config';
</script>

<footer class="font-mono text-sm pb-4 pt-8 text-zinc-400 flex justify-between">
	<span>
		<span>{config.title}</span>
		<a
			class="underline underline-offset-2 hover:text-zinc-500 dark:hover:text-zinc-300"
			href={`https://twitter.com/${config.twitter}`}
			target="_blank">@{config.twitter}</a
		></span
	>
	<a class="hover:text-zinc-500 dark:hover:text-zinc-300" href="https://github.com/sebsojeda/sebastianojeda.com" target="_blank">Source</a>
</footer>
