<script lang="ts">
	import { browser } from '$app/environment';
	import * as config from '$lib/config';

	let theme = browser ? localStorage.getItem('theme') ?? 'system' : null;
	$: prefersDark = browser ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;

	function toggleTheme() {
		const options = prefersDark ? ['system', 'light', 'dark'] : ['system', 'dark', 'light'];
		const next = options[(options.indexOf(theme!) + 1) % options.length];

		if (next === 'system') {
			localStorage.removeItem('theme');
			document.documentElement.classList.toggle('dark', prefersDark);
		} else {
			localStorage.setItem('theme', next);
			document.documentElement.classList.toggle('dark', next === 'dark');
		}

		theme = next;
	}
</script>

<nav class="flex items-center justify-between pt-2 pb-6 md:pt-3 md:pb-8">
	<a class="p-2 -ml-2 rounded-md md:text-lg" href="/">
		<b>{config.title}</b>
	</a>

	<div class="relative flex items-center gap-1 font-mono text-sm md:gap-2">
		{#if theme}
			<button
				class="p-2 rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 peer"
				type="button"
				aria-label="Toggle theme"
				on:click={toggleTheme}
			>
				{#if theme === 'light'}
					<svg
						fill="none"
						height="16"
						shape-rendering="geometricPrecision"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						width="16"
					>
						<circle cx="12" cy="12" r="5" />
						<path d="M12 1v2" />
						<path d="M12 21v2" />
						<path d="M4.22 4.22l1.42 1.42" />
						<path d="M18.36 18.36l1.42 1.42" />
						<path d="M1 12h2" />
						<path d="M21 12h2" />
						<path d="M4.22 19.78l1.42-1.42" />
						<path d="M18.36 5.64l1.42-1.42" />
					</svg>
				{:else if theme === 'dark'}
					<svg
						fill="none"
						height="16"
						shape-rendering="geometricPrecision"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						width="16"
					>
						<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
					</svg>
				{:else}
					<svg
						fill="none"
						height="16"
						shape-rendering="geometricPrecision"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						width="16"
					>
						<path
							d="M2 13.381h20M8.66 19.05V22m6.84-2.95V22m-8.955 0h10.932M4 19.05h16a2 2 0 002-2V4a2 2 0 00-2-2H4a2 2 0 00-2 2v13.05a2 2 0 002 2z"
						/>
					</svg>
				{/if}
			</button>
			<span
				class="absolute invisible hidden w-12 text-xs text-right capitalize md:inline -left-14 peer-hover:visible text-zinc-400"
				>{theme}</span
			>
		{/if}
		<ul class="flex items-center gap-1">
			<li>
				<a class="p-2 rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-800" href="/about">About</a>
			</li>
			<li>
				<a
					class="flex items-center gap-1 p-2 -mr-2 rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
					href={`https://twitter.com/${config.twitter}`}
					target="_blank"
				>
					<svg
						fill="none"
						height="14"
						shape-rendering="geometricPrecision"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						viewBox="-1 -1 23 23"
						width="14"
					>
						<path
							fill="currentColor"
							stroke="none"
							d="M16.99 0H20.298L13.071 8.26L21.573 19.5H14.916L9.702 12.683L3.736 19.5H0.426L8.156 10.665L0 0H6.826L11.539 6.231L16.99 0ZM15.829 17.52H17.662L5.83 1.876H3.863L15.829 17.52Z"
						/>
					</svg>
					<span>Follow</span>
				</a>
			</li>
		</ul>
	</div>
</nav>
