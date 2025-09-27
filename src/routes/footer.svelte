<script lang="ts">
	import * as config from '$lib/config';
</script>

<footer class="flex justify-between pt-8 pb-4 font-mono text-sm text-zinc-400">
	<span>
		<span>{config.title}</span>
		<a
			class="underline underline-offset-2 hover:text-zinc-500 dark:hover:text-zinc-300"
			href={`https://x.com/${config.x}`}>@{config.x}</a
		></span
	>
	<a
		class="hover:text-zinc-500 dark:hover:text-zinc-300"
		href="https://github.com/sebsojeda/sebastianojeda.com">Source</a
	>
</footer>
