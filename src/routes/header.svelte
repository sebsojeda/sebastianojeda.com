<script lang="ts">
	import { browser } from '$app/environment';
	import * as config from '$lib/config';

	let theme = browser ? localStorage.getItem('theme') ?? 'system' : null;
	let prefersDark = browser ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;

	if (browser) {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
			if (theme === 'system') {
				document.documentElement.classList.toggle('dark', e.matches);
			}
			prefersDark = e.matches;
		});
	}

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
				class={`${
					theme !== 'system'
						? 'bg-zinc-100 dark:bg-zinc-800'
						: 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
				} p-2 rounded-sm peer`}
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
				class={`absolute ${
					theme !== 'system' ? '' : 'invisible'
				} w-12 text-xs text-right capitalize md:inline -left-14 peer-hover:visible text-zinc-500`}
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
					href={`https://x.com/${config.x}`}
				>
					<svg viewBox="0 0 300 300" width="14" height="14">
						<path
							d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66"
							fill="currentColor"
						/>
					</svg>
					<span>Follow</span>
				</a>
			</li>
		</ul>
	</div>
</nav>
